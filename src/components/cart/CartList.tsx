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
      {cart.map((item, index) => (
        <CartItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
