import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const ButtonGroup = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`pt-24 p-4 transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900" : "bg-orange-50"
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <Link href="/about" className="flex-1">
            <Button 
              className={`w-full h-16 sm:h-20 px-6 rounded-2xl flex items-center justify-center gap-3 
                transition-all duration-300 transform hover:-translate-y-1 active:scale-95
                bg-gradient-to-br shadow-lg hover:shadow-xl ${
                  isDarkMode 
                    ? "from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white" 
                    : "from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
                }`}
            >
              <Image
                src="/Feis-1 (1).webp"
                alt="Icon"
                width={40}
                height={40}
                className={`mr-2 ${isDarkMode ? "filter brightness-125" : ""}`}
              />
              <span className="text-sm sm:text-lg font-bold">
                About the Project
              </span>
            </Button>
          </Link>
          
          <Link href="/contact" className="flex-1">
            <Button 
              className={`w-full h-16 sm:h-20 px-6 rounded-2xl flex items-center justify-center 
                transition-all duration-300 transform hover:-translate-y-1 active:scale-95
                bg-gradient-to-br shadow-lg hover:shadow-xl ${
                  isDarkMode 
                    ? "from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white" 
                    : "from-gray-200 to-gray-100 hover:from-gray-100 hover:to-gray-50 text-gray-900"
                }`}
            >
              <span className="text-sm sm:text-lg font-bold">
                Contact Master
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ButtonGroup;