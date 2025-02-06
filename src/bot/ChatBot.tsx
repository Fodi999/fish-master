import { useState, useEffect, useRef } from "react";
import MemoryService from "./MemoryService";
import { useTheme } from "@/context/ThemeContext";

export type Message = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
};

export default function ChatBot() {
  const { isDarkMode } = useTheme();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Устанавливаем WebSocket-соединение один раз при монтировании компонента
  useEffect(() => {
    // Подключаемся к задеплоенному чат-боту
    const socket = new WebSocket("wss://fish-botai-ye1g.shuttle.app/ws/");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      // Наш чат-бот отправляет данные как plain text, поэтому не будем пытаться парсить JSON
      const botMessage: Message = {
        id: generateId(),
        text: event.data,
        isBot: true,
        timestamp: Date.now(),
      };

      setMessages((prev) => {
        const updatedMessages = [...prev, botMessage];
        MemoryService.saveChatHistory(updatedMessages);
        return updatedMessages;
      });
      setIsLoading(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsLoading(false);
    };

    setWs(socket);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !ws) return;

    const userMessage: Message = {
      id: generateId(),
      text: input,
      isBot: false,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    MemoryService.saveChatHistory([...messages, userMessage]);

    setIsLoading(true);
    const currentInput = input;
    setInput("");

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(currentInput);
    } else {
      console.error("WebSocket not open");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const history = MemoryService.getChatHistory();
    if (history) setMessages(history);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    // Внешний контейнер адаптивен для мобильных устройств
    <div
      className={`flex flex-col h-full w-full max-w-md mx-auto ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white"
      }`}
    >
      <div
        className={`flex-1 overflow-y-auto p-4 ${
          isDarkMode ? "bg-gray-700" : "bg-gray-50"
        }`}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.isBot ? "justify-start" : "justify-end"
            } my-1`}
          >
            <div
              className={`p-3 rounded-lg break-words ${
                msg.isBot
                  ? isDarkMode
                    ? "bg-gray-600 border"
                    : "bg-white border"
                  : "bg-blue-500 text-white"
              } max-w-[80%]`}
            >
              {msg.text}
              <div className="text-xs mt-1 opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start my-1">
            <div
              className={`p-3 rounded-lg border ${
                isDarkMode ? "bg-gray-600" : "bg-white"
              } max-w-[80%]`}
            >
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`border-t p-4 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напишите сообщение..."
            className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode ? "bg-gray-800 text-white border-gray-600" : ""
            }`}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "..." : "Отправить"}
          </button>
        </div>
      </form>
    </div>
  );
}




