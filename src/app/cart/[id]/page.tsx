"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import OrderForm from "@/components/OrderForm";

export default function CartPage() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, cartCount, totalPrice } = useCart();
  const { isDarkMode } = useTheme();
  const [localCart, setLocalCart] = useState(cart);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`min-h-screen pt-24 p-4 sm:p-6 transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    }`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
          Корзина
        </h1>

        {localCart.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-lg sm:text-xl mb-6 text-gray-500">Ваша корзина пуста</p>
            <Link href="/">
              <Button className={`px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl hover:shadow-blue-600/30" 
                  : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white hover:shadow-xl"
              }`}>
                Вернуться в магазин
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Product List */}
            <div className="w-full lg:w-3/5 space-y-4 sm:space-y-6">
              {localCart.map((item, index) => {
                const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
                return (
                  <Card
                    key={item.id}
                    className={`group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex gap-4 sm:gap-6">
                        {/* Image */}
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 128px, 160px"
                            priority={index === 0}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className={`text-xl font-semibold mb-2 ${
                              isDarkMode ? "text-gray-100" : "text-gray-900"
                            }`}>
                              {item.title}
                            </h3>
                            <p className={`text-sm line-clamp-3 ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {item.description}
                            </p>
                          </div>

                          {/* Controls */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className={`h-10 w-10 p-0 rounded-xl text-lg transition-all ${
                                  isDarkMode 
                                    ? "border-gray-600 hover:bg-gray-700" 
                                    : "border-gray-300 hover:bg-gray-100"
                                }`}
                                onClick={() => decrementQuantity(item.id)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className={`w-8 text-center font-medium text-lg ${
                                isDarkMode ? "text-gray-200" : "text-gray-800"
                              }`}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className={`h-10 w-10 p-0 rounded-xl text-lg transition-all ${
                                  isDarkMode 
                                    ? "border-gray-600 hover:bg-gray-700" 
                                    : "border-gray-300 hover:bg-gray-100"
                                }`}
                                onClick={() => incrementQuantity(item.id)}
                              >
                                +
                              </Button>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className={`text-xl font-bold ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }`}>
                                {formatPrice(priceValue * item.quantity)}
                              </span>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-10 px-6 rounded-xl font-medium transition-all"
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

              {/* Summary */}
              <Card className={`rounded-2xl shadow-lg ${
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}>
                <CardFooter className="p-6">
                  <div className="w-full space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={`text-lg ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>Товаров:</span>
                      <span className={`text-xl font-bold ${
                        isDarkMode ? "text-gray-200" : "text-gray-900"
                      }`}>{cartCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xl ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>Итого:</span>
                      <span className={`text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent`}>
                        {formatPrice(totalPrice)}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <Link href="/" className="flex-1">
                        <Button
                          variant="outline"
                          className={`w-full h-14 rounded-xl text-base transition-all ${
                            isDarkMode 
                              ? "border-gray-600 hover:bg-gray-700" 
                              : "border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          Продолжить покупки
                        </Button>
                      </Link>
                      <Button
                        className={`w-full sm:w-auto h-14 rounded-xl text-base font-bold transition-all transform hover:scale-105 ${
                          isDarkMode 
                            ? "bg-green-600 hover:bg-green-700 hover:shadow-green-600/30" 
                            : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white hover:shadow-xl"
                        }`}
                        onClick={() => setShowOrderForm(!showOrderForm)}
                      >
                        {showOrderForm ? "Свернуть форму" : "Оформить заказ"}
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Order Form */}
            {showOrderForm && (
              <div className="w-full lg:w-2/2 animate-slide-in">
                <Card className={`sticky top-24 rounded-2xl shadow-xl ${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}>
                  <CardContent className="p-6">
                    <h2 className={`text-2xl font-bold mb-6 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}>
                      Данные для заказа
                    </h2>
                    <OrderForm />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}