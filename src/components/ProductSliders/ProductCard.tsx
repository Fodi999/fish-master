"use client";

import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { ProductSection } from "@/components/ProductData";

interface ProductCardProps {
  section: ProductSection;
  isDarkMode: boolean;
  likeCount: number;
  onLikeClick: () => void;
  onOrderClick: () => void;
}

export default function ProductCard({
  section,
  isDarkMode,
  likeCount,
  onLikeClick,
  onOrderClick
}: ProductCardProps) {
  const heartColor = likeCount > 0 ? "text-red-500 fill-red-500" : "text-gray-400";

  return (
    <Card
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
          onClick={onLikeClick}
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
        <h1
          className={`text-xl font-bold ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          {section.title}
        </h1>

        <div className="flex flex-wrap gap-2 mt-3">
          {section.capacities.map((capacity, idx) =>
            capacity.value.toLowerCase() === "recipe" && capacity.active ? (
              <Link href={`/recipe/${section.id}`} key={idx}>
                <span
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 transition-all ${
                    isDarkMode
                      ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  📖 {capacity.value}
                </span>
              </Link>
            ) : (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-sm border transition-all ${
                  capacity.active
                    ? `${
                        isDarkMode
                          ? "bg-teal-600/20 text-teal-400 border-teal-600/30"
                          : "bg-teal-100 text-teal-600 border-teal-200"
                      }`
                    : `${
                        isDarkMode
                          ? "border-gray-700 text-gray-400"
                          : "border-gray-200 text-gray-600"
                      }`
                }`}
              >
                {capacity.value}
              </span>
            )
          )}
        </div>

        <p
          className={`mt-4 text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {section.description}
        </p>

        <div className="flex justify-between items-center mt-6">
          <span
            className={`text-xl font-bold ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {section.price}
          </span>
          <button
            onClick={onOrderClick}
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
}
