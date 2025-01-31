"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Phone, User, MapPin, Home, Tag, Gift, Users, Plus, Minus } from "lucide-react";
import ToggleButton from "./form/ToggleButton";
import SectionHeader from "./form/SectionHeader";
import InputWithIcon from "./form/InputWithIcon";
import DeliveryTime from "./form/DeliveryTime";

export default function OrderForm() {
  const { isDarkMode } = useTheme();
  const [formState, setFormState] = useState({
    paymentMethod: "cash",
    deliveryMethod: "courier",
    deliveryDate: "today",
    city: "Dnipro",
    deliveryTime: "",
    personsCount: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.deliveryDate === "scheduled" && !formState.deliveryTime) {
      alert("Please select delivery time!");
      return;
    }
    alert(`Order confirmed! 
      Delivery time: ${formState.deliveryDate === 'today' ? 'Today' : formState.deliveryTime}
      Number of people: ${formState.personsCount}`);
  };

  const updateState = (field: string, value: string | number) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 sm:p-8 shadow-xl bg-white dark:bg-gray-800 transition-all"
    >
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
        Place Order
      </h2>

      <div className="space-y-8">
        {/* Contact Information */}
        <div className="space-y-4">
          <SectionHeader 
            icon={<User className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />} 
            title="Contact Information" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithIcon 
              icon={<Phone className="h-5 w-5" />} 
              type="tel" 
              placeholder="Phone*" 
              required 
            />
            <InputWithIcon 
              icon={<User className="h-5 w-5" />} 
              type="text" 
              placeholder="Name*" 
              required 
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <SectionHeader
            icon={<Tag className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />}
            title="Payment Method"
          />
          <div className="flex flex-wrap gap-3">
            {["cash", "card"].map(method => (
              <ToggleButton
                key={method}
                value={method}
                label={method === "cash" ? "Cash" : "Credit Card"}
                isActive={formState.paymentMethod === method}
                onClick={(v: string) => updateState("paymentMethod", v)}
              />
            ))}
          </div>
        </div>

        {/* Delivery Method */}
        <div className="space-y-4">
          <SectionHeader
            icon={<Gift className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />}
            title="Delivery Method"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { value: "courier", label: "Courier", icon: <MapPin className="h-5 w-5" /> },
              { value: "pickup", label: "Pickup", icon: <Home className="h-5 w-5" /> }
            ].map(method => (
              <ToggleButton
                key={method.value}
                {...method}
                isActive={formState.deliveryMethod === method.value}
                onClick={(v: string) => updateState("deliveryMethod", v)}
              />
            ))}
          </div>
        </div>

        {/* People Counter */}
        <div className="space-y-4">
          <SectionHeader
            icon={<Users className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />}
            title="Number of People"
          />
          <div className="flex items-center gap-4">
            <Button
              type="button"
              onClick={() => updateState("personsCount", Math.max(1, formState.personsCount - 1))}
              className="h-12 w-12 rounded-full text-2xl flex items-center justify-center 
                        bg-gradient-to-br from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500 
                        text-white shadow-lg hover:shadow-xl transition-all"
              disabled={formState.personsCount === 1}
            >
              <Minus className="h-6 w-6" />
            </Button>
            
            <div className="w-24 text-center text-xl font-bold p-4 rounded-xl border-2 
                          bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              {formState.personsCount}
            </div>
            
            <Button
              type="button"
              onClick={() => updateState("personsCount", Math.min(10, formState.personsCount + 1))}
              className="h-12 w-12 rounded-full text-2xl flex items-center justify-center 
                        bg-gradient-to-br from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500 
                        text-white shadow-lg hover:shadow-xl transition-all"
              disabled={formState.personsCount === 10}
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="space-y-4">
          <SectionHeader
            icon={<MapPin className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />}
            title="Delivery Address"
          />
          <div className="space-y-4">
            <div className="relative">
              <select
                value={formState.city}
                onChange={(e) => updateState("city", e.target.value)}
                className="w-full p-4 rounded-xl border-2 cursor-pointer appearance-none
                          bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <option value="Dnipro">Dnipro</option>
                <option value="Kyiv">Kyiv</option>
                <option value="Lviv">Lviv</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                ▼
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputWithIcon 
                icon={<MapPin className="h-5 w-5" />} 
                type="text" 
                placeholder="Street*" 
                required 
              />
              <InputWithIcon 
                icon={<Home className="h-5 w-5" />} 
                type="text" 
                placeholder="House*" 
                required 
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <input type="text" placeholder="Apartment" className="w-full p-4 rounded-xl border-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
              <input type="text" placeholder="Entrance" className="w-full p-4 rounded-xl border-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
              <input type="text" placeholder="Floor" className="w-full p-4 rounded-xl border-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
              <input type="text" placeholder="Door Code" className="w-full p-4 rounded-xl border-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <DeliveryTime
          deliveryDate={formState.deliveryDate}
          deliveryTime={formState.deliveryTime}
          updateState={updateState}
        />

        {/* Confirm Order Button */}
        <Button
          type="submit"
          className="w-full py-6 text-xl rounded-xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 
                    hover:from-blue-600 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl 
                    transition-all transform hover:scale-[1.02]"
        >
          Confirm Order
        </Button>
      </div>
    </form>
  );
}