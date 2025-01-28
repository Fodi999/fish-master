"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // Иконка корзины

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
      className={`p-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-[#F6E9E0] text-gray-900"
      }`}
    >
      <nav className="flex justify-between items-center">
        {/* Название сайта */}
        <h1 className="text-2xl font-bold">FISH MASTER</h1>

        {/* Правый блок с кнопками */}
        <ul className="flex gap-6 items-center">
          {/* Переключатель темы */}
          <li>
            <Switch onCheckedChange={toggleTheme} checked={isDarkMode} />
          </li>

          {/* Переключатель языка */}
          <li>
            <Button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              {language === "en" ? "PL" : "EN"}
            </Button>
          </li>

          {/* Кнопка корзины с количеством товаров */}
          <li>
            <Link href="/cart/1">
              <Button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
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


