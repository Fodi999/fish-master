"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { Card, CardHeader } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Импорт данных (JSON) с товарами
import enRolls from "@/language/en/Product Cards/rolls.json";
import enSalads from "@/language/en/Product Cards/salads.json";
import enSets from "@/language/en/Product Cards/sets.json";
import enSnacks from "@/language/en/Product Cards/snacks.json";
import enSushi from "@/language/en/Product Cards/sushi.json";

import plRolls from "@/language/pl/Product Cards/rolls.json";
import plSalads from "@/language/pl/Product Cards/salads.json";
import plSets from "@/language/pl/Product Cards/sets.json";
import plSnacks from "@/language/pl/Product Cards/snacks.json";
import plSushi from "@/language/pl/Product Cards/sushi.json";

/** Интерфейс товара */
interface ProductSection {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  buttonText: string;
  capacities: { value: string; active: boolean }[];
  price: string;
  contentComponent?: string;
  slug?: string;
  prev?: string | null;
  next?: string | null;
}

interface Category {
  card: ProductSection[];
}

/** Данные для en и pl */
const pageSections: {
  en: { [key: string]: Category };
  pl: { [key: string]: Category };
} = {
  en: {
    rolls: enRolls,
    salads: enSalads,
    sets: enSets,
    snacks: enSnacks,
    sushi: enSushi,
  },
  pl: {
    rolls: plRolls,
    salads: plSalads,
    sets: plSets,
    snacks: plSnacks,
    sushi: plSushi,
  },
};

export default function ProductSliders() {
  // Контексты: язык, тема, корзина
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();

  // Локальное состояние лайков: ключ = id карточки, значение = кол-во лайков
  const [likes, setLikes] = useState<{ [productId: string]: number }>({});

  // Подбираем нужный набор JSON в зависимости от языка
  const sections = pageSections[language as "en" | "pl"];

  // Функция добавления в корзину
  const handleOrderClick = (section: ProductSection) => {
    addToCart({
      ...section,
      slug: section.slug ?? section.title?.toLowerCase().replace(/\s+/g, "-"),
      prev: null,
      next: null,
    });
  };

  // Функция для лайка конкретной карточки по её id
  const handleLikeClick = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1, // инкрементируем счётчик
    }));
  };

  return (
    <div
      className={`min-h-screen p-8 font-sans transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-orange-100 text-gray-900"
      }`}
    >
      {Object.keys(sections).map((category: string) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>

          {/* Горизонтальная прокрутка */}
          <div className="overflow-x-auto scroll-smooth flex gap-8 px-4">
            {sections[category].card.map((section, index) => {
              // Текущее число лайков для конкретной карточки
              const likeCount = likes[section.id] || 0;
              // Цвет сердца: красный, если likeCount > 0
              const heartColor = likeCount > 0 ? "text-red-500" : "text-gray-600";

              return (
                <Card
                  key={`${section.id}-${index}`}
                  className="shrink-0 w-80 rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-gray-800"
                >
                  {/* Блок с картинкой */}
                  <div className="relative">
                    <Image
                      src={section.imageUrl}
                      alt={section.title}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover"
                      priority={section.id === "1"}
                    />
                    {/* Кнопка лайка */}
                    <button
                      onClick={() => handleLikeClick(section.id)}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                    >
                      <Heart className={heartColor} size={20} />
                    </button>

                    {/* Отображение количества лайков, если > 0 */}
                    {likeCount > 0 && (
                      <span className="absolute top-4 right-14 bg-white text-red-500 font-bold px-2 py-1 rounded-full shadow-md text-sm">
                        {likeCount}
                      </span>
                    )}
                  </div>

                  {/* Контент карточки */}
                  <CardHeader className="p-6">
                    {/* Заголовок */}
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {section.title}
                    </h1>

                    {/* capacities */}
                    <div className="flex gap-2 mt-2">
                      {section.capacities.map((capacity, idx) => {
                        if (capacity.value === (language === "en" ? "Recipe" : "Przepis") && capacity.active) {
                          return (
                            <Link href={`/recipe/${section.id}`} key={idx}>
                              <span className="px-3 py-1 rounded-full border text-sm cursor-pointer bg-orange-500 text-white border-orange-500">
                                {capacity.value}
                              </span>
                            </Link>
                          );
                        } else {
                          return (
                            <span
                              key={idx}
                              className={`px-3 py-1 rounded-full border text-sm ${
                                capacity.active
                                  ? "bg-orange-500 text-white border-orange-500"
                                  : "border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300"
                              }`}
                            >
                              {capacity.value}
                            </span>
                          );
                        }
                      })}
                    </div>

                    {/* Описание */}
                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                      {section.description}
                    </p>

                    {/* Цена + кнопка "Order" */}
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {section.price}
                      </span>
                      <button
                        onClick={() => handleOrderClick(section)}
                        className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
                      >
                        <ShoppingCart size={18} />
                        <span>{section.buttonText}</span>
                      </button>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
