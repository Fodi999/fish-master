"use client";

import React, { useState, useEffect } from "react";
import ButtonGroup from "@/components/ButtonGroup";
import ProductSliders from "@/components/ProductSliders/ProductSliders";
import ChatWidget from "@/bot/ChatWidget";

// Импортируем серверные экшены для работы с подписками и уведомлениями.
// Внимание: путь может отличаться, если ваш файл не в "app/actions.ts".
import { subscribeUser, unsubscribeUser, sendNotification } from "./actions";

// Функция, преобразующая base64 VAPID-ключ в Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// Компонент, управляющий логикой подписки/отписки и отправки push-уведомлений
function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Проверяем, поддерживаются ли Push Notifications и Service Worker
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  // Регистрируем service worker (файл public/sw.js)
  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    // Проверяем, есть ли уже активная подписка
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  // Подписка на push
  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    // Отправляем на сервер (сериализуем)
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  // Отписка от push
  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  // Отправка тестового уведомления
  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage("");
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <br />
          <input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>Send Test</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  );
}

// Компонент с предложением установить приложение на iOS-устройства
function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    // Используя проверку наличия свойства "MSStream" в объекте window без явного any
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !("MSStream" in window));
    // Проверяем, запущено ли приложение как standalone (PWA)
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  // Если уже "standalone", не показываем подсказку
  if (isStandalone) {
    return null;
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button{" "}
          <span role="img" aria-label="share icon">
            ⎋
          </span>{" "}
          and then &quot;Add to Home Screen&quot;{" "}
          <span role="img" aria-label="plus icon">
            ➕
          </span>.
        </p>
      )}
    </div>
  );
}

// Финальный экспорт главной страницы
export default function Page() {
  return (
    <div style={{ padding: 16 }}>
      {/* Существующие компоненты */}
      <ButtonGroup />
      <ProductSliders />
      <ChatWidget />

      {/* Логика PWA */}
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}





