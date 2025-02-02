"use client";

import React from "react";
import ProductSliders from "@/components/ProductSliders/ProductSliders";
import ButtonGroup from "@/components/ButtonGroup";
import ChatWidget from "@/bot/ChatWidget";

export default function HomePage() {
  return (
    <>
      <ButtonGroup />
      <ProductSliders />
      <ChatWidget />
    </>
  );
}




