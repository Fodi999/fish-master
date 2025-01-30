"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { pageSections, ProductSection } from "@/components/ProductData";
import ProductCategorySection from "./ProductCategorySection";

export default function ProductSliders() {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();

  // Локальный стейт для лайков
  const [likes, setLikes] = useState<{ [productId: string]: number }>({});

  // Получаем нужные секции по языку
  const sections = pageSections[language as "en" | "pl"];

  // Функция добавления товара в корзину
  const handleOrderClick = (section: ProductSection) => {
    addToCart({
      ...section,
      slug: section.slug ?? section.title?.toLowerCase().replace(/\s+/g, "-"),
      prev: null,
      next: null,
    });
  };

  // Функция лайка
  const handleLikeClick = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div
      className={`min-h-screen p-8 font-sans transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-orange-50 text-gray-900"
      }`}
    >
      {Object.keys(sections).map((category) => (
        <ProductCategorySection
          key={category}
          category={category}
          sections={sections[category]}
          isDarkMode={isDarkMode}
          likes={likes}
          handleOrderClick={handleOrderClick}
          handleLikeClick={handleLikeClick}
        />
      ))}
    </div>
  );
}
