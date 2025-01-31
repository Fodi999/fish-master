"use client";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  backToHomeLinkText: string;
}

const BackButton = ({ backToHomeLinkText }: BackButtonProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="mb-8 md:mb-12 text-center animate-fade-in">
      <Link href="/">
        <Button className={`px-6 py-3 md:px-8 md:py-4 rounded-full font-medium md:font-bold transition-all ${
          isDarkMode 
            ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg" 
            : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white hover:shadow-lg"
        }`}>
          <span className="text-sm md:text-base">
            {backToHomeLinkText || "Back to Home"}
          </span>
          <span className="ml-2">←</span>
        </Button>
      </Link>
    </div>
  );
};

export default BackButton;