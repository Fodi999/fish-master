"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { Card, CardHeader } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Импорт данных
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

const pageSections: {
  en: { [key: string]: { card: ProductSection[] } };
  pl: { [key: string]: { card: ProductSection[] } };
} = {
  en: { rolls: enRolls, salads: enSalads, sets: enSets, snacks: enSnacks, sushi: enSushi },
  pl: { rolls: plRolls, salads: plSalads, sets: plSets, snacks: plSnacks, sushi: plSushi },
};

export default function ProductSliders() {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const [likes, setLikes] = useState<{ [productId: string]: number }>({});

  const sections = pageSections[language as "en" | "pl"];

  const handleOrderClick = (section: ProductSection) => {
    addToCart({
      ...section,
      slug: section.slug ?? section.title?.toLowerCase().replace(/\s+/g, "-"),
      prev: null,
      next: null,
    });
  };

  const handleLikeClick = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900 text-gray-200" : "bg-orange-50 text-gray-900"
    }`}>
      {Object.keys(sections).map((category) => (
        <section key={category} className="mb-16 animate-fade-in">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>

          <div className="overflow-x-auto scroll-smooth flex gap-8 pb-6 scrollbar-hide">
            {sections[category].card.map((section: ProductSection) => {
              const likeCount = likes[section.id] || 0;
              const heartColor = likeCount > 0 ? "text-red-500 fill-red-500" : "text-gray-400";

              return (
                <Card
                  key={section.id}
                  className={`shrink-0 w-80 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } hover:-translate-y-2`}
                >
                  <div className="relative group">
                    <Image
                      src={section.imageUrl}
                      alt={section.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <button
                      onClick={() => handleLikeClick(section.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
                        isDarkMode 
                          ? "bg-gray-800/30 hover:bg-gray-700/50" 
                          : "bg-white/80 hover:bg-white"
                      }`}
                    >
                      <Heart className={`${heartColor} transition-colors`} size={24} />
                    </button>
                    {likeCount > 0 && (
                      <span className="absolute top-4 right-16 bg-white/80 dark:bg-gray-800/80 px-2.5 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                        ❤️ {likeCount}
                      </span>
                    )}
                  </div>

                  <CardHeader className="p-6">
                    <h1 className={`text-xl font-bold ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}>
                      {section.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {section.capacities.map((capacity: { value: string; active: boolean }, idx: number) => (
                        capacity.value.toLowerCase() === "recipe" && capacity.active ? (
                          <Link href={`/recipe/${section.id}`} key={idx}>
                            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 transition-all ${
                              isDarkMode
                                ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                            }`}>
                              📖 {capacity.value}
                            </span>
                          </Link>
                        ) : (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-sm border transition-all ${
                              capacity.active
                                ? `${isDarkMode 
                                    ? "bg-teal-600/20 text-teal-400 border-teal-600/30" 
                                    : "bg-teal-100 text-teal-600 border-teal-200"}`
                                : `${isDarkMode 
                                    ? "border-gray-700 text-gray-400" 
                                    : "border-gray-200 text-gray-600"}`
                            }`}
                          >
                            {capacity.value}
                          </span>
                        )
                      ))}
                    </div>

                    <p className={`mt-4 text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {section.description}
                    </p>

                    <div className="flex justify-between items-center mt-6">
                      <span className={`text-xl font-bold ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}>
                        {section.price}
                      </span>
                      <button
                        onClick={() => handleOrderClick(section)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all ${
                          isDarkMode
                            ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-600/30"
                            : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white hover:shadow-xl"
                        } hover:shadow-lg hover:scale-105`}
                      >
                        <ShoppingCart size={20} />
                        {section.buttonText}
                      </button>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
