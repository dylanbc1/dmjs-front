"use client";
import React from "react";
import { HoverBorderGradient } from "../components/ui/hover-border-over";

export function HoverBorderGradientDemo() {
  return (
    <div className="flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-[#1c1c3c] font-bold hover:bg-[#14142c] transition-all duration-300 text-white flex items-center space-x-2"
      >
        <span>Prueba DMaJorAI</span>
      </HoverBorderGradient>
    </div>
  );
};
