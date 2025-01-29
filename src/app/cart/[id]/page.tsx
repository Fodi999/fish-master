"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext"; // <-- импортируем тему
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import OrderForm from "@/components/OrderForm";

// import { useParams } from "next/navigation"; // если нужно

export default function CartPage() {
  // const { id } = useParams(); // если нужно

  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    cartCount,
    totalPrice,
  } = useCart();

  const [localCart, setLocalCart] = useState(cart);
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Подключаем контекст темы:
  const { isDarkMode } = useTheme();

  // При изменении глобального cart обновляем localCart
  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  // Форматируем цену
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={`min-h-screen pt-24 p-4 sm:p-6 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
          Корзина
        </h1>

        {localCart.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-lg sm:text-xl mb-4">В корзине нет товаров</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Левая часть — список товаров */}
            <div className="w-full lg:w-3/5 space-y-4 sm:space-y-6">
              {localCart.map((item, index) => {
                const priceValue =
                  parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
                return (
                  <Card
                    key={item.id}
                    className={`hover:shadow-lg transition-shadow rounded-lg ${
                      isDarkMode ? "bg-gray-800 text-white" : ""
                    }`}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-row w-full gap-3 sm:gap-4">
                        {/* Изображение слева */}
                        <div className="relative w-1/2 min-h-[100px]">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="rounded-lg object-cover"
                            sizes="(max-width: 640px) 80px, 128px"
                            priority={index === 0}
                          />
                        </div>

                        {/* Текст и кнопки справа */}
                        <div className="flex-1 w-full space-y-2">
                          <h3 className="text-base sm:text-lg font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm line-clamp-2">
                            {item.description}
                          </p>

                          {/* Управление количеством и удаление */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-xs sm:text-sm"
                                onClick={() => decrementQuantity(item.id)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="font-medium w-5 sm:w-6 text-center text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-xs sm:text-sm"
                                onClick={() => incrementQuantity(item.id)}
                              >
                                +
                              </Button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
                              <span className="text-sm sm:text-lg font-bold">
                                {formatPrice(priceValue * item.quantity)}
                              </span>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Удалить
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Итоги + Оформление */}
              <Card
                className={`${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-gray-50"
                }`}
              >
                <CardFooter className="flex flex-col p-4 sm:p-6">
                  <div className="w-full mb-4 sm:mb-6 space-y-2">
                    <div className="flex justify-between text-sm sm:text-base font-semibold">
                      <span>Товаров в корзине:</span>
                      <span>{cartCount}</span>
                    </div>
                    <div className="flex justify-between text-base sm:text-lg font-bold">
                      <span>Общая сумма:</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-end w-full gap-3">
                    <Link href="/" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full h-11 sm:h-12 text-sm sm:text-base"
                      >
                        Продолжить покупки
                      </Button>
                    </Link>
                    <Button
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 h-11 sm:h-12 text-sm sm:text-base"
                      onClick={() => setShowOrderForm(true)}
                    >
                      Оформить заказ
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Правая часть — форма */}
            <div className="w-full lg:w-2/1">
              {showOrderForm && (
                <div
                  className={`rounded-lg p-4 sm:p-6 h-fit ${
                    isDarkMode ? "bg-gray-800 text-white" : "bg-white"
                  }`}
                >
                  <OrderForm />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


