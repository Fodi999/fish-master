import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export type Message = {
  id: string;
  text?: string;
  isBot: boolean;
  timestamp: number;
  isImage?: boolean;
  imageUrl?: string;
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Генерация уникального id для сообщений
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Подключаемся к WebSocket-серверу
  useEffect(() => {
    const socket = new WebSocket("wss://fish-botai-ye1g.shuttle.app/ws/");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      if (event.data instanceof Blob) {
        // Преобразуем Blob в URL для изображения
        const imageUrl = URL.createObjectURL(event.data);
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            isBot: true,
            timestamp: Date.now(),
            isImage: true,
            imageUrl,
          },
        ]);
      } else {
        const responseData = event.data.toString();
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            text: responseData,
            isBot: true,
            timestamp: Date.now(),
          },
        ]);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  // Автопрокрутка чата к последнему сообщению при его добавлении
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Функция для отправки запроса на фото
  const sendImageRequest = () => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send("send_image");
    }
  };

  // Отправка текстового сообщения
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(inputText);
      // Добавляем сообщение от пользователя
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          text: inputText,
          isBot: false,
          timestamp: Date.now(),
        },
      ]);
      setInputText("");
    }
  };

  // Отправка при нажатии Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {/* Область сообщений */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isBot ? "justify-start" : "justify-end"} my-1`}
          >
            <div
              className={`p-3 rounded-lg break-words max-w-[80%] border ${
                msg.isBot
                  ? "bg-gray-600 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {msg.isImage && msg.imageUrl ? (
                <Image
                  src={msg.imageUrl}
                  alt="Изображение"
                  width={300}
                  height={200}
                  className="max-w-full rounded-lg"
                />
              ) : (
                msg.text
              )}
              <div className="text-xs mt-1 opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Панель ввода: кнопка для фото, текстовый инпут и кнопка отправки */}
      <div className="flex items-center p-2 border-t border-gray-200">
        <button
          onClick={sendImageRequest}
          className="mr-2 text-2xl text-blue-500 hover:text-blue-600 transition-colors"
          title="Отправить фото"
        >
          📷
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите сообщение..."
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Отправить
        </button>
      </div>
    </div>
  );
}








