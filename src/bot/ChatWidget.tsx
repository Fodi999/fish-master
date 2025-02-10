import { useState } from 'react';
import ChatBot from './ChatBot';
import { useTheme } from '@/context/ThemeContext';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // Контейнер виджета с учетом темы и вертикального расположения элементов
  const widgetContainerClasses = `
    absolute bottom-24 right-0 w-[400px] h-[600px] rounded-xl shadow-xl overflow-hidden flex flex-col
    ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
  `;

  // Заголовок (хедер) виджета с нижней границей для разделения
  const headerClasses = `
    p-4 flex items-center justify-between border-b
    ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-blue-500 border-blue-400'}
  `;

  const headerTitleClasses = 'text-xl font-bold text-white';
  const headerSubtitleClasses = `${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center"
      >
        <span className="mr-2">🐟</span>
        <span className="font-semibold">Морепродукты Помощник</span>
        <span className="ml-2">🦀</span>
      </button>

      {isOpen && (
        <div className={widgetContainerClasses}>
          {/* Заголовок виджета */}
          <div className={headerClasses}>
            <div>
              <h2 className={headerTitleClasses}>👋 Привет!</h2>
              <p className={headerSubtitleClasses}>Чем могу помочь?</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-200 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Переключатель темы */}
          <div className={`p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <button
              onClick={toggleTheme}
              className={`px-2 py-1 rounded text-sm ${
                isDarkMode
                  ? 'bg-gray-600 text-white hover:bg-gray-500'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
            </button>
          </div>

          {/* Область для чата с прокруткой */}
          <div className="flex-1 overflow-y-auto">
            <ChatBot />
          </div>
        </div>
      )}
    </div>
  );
}




