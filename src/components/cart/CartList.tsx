"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";

/**
 * Компонент, который выводит список товаров в корзине,
 * используя контекст useCart
 */
export default function CartList() {
  const { cart } = useCart();

  return (
    <div className="w-full lg:w-3/5 space-y-4 sm:space-y-6">
      {cart.map((item, index) => {
        const caloriesString = item.capacities?.find(capacity => capacity.value.includes("calories"))?.value.match(/\d+/)?.[0] || "0";
        const calories = parseInt(caloriesString, 10);
        return <CartItem key={item.id} item={{ ...item, calories }} index={index} />;
      })}
    </div>
  );
}