"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import enSushiContents from "@/language/en/Recipes/Contents Sushi.json";
import plSushiContents from "@/language/pl/Recipes/Contents Sushi.json";
import BackButton from "@/components/recipe/BackButton";
import VerificationSection from "@/components/recipe/VerificationSection";
import IngredientsSection from "@/components/recipe/IngredientsSection";

export default function RecipePage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [isVerified, setIsVerified] = useState(false);

  const contents = language === "en" ? enSushiContents.contents : plSushiContents.contents;
  const currentItem = contents.find((item) => item.id === id);

  if (!currentItem) {
    return (
      <div className={`min-h-screen p-8 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-[#F6E9E0] text-gray-900"
      }`}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">
            {contents[0]?.cardNotFoundTitle || "Card not found"}
          </h1>
          <BackButton backToHomeLinkText={contents[0]?.backToHomeLinkText || "← Back to Home"} />
        </div>
      </div>
    );
  }

  const handleVerify = () => {
    setIsVerified(true);
  };

  return (
    <div className={`min-h-screen pt-20 md:pt-24 p-4 md:p-6 font-sans transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    }`}>
      <div className="max-w-4xl mx-auto">
        <BackButton backToHomeLinkText={currentItem.backToHomeLinkText || "Back to Home"} />

        <div className={`rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden transition-all ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}>
          <div className="p-4 md:p-6 lg:p-8">
            <h1 className={`text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent`}>
              {currentItem.content}
            </h1>

            <div className={`prose max-w-none ${isDarkMode ? "prose-invert" : ""}`}>
              {!isVerified && (
                <VerificationSection 
                  verifyTitle={currentItem.verifyTitle}
                  verifyDescription={currentItem.verifyDescription}
                  verifyButtonText={currentItem.verifyButtonText}
                  code={currentItem.code}
                  onVerify={handleVerify}
                />
              )}

              <IngredientsSection 
                ingredientsHeader={currentItem.ingredientsHeader}
                noPrevText={currentItem.noPrevText}
                ingredients={currentItem.ingredients}
                yieldText={currentItem.yield}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


