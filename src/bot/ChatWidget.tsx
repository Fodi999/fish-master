import { useState } from 'react';
import ChatBot from './ChatBot'; // Импортируем ChatBot

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        <span className="mr-2">🐟</span>
        <span className="font-semibold">Морепродукты Помощник</span>
        <span className="ml-2">🦀</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[400px] h-[600px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-blue-500 p-4 flex items-center">
            <div className="flex-1">
              <h2 className="text-white text-xl font-bold">👋 Привет!</h2>
              <p className="text-blue-100">Чем могу помочь?</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-200 text-2xl"
            >
              ×
            </button>
          </div>

          <ChatBot /> {/* Отображаем чат-бот */}
        </div>
      )}
    </div>
  );
}


