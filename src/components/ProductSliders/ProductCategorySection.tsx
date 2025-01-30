"use client";

import React from "react";
import { ProductSection } from "@/components/ProductData";
import ProductCard from "./ProductCard";

interface ProductCategorySectionProps {
  category: string;
  sections: { card: ProductSection[] };
  isDarkMode: boolean;
  likes: { [productId: string]: number };
  handleOrderClick: (section: ProductSection) => void;
  handleLikeClick: (id: string) => void;
}

export default function ProductCategorySection({
  category,
  sections,
  isDarkMode,
  likes,
  handleOrderClick,
  handleLikeClick,
}: ProductCategorySectionProps) {
  return (
    <section className="mb-16 animate-fade-in">
      <h2
        className={`text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent`}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>

      <div className="overflow-x-auto scroll-smooth flex gap-8 pb-6 scrollbar-hide">
        {sections.card.map((section: ProductSection) => (
          <ProductCard
            key={section.id}
            section={section}
            isDarkMode={isDarkMode}
            likeCount={likes[section.id] || 0}
            onLikeClick={() => handleLikeClick(section.id)}
            onOrderClick={() => handleOrderClick(section)}
          />
        ))}
      </div>
    </section>
  );
}
