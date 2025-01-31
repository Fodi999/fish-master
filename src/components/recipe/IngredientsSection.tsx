"use client";
import { useTheme } from "@/context/ThemeContext";

interface IngredientsSectionProps {
  ingredientsHeader: string;
  noPrevText?: string;
  ingredients: { name: string; quantity: string }[];
  yieldText?: string;
}

const IngredientsSection = ({ ingredientsHeader, noPrevText, ingredients, yieldText }: IngredientsSectionProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`mt-8 md:mt-12 transition-all duration-300 ${
      isDarkMode ? "opacity-100" : "opacity-30 blur-lg pointer-events-none"
    }`}>
      <h2 className={`text-2xl md:text-3xl font-bold mb-4 md:mb-6 pb-3 border-b ${
        isDarkMode 
          ? "border-gray-700" 
          : "border-gray-200"
      }`}>
        {ingredientsHeader}
      </h2>

      {noPrevText && (
        <p className="text-gray-500 text-sm md:text-base mb-4">
          {noPrevText}
        </p>
      )}

      <div className="grid gap-3 md:gap-4">
        {ingredients.map((ingredient, index) => (
          <div 
            key={index}
            className={`p-3 md:p-4 rounded-lg md:rounded-xl flex items-center gap-3 md:gap-4 transition-all ${
              isDarkMode 
                ? "bg-gray-700 hover:bg-gray-600" 
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className={`p-2 md:p-3 rounded-md md:rounded-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}>
              <span className="text-xl md:text-2xl">
                {index % 3 === 0 ? "🐟" : index % 2 === 0 ? "🍣" : "🌿"}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base md:text-lg">{ingredient.name}</h3>
              <p className={`text-sm md:text-base ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                {ingredient.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {yieldText && (
        <div className={`mt-6 md:mt-8 p-3 md:p-4 rounded-lg md:rounded-xl ${
          isDarkMode ? "bg-gray-700" : "bg-blue-50"
        }`}>
          <p className={`text-base md:text-lg font-semibold ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}>
            🎣 {yieldText}
          </p>
        </div>
      )}
    </div>
  );
};

export default IngredientsSection;