"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

// Импортируем наши JSON-файлы
import enSushiContents from "@/language/en/Recipes/Contents Sushi.json";
import plSushiContents from "@/language/pl/Recipes/Contents Sushi.json";

export default function RecipePage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Выбираем JSON в зависимости от языка
  const contents =
    language === "en"
      ? enSushiContents.contents
      : plSushiContents.contents;

  // Находим нужный рецепт
  const currentItem = contents.find((item) => item.id === id);

  // Если не нашли — показываем заглушку
  if (!currentItem) {
    return (
      <div
        className={`min-h-screen p-8 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-900 text-gray-100"
            : "bg-[#F6E9E0] text-gray-900"
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

  // Обработчик ввода кода
  const handleVerify = () => {
    if (otp === currentItem.code) {
      setIsVerified(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid code. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen pt-24 p-8 font-sans transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Кнопка «Back to Home» */}
      <div className="container mx-auto p-6 text-center">
        <Link href="/">
          <Button className="inline-block bg-blue-800 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-full px-6 py-2 font-medium text-white transition">
            {currentItem.backToHomeLinkText || "Back to Home"}
          </Button>
        </Link>
      </div>

      {/* Карточка рецепта */}
      <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            {currentItem.content}
          </h1>
        </div>

        <div className="p-6">
          <div className="prose prose-lg dark:prose-invert max-w-none font-semibold leading-relaxed text-gray-700 dark:text-gray-300">
            <p>{currentItem.noPrevText}</p>

            {/* Блок верификации (OTP) */}
            {!isVerified && (
              <div className="flex flex-col items-center mt-8">
                <Card className="w-[380px]">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                      {currentItem.verifyTitle}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {currentItem.verifyDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
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

                    {errorMessage && (
                      <p className="text-red-500 mt-2">{errorMessage}</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full mt-4" onClick={handleVerify}>
                      {currentItem.verifyButtonText}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {/* Секция ингредиентов (с блюром, если код не введён) */}
            <div className={`mt-6 ${isVerified ? "" : "blur-sm"}`}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {/* Используем ключ из JSON */}
                {currentItem.ingredientsHeader}
              </h2>
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                      {/* Используем ключ из JSON */}
                      {currentItem.tableHeaders.ingredient}
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                      {currentItem.tableHeaders.quantity}
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

              {currentItem.yield && (
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  <strong>Yield:</strong> {currentItem.yield}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


