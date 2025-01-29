import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ButtonGroup = () => {
  return (
    <div className="pt-24 overflow-x-auto p-4 bg-orange-100 dark:bg-gray-800 shadow-md">
      <div className="flex space-x-4">
        <Link href="/about">
          <Button 
            className="flex items-center justify-center w-full sm:w-auto px-6 py-6 bg-gradient-to-br from-blue-800 to-blue-800 hover:from-blue-800 hover:to-blue-900 
            text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300
            transform hover:-translate-y-0.5 active:scale-95"
          >
            <Image
              src="/Feis-1 (1).webp"
              alt="Icon"
              width={40}
              height={40}
              className="mr-2"
            />
            About the Project Dima Fomin
          </Button>
        </Link>
        
        <Link href="/contact">
          <Button 
            className="w-full sm:w-auto px-6 py-6 bg-gradient-to-br from-green-800 to-green-600 hover:from-green-600 hover:to-green-700 
            text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300
            transform hover:-translate-y-0.5 active:scale-95"
          >
            Contact
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ButtonGroup;