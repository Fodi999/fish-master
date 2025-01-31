"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

interface CartItemType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string; // или number, если у вас в контексте именно число
  quantity: number;
  capacities: { value: string; active: boolean }[]; // добавляем поле capacities
  calories: number; // добавляем поле калорий
}

interface CartItemProps {
  item: CartItemType;
  index: number;
}

export default function CartItem({ item, index }: CartItemProps) {
  const { isDarkMode } = useTheme();
  const { decrementQuantity, incrementQuantity, removeFromCart } = useCart();

  // Извлекаем число из строки цены
  const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;

  // Форматируем в валюту
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card
      className={`group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex gap-4 sm:gap-6">
          {/* Изображение товара */}
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

          {/* Основная информация */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3
                className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-sm line-clamp-3 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {item.description}
              </p>
            </div>

            {/* Цена, Калории, Количество, Удалить */}
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center justify-between">
                <span
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {formatPrice(priceValue * item.quantity)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 transition-all ${
                    isDarkMode
                      ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                 🔥 {item.calories * item.quantity} kcal.
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
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
                  <span
                    className={`w-8 text-center font-medium text-lg ${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
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
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-10 px-6 rounded-xl font-medium transition-all ml-auto"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
