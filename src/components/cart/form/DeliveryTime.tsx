"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

interface DeliveryTimeProps {
  deliveryDate: string;
  deliveryTime: string;
  updateState: (field: string, value: string) => void;
}

const DeliveryTime = ({ deliveryDate, deliveryTime, updateState }: DeliveryTimeProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
        <h3 className="text-xl font-semibold">Время доставки</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { value: "today", label: "Сегодня" },
          { value: "scheduled", label: "Выбрать время" }
        ].map((method) => (
          <Button
            key={method.value}
            variant={deliveryDate === method.value ? "default" : "outline"}
            className={`h-16 rounded-xl text-base ${
              deliveryDate === method.value 
                ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white" 
                : isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600" 
                  : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => updateState("deliveryDate", method.value)}
            type="button"
          >
            {method.label}
          </Button>
        ))}
      </div>

      {deliveryDate === "scheduled" && (
        <div className="mt-4">
          <input
            type="time"
            value={deliveryTime}
            onChange={(e) => updateState("deliveryTime", e.target.value)}
            className="w-full p-4 rounded-xl border-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            required
          />
        </div>
      )}
    </div>
  );
};

export default DeliveryTime;