"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Phone, User, MapPin, Home, Calendar, MessageSquare, Tag, Gift } from "lucide-react";

export default function OrderForm() {
  const { isDarkMode } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [deliveryMethod, setDeliveryMethod] = useState("courier");
  const [deliveryDate, setDeliveryDate] = useState("today");
  const [city, setCity] = useState("Днепр");

  const inputStyle = `w-full p-4 rounded-xl border-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all ${
    isDarkMode 
      ? "bg-gray-800 border-gray-700 text-gray-100" 
      : "bg-gray-50 border-gray-200 text-gray-900"
  }`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Заказ оформлен!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl p-6 sm:p-8 shadow-xl transition-all ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className={`text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent`}>
        Оформление заказа
      </h2>

      <div className="space-y-8">
        {/* Контактная информация */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <User className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h3 className="text-xl font-semibold">Контактная информация</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                placeholder="Телефон*"
                className={`${inputStyle} pl-12`}
                required
              />
            </div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Имя*"
                className={`${inputStyle} pl-12`}
                required
              />
            </div>
          </div>
        </div>

        {/* Способ оплаты */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <Tag className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <h3 className="text-xl font-semibold">Способ оплаты</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {[
              { value: "cash", label: "Наличными" },
              { value: "card", label: "Картой" }
            ].map((method) => (
              <Button
                key={method.value}
                variant={paymentMethod === method.value ? "default" : "outline"}
                className={`rounded-xl px-6 py-4 text-base ${
                  paymentMethod === method.value 
                    ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white" 
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600" 
                      : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setPaymentMethod(method.value)}
                type="button"
              >
                {method.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Способ получения */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <Gift className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <h3 className="text-xl font-semibold">Способ получения</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { value: "courier", label: "Курьером", icon: <MapPin className="h-5 w-5" /> },
              { value: "pickup", label: "Самовывоз", icon: <Home className="h-5 w-5" /> }
            ].map((method) => (
              <Button
                key={method.value}
                variant={deliveryMethod === method.value ? "default" : "outline"}
                className={`h-16 rounded-xl justify-start gap-3 text-base ${
                  deliveryMethod === method.value 
                    ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white" 
                    : isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600" 
                      : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setDeliveryMethod(method.value)}
                type="button"
              >
                {method.icon}
                {method.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Адрес доставки */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <MapPin className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h3 className="text-xl font-semibold">Адрес доставки</h3>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`${inputStyle} cursor-pointer appearance-none`}
              >
                <option value="Днепр">Днепр</option>
                <option value="Киев">Киев</option>
                <option value="Львов">Львов</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                ▼
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Улица*" 
                  className={`${inputStyle} pl-12`} 
                />
              </div>
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Дом*" 
                  className={`${inputStyle} pl-12`} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <input type="text" placeholder="Квартира" className={inputStyle} />
              <input type="text" placeholder="Подъезд" className={inputStyle} />
              <input type="text" placeholder="Этаж" className={inputStyle} />
              <input type="text" placeholder="Код двери" className={inputStyle} />
            </div>
          </div>
        </div>

        {/* Время доставки */}
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
                onClick={() => setDeliveryDate(method.value)}
                type="button"
              >
                {method.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <MessageSquare className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h3 className="text-xl font-semibold">Дополнительно</h3>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Комментарий к заказу"
                className={`${inputStyle} pl-12`}
              />
            </div>
            
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="E-mail (для отправки чека)"
                className={`${inputStyle} pl-12`}
              />
            </div>
          </div>
        </div>

        {/* Кнопка подтверждения */}
        <Button
          type="submit"
          className={`w-full py-6 text-xl rounded-xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 
            transition-all transform hover:scale-[1.02] hover:shadow-xl`}
        >
          Подтвердить заказ
        </Button>
      </div>
    </form>
  );
}
