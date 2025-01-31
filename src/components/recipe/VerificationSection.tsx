"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

interface VerificationSectionProps {
  verifyTitle: string;
  verifyDescription: string;
  verifyButtonText: string;
  code: string;
  onVerify: () => void;
}

const VerificationSection = ({ verifyTitle, verifyDescription, verifyButtonText, code, onVerify }: VerificationSectionProps) => {
  const { isDarkMode } = useTheme();
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = () => {
    if (otp === code) {
      onVerify();
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid code. Please try again.");
    }
  };

  return (
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
              {verifyTitle}
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              {verifyDescription}
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
              {verifyButtonText}
            </span>
            <span className="ml-2">→</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerificationSection;