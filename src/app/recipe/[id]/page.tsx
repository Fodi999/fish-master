"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import enSushiContents from "@/language/en/Recipes/Contents Sushi.json";
import plSushiContents from "@/language/pl/Recipes/Contents Sushi.json";

export default function RecipePage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
          <Link href="/">
            <Button className={`px-6 py-3 rounded-full text-sm md:text-base ${
              isDarkMode 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-blue-500 hover:bg-blue-600"
            }`}>
              {contents[0]?.backToHomeLinkText || "← Back to Home"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleVerify = () => {
    if (otp === currentItem.code) {
      setIsVerified(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid code. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen pt-20 md:pt-24 p-4 md:p-6 font-sans transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8 md:mb-12 text-center animate-fade-in">
          <Link href="/">
            <Button className={`px-6 py-3 md:px-8 md:py-4 rounded-full font-medium md:font-bold transition-all ${
              isDarkMode 
                ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg" 
                : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white hover:shadow-lg"
            }`}>
              <span className="text-sm md:text-base">
                {currentItem.backToHomeLinkText || "Back to Home"}
              </span>
              <span className="ml-2">←</span>
            </Button>
          </Link>
        </div>

        {/* Recipe Card */}
        <div className={`rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden transition-all ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}>
          <div className="p-4 md:p-6 lg:p-8">
            {/* Recipe Header */}
            <h1 className={`text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent`}>
              {currentItem.content}
            </h1>

            <div className={`prose max-w-none ${isDarkMode ? "prose-invert" : ""}`}>
              {/* Verification Section */}
              {!isVerified && (
                <div className="my-8 md:my-12 animate-fade-in">
                  <Card className={`w-full border transition-all ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600" 
                      : "bg-gray-50 border-gray-200"
                  }`}>
                    <CardHeader>
                      <div className="text-center space-y-2">
                        <div className="text-3xl md:text-4xl mb-3 md:mb-4">🔐</div>
                        <CardTitle className="text-xl md:text-2xl font-bold">
                          {currentItem.verifyTitle}
                        </CardTitle>
                        <CardDescription className="text-sm md:text-base">
                          {currentItem.verifyDescription}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center px-2 md:px-4">
                      <InputOTP 
                        maxLength={6} 
                        value={otp} 
                        onChange={setOtp}
                        className="gap-1 md:gap-2"
                      >
                        <InputOTPGroup className="gap-1">
                          {[...Array(6)].map((_, index) => (
                            <InputOTPSlot 
                              key={index} 
                              index={index}
                              className={`h-12 w-12 md:h-14 md:w-14 text-xl md:text-2xl border ${
                                isDarkMode 
                                  ? "border-gray-600 bg-gray-800" 
                                  : "border-gray-200 bg-white"
                              }`}
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>

                      {errorMessage && (
                        <p className="text-red-500 text-sm md:text-base mt-3 md:mt-4 animate-shake">
                          {errorMessage}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 md:p-6">
                      <Button 
                        onClick={handleVerify}
                        className={`w-full py-4 md:py-5 rounded-xl font-medium md:font-bold ${
                          isDarkMode 
                            ? "bg-blue-600 hover:bg-blue-700" 
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        <span className="text-sm md:text-base">
                          {currentItem.verifyButtonText}
                        </span>
                        <span className="ml-2">→</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}

              {/* Ingredients Section */}
              <div className={`mt-8 md:mt-12 transition-all duration-300 ${
                isVerified ? "opacity-100" : "opacity-30 blur-lg pointer-events-none"
              }`}>
                <h2 className={`text-2xl md:text-3xl font-bold mb-4 md:mb-6 pb-3 border-b ${
                  isDarkMode 
                    ? "border-gray-700" 
                    : "border-gray-200"
                }`}>
                  {currentItem.ingredientsHeader}
                </h2>

                <div className="grid gap-3 md:gap-4">
                  {currentItem.ingredients.map((ingredient, index) => (
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

                {currentItem.yield && (
                  <div className={`mt-6 md:mt-8 p-3 md:p-4 rounded-lg md:rounded-xl ${
                    isDarkMode ? "bg-gray-700" : "bg-blue-50"
                  }`}>
                    <p className={`text-base md:text-lg font-semibold ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}>
                      🎣 {currentItem.yield}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


