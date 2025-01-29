"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { ShoppingCart, Sun, Moon } from "lucide-react"; // Иконки

// Импортируем хук корзины из CartContext
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();

  // Получаем кол-во товаров в корзине из контекста
  const { cartCount } = useCart();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pl" : "en");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 p-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-[#F6E9E0] text-gray-900"
      }`}
    >
      <nav className="flex justify-between items-center">
        {/* Название сайта */}
        <h1 className="text-2xl font-extrabold ">FISH MASTER</h1>

        {/* Правый блок с кнопками */}
        <ul className="flex gap-6 items-center">
          {/* Переключатель темы */}
          <li className="flex items-center">
            <Sun className="mr-2" size={18} />
            <Switch onCheckedChange={toggleTheme} checked={isDarkMode} />
            <Moon className="ml-2" size={18} />
          </li>

          {/* Переключатель языка */}
          <li>
            <Button
              onClick={toggleLanguage}
              className={`px-4 py-2 rounded-full ${
                isDarkMode
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-sky-600 text-white hover:bg-blue-600"
              }`}
            >
              {language === "en" ? "PL" : "EN"}
            </Button>
          </li>

          {/* Кнопка корзины с количеством товаров */}
          <li>
            <Link href="/cart/1">
              <Button
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-red-700 text-white hover:bg-red-800"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                <ShoppingCart size={18} />
                <span>({cartCount})</span>
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
