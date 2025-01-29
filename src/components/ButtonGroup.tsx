import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ButtonGroup = () => {
  return (
    <div className="overflow-x-auto p-4 bg-orange-100 dark:bg-gray-800  shadow-md">
      <div className="flex space-x-4">
        <Button 
          className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
          text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
          transform hover:-translate-y-0.5 active:scale-95"
        >
          <Image
            src="/feis-1.webp"
            alt="Icon"
            width={24}
            height={24}
            className="mr-2"
          />
          About the Project Dima Fomin
        </Button>
        
        <Button 
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
          text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300
          transform hover:-translate-y-0.5 active:scale-95"
        >
          Contact
        </Button>
        
        <Button 
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
          text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300
          transform hover:-translate-y-0.5 active:scale-95"
        >
          Danger
        </Button>
        
        <Button 
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 
          text-gray-800 font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300
          transform hover:-translate-y-0.5 active:scale-95"
        >
          Warning
        </Button>
      </div>
    </div>
  );
};

export default ButtonGroup;