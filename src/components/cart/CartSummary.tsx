"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  cartCount: number;
  totalPrice: number;
  showOrderForm: boolean;
  onToggleOrderForm: () => void;
}

export default function CartSummary({
  cartCount,
  totalPrice,
  showOrderForm,
  onToggleOrderForm,
}: CartSummaryProps) {
  const { isDarkMode } = useTheme();

  // Форматируем число в валюту
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
      <Card
        className={`rounded-2xl shadow-lg ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="p-6">
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
              <span
                className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Товаров:
              </span>
              <span
                className={`text-xl font-bold ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                {cartCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`text-xl ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Итого:
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>
        <CardFooter className="p-6">
          <div className="w-full space-y-4">
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
                onClick={onToggleOrderForm}
              >
                {showOrderForm ? "Свернуть форму" : "Оформить заказ"}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
