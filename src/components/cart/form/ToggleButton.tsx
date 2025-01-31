"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ToggleButtonProps {
  value: string;
  label: string;
  isActive: boolean;
  onClick: (value: string) => void;
  icon?: React.ReactNode;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  value,
  label,
  isActive,
  onClick,
  icon,
}) => {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      onClick={() => onClick(value)}
      type="button"
      className={`h-16 rounded-xl gap-3 text-base justify-start transition-all ${
        isActive 
          ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg" 
          : "hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
      }`}
    >
      {icon && icon}
      {label}
    </Button>
  );
};

export default ToggleButton;
