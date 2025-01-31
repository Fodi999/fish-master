"use client";

import React, { InputHTMLAttributes } from "react";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ icon, ...props }) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        {...props}
        className={`w-full p-4 rounded-xl border-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all
          bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 
          text-gray-900 dark:text-gray-100 pl-12`}
      />
    </div>
  );
};

export default InputWithIcon;
