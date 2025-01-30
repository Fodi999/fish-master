"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import OrderForm from "@/components/cart/OrderForm";

import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";

/**
 * Главная страница корзины, открываемая по маршруту /cart/[id]
 */
export default function CartPage() {
  const { cart, cartCount, totalPrice } = useCart();
  const { isDarkMode } = useTheme();
  
  // Локальный стейт корзины (если нужно, можно просто брать cart напрямую)
  const [localCart, setLocalCart] = useState(cart);

  // Показывать или нет форму «Оформить заказ»
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  // Функция переключения формы заказа
  const handleToggleOrderForm = () => {
    setShowOrderForm(!showOrderForm);
  };

  return (
    <div
      className={`min-h-screen pt-24 p-4 sm:p-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
        Basket
        </h1>

        {localCart.length === 0 ? (
          // Если корзина пуста — показываем это состояние
          <div className="text-center py-12 animate-fade-in">
            <p className="text-lg sm:text-xl mb-6 text-gray-500">
              Ваша корзина пуста
            </p>
            <Link href="/">
              <Button
                className={`px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode 
                    ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl hover:shadow-blue-600/30" 
                    : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white hover:shadow-xl"
                }`}
              >
                Вернуться в магазин
              </Button>
            </Link>
          </div>
        ) : (
          // Если корзина не пуста — выводим товары + сводку + форму заказа
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Список товаров */}
            <CartList />

            {/* Сводка по корзине + кнопка «Оформить заказ» */}
            <CartSummary
              cartCount={cartCount}
              totalPrice={totalPrice}
              showOrderForm={showOrderForm}
              onToggleOrderForm={handleToggleOrderForm}
            />

            {/* Форма заказа, если она включена */}
            {showOrderForm && (
              <div className="w-full lg:w-2/2 animate-slide-in">
                {/* Подключаем OrderForm из components/OrderForm.tsx */}
                <OrderForm />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
