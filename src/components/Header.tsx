"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const { cartCount } = useCart();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pl" : "en");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 p-4 transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gray-900 text-gray-100 border-b border-gray-700" 
          : "bg-[#F6E9E0] text-gray-900 border-b border-gray-200"
      }`}
    >
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Логотип - одинаковый для всех устройств */}
        <Link href="/" className="flex items-center gap-2 group">
          <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
            FISH MASTER
          </h1>
        </Link>

        {/* Десктопная версия */}
        <div className="hidden md:flex items-center gap-4">
          {/* Переключатель темы */}
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Switch
              onCheckedChange={toggleTheme}
              checked={isDarkMode}
            />
            <Moon className="h-4 w-4" />
          </div>

          {/* Переключатель языка */}
          <Button
            onClick={toggleLanguage}
            className={`rounded-full px-4 py-2 font-medium transition-all ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {language === "en" ? "Polski" : "English"}
          </Button>

          {/* Корзина */}
          <Link href="/cart/1">
            <Button
              className={`relative rounded-full px-4 py-2 transition-all flex gap-2 ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full px-2 py-1 text-xs font-bold bg-red-500 text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Мобильная версия */}
        <div className="flex md:hidden items-center gap-3">
          {/* Переключатель языка */}
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            className="rounded-full p-2 text-sm"
          >
            {language === "en" ? "PL" : "EN"}
          </Button>

          {/* Переключатель темы */}
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="p-2"
          >
            {isDarkMode ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Корзина */}
          <Link href="/cart/1">
            <Button
              variant="ghost"
              className="relative p-2"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 rounded-full px-1.5 py-0.5 text-xs font-bold bg-red-500 text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}