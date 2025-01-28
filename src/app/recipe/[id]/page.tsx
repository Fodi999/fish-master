"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Импортируем контексты языка и темы
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

// Импорт UI-компонентов (проверьте, как у вас устроены импорты)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Если у вас готовые компоненты для ввода OTP:
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

// Импорт JSON для английской и польской версий
import enSushiContents from "@/language/en/Recipes/Contents Sushi.json";
import plSushiContents from "@/language/pl/Recipes/Contents Sushi.json";

export default function RecipePage() {
  // Считываем динамический параметр /recipe/[id]
  const { id } = useParams();

  // Определяем язык (en/pl) из контекста
  const { language } = useLanguage();
  // Определяем тему (светлая/тёмная) из контекста
  const { isDarkMode } = useTheme();

  // Состояния для демо-варианта верификации
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState("");

  // При клике "Verify" можно сделать свою логику верификации (сравнить otp и т.д.)
  const handleVerify = () => {
    // Для примера делаем просто setIsVerified(true)
    // В реальном проекте сравните otp с кодом или отправьте запрос на сервер
    setIsVerified(true);
  };

  // Выбираем правильный JSON-файл рецептов в зависимости от языка
  const contents =
    language === "en"
      ? enSushiContents.contents
      : plSushiContents.contents;

  // Ищем рецепт с указанным id
  const currentItem = contents.find((item) => item.id === id);

  // Если в JSON не нашли запись, показываем «заглушку»
  if (!currentItem) {
    return (
      <div
        className={`min-h-screen p-8 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-[#F6E9E0] text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">
          {contents[0]?.cardNotFoundTitle || "Card not found"}
        </h1>
        <Link href="/" className="text-blue-500 underline">
          {contents[0]?.backToHomeLinkText || "← Back to Home"}
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-8 font-sans transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Шапка с кнопкой возврата на главную */}
      <div className="container mx-auto p-6 text-center">
        <div className="text-center mt-4">
          <Link href="/">
            <Button className="inline-block text-white bg-blue-800 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-full px-6 py-2 font-medium transition">
              {/* Если в JSON есть backToHomeText — выводим, иначе просто "Back to Home" */}
              {currentItem.backToHomeLinkText || "Back to Home"}
            </Button>
          </Link>
        </div>
      </div>

      {/* Карточка рецепта */}
      <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="p-6">
          {/* Заголовок и описание рецепта */}
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            {currentItem.content}
          </h1>
        </div>

        <div className="p-6">
          <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-gray-700 dark:text-gray-300">
            {/* Основной контент рецепта */}
            <p>{currentItem.content}</p>

            {/* Блок верификации (OTP) */}
            {!isVerified && (
              <div className="flex items-center justify-center mt-8">
                <Card className="w-[380px] mx-auto">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                      {currentItem.verifyTitle}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {currentItem.verifyDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex justify-center items-center">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Компонент ввода OTP (6 цифр) */}
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full mt-4" onClick={handleVerify}>
                      {currentItem.verifyButtonText}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {/* Таблица ингредиентов (затемняется, если не верифицирован) */}
            {currentItem.ingredients && (
              <div className={`mt-6 ${isVerified ? "" : "blur-sm"}`}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ingredients
                </h2>
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        Ingredient
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItem.ingredients.map((ingredient, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                          {ingredient.name}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                          {ingredient.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Дополнительно выводим yield (сколько порций) */}
                {currentItem.yield && (
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    <strong>Yield:</strong> {currentItem.yield}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

