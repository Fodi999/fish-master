"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "en"; // Язык по умолчанию — английский
    }
    return "en";
  });

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang); // Сохраняем язык в localStorage
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
