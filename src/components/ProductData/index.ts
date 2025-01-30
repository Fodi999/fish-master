"use client";

// Импорт JSON-файлов
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

// Описываем интерфейс, который характеризует продукт
export interface ProductSection {
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

// Формируем объект, объединяющий все секции
export const pageSections: {
  en: { [key: string]: { card: ProductSection[] } };
  pl: { [key: string]: { card: ProductSection[] } };
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
