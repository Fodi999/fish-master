import { useState, useEffect, useRef } from "react";
import MemoryService from "./MemoryService";

export type Message = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
};

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Функция отправки сообщений на сервер
  const getAIResponse = async (input: string) => {
    try {
      // Используем условие для проверки, если приложение работает локально или на продакшн сервере
      const baseUrl = process.env.NODE_ENV === "production"
        ? "https://rust-chatbot-production.up.railway.app"  // URL на Railway
        : "http://localhost:8080";  // Локальный сервер для разработки
  
      const response = await fetch(`${baseUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await response.json();
      return data.response; // Ответ от бота
    } catch (error) {
      console.error("Ошибка при запросе к серверу:", error);
      return "Извините, произошла ошибка при обработке вашего запроса.";
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

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

    try {
      const responseText = await getAIResponse(currentInput); // Вызов функции с запросом к серверу

      const botMessage: Message = {
        id: generateId(),
        text: responseText,
        isBot: true,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
      MemoryService.saveChatHistory([...messages, botMessage]);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const history = MemoryService.getChatHistory();
    if (history) setMessages(history);
  }, []);

  useEffect(() => {
    // Прокручиваем к последнему сообщению
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${msg.isBot ? "bg-white border" : "bg-blue-500 text-white"}`}
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
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg border">
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

      <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напишите сообщение..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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







