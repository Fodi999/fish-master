"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OrderForm() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [deliveryMethod, setDeliveryMethod] = useState("courier");
  const [deliveryDate, setDeliveryDate] = useState("today");
  const [city, setCity] = useState("Днепр");
  const [sticksRegular, setSticksRegular] = useState(0);
  const [sticksTraining, setSticksTraining] = useState(0);

  // Общий класс для input
  const inputStyle =
    "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тут можно отправить запрос на сервер / показать уведомление и т.д.
    alert("Заказ оформлен!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Оформление заказа
      </h2>

      <div className="space-y-6">
        {/* Контактная информация */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold dark:text-gray-200">
            Контактная информация
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Телефон*"
              className={inputStyle}
              required
            />
            <input
              type="text"
              placeholder="Имя*"
              className={inputStyle}
              required
            />
          </div>
        </div>

        {/* Способ оплаты */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold dark:text-gray-200">
            Способ оплаты
          </h3>
          <div className="flex gap-2">
            <Button
              variant={paymentMethod === "cash" ? "default" : "outline"}
              onClick={() => setPaymentMethod("cash")}
              type="button"
            >
              Наличными
            </Button>
            <Button
              variant={paymentMethod === "card" ? "default" : "outline"}
              onClick={() => setPaymentMethod("card")}
              type="button"
            >
              Картой
            </Button>
          </div>
        </div>

        {/* Способ получения */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold dark:text-gray-200">
            Способ получения
          </h3>
          <div className="flex gap-2">
            <Button
              variant={deliveryMethod === "courier" ? "default" : "outline"}
              onClick={() => setDeliveryMethod("courier")}
              type="button"
            >
              Курьером
            </Button>
            <Button
              variant={deliveryMethod === "pickup" ? "default" : "outline"}
              onClick={() => setDeliveryMethod("pickup")}
              type="button"
            >
              Самовывоз
            </Button>
          </div>
        </div>

        {/* Адрес доставки */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold dark:text-gray-200">
            Адрес доставки
          </h3>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`${inputStyle} cursor-pointer`}
          >
            <option value="Днепр">Днепр</option>
            <option value="Киев">Киев</option>
            <option value="Львов">Львов</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Улица*" className={inputStyle} />
            <input type="text" placeholder="Дом*" className={inputStyle} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <input type="text" placeholder="Квартира" className={inputStyle} />
            <input type="text" placeholder="Подъезд" className={inputStyle} />
            <input type="text" placeholder="Этаж" className={inputStyle} />
            <input type="text" placeholder="Код двери" className={inputStyle} />
          </div>
        </div>

        {/* Время доставки */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold dark:text-gray-200">
            Время доставки
          </h3>
          <div className="flex gap-2">
            <Button
              variant={deliveryDate === "today" ? "default" : "outline"}
              onClick={() => setDeliveryDate("today")}
              type="button"
            >
              Сегодня
            </Button>
            <Button
              variant={deliveryDate === "scheduled" ? "default" : "outline"}
              onClick={() => setDeliveryDate("scheduled")}
              type="button"
            >
              Выбрать время
            </Button>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Комментарий к заказу"
            className={inputStyle}
          />
          <input
            type="email"
            placeholder="E-mail (для отправки чека)"
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Промокод (если есть)"
            className={inputStyle}
          />
        </div>

        {/* Дополнительные товары (палочки) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="dark:text-gray-200">
              Палки + соусник обычные
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setSticksRegular(Math.max(0, sticksRegular - 1))}
                type="button"
              >
                -
              </Button>
              <span className="w-8 text-center dark:text-white">
                {sticksRegular}
              </span>
              <Button
                variant="outline"
                onClick={() => setSticksRegular(sticksRegular + 1)}
                type="button"
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="dark:text-gray-200">
              Палки + соусник тренировочные
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setSticksTraining(Math.max(0, sticksTraining - 1))
                }
                type="button"
              >
                -
              </Button>
              <span className="w-8 text-center dark:text-white">
                {sticksTraining}
              </span>
              <Button
                variant="outline"
                onClick={() => setSticksTraining(sticksTraining + 1)}
                type="button"
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Кнопка подтверждения заказа */}
        <Button
          className="w-full py-6 text-lg bg-orange-500 hover:bg-orange-600 transition-colors"
          type="submit"
        >
          Подтвердить заказ
        </Button>
      </div>
    </form>
  );
}
