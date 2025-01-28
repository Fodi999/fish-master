"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

/**
 * Интерфейс товара (Section), который хранится в вашем JSON (например, rolls.json)
 */
interface Section {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  description: string;
  buttonText: string;
  capacities: { value: string; active: boolean }[];
  price: string;
  prev: string | null;
  next: string | null;
}

/** Модифицированный товар в корзине, с добавленным quantity */
interface CartItem extends Section {
  quantity: number;
}

/** Интерфейс для контекста корзины */
interface CartContextType {
  cart: CartItem[];
  addToCart: (section: Section) => void;
  removeFromCart: (itemId: string) => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
  cartCount: number;
  totalPrice: number;
}

/** Создаём сам контекст */
const CartContext = createContext<CartContextType | undefined>(undefined);

/** Провайдер корзины: оборачиваем им всё приложение в layout.tsx */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Добавление в корзину
  const addToCart = (section: Section) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === section.id);
      if (existingItem) {
        // Если товар уже есть, увеличиваем количество
        return prevCart.map((item) =>
          item.id === section.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Иначе добавляем в конец массива
      return [...prevCart, { ...section, quantity: 1 }];
    });
  };

  // Удаление из корзины
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Увеличить количество
  const incrementQuantity = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Уменьшить количество
  const decrementQuantity = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // Количество товаров в корзине
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Общая сумма
  const totalPrice = cart.reduce((acc, item) => {
    // price может быть строкой вида "25.99" или "25" — убираем лишние знаки
    const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return acc + (isNaN(priceValue) ? 0 : priceValue) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/** Хук для использования корзины */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
