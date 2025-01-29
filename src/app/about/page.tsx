"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

const AboutPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-24 p-4 sm:p-6 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About the Project</h1>
        <p className="text-lg mb-4">
          This project was created by Dima Fomin. It is a demonstration of various web development techniques and technologies.
        </p>
        <p className="text-lg">
          The project includes features such as a shopping cart, theme switching, and more.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;