import React from "react";
import { FlipWords } from "../components/ui/flip-words";

export function FlipWordsDemo() {
  const words = ["TECNOLOGÍA", "CALIDAD", "RENDIMIENTO", "INNOVACIÓN"];

  return (
    <div className="flex justify-center items-center px-4">
      <div className="text-4xl sm:text-7xl mx-auto font-bold text-white">
        <FlipWords words={words} />
      </div>
    </div>
  );
}
