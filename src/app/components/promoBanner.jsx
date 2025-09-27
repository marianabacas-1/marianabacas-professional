"use client";
import React from "react";

export default function PromoBanner() {
  return (
    <div className="w-full bg-secondary text-gray-700 py-2 rounded-lg overflow-hidden relative mt-8 md:mt-0 -mb-4 md:-mb-8">
      <div className="whitespace-nowrap animate-marquee rounded-lg">
        <span className="mx-10">🔥 Envío gratis en compras mayores a $50.000</span>
        <span className="mx-10">⚡ 20% OFF pagando con transferencia bancaria</span>
        <span className="mx-10">🎁 2x1 en mates seleccionados hasta el domingo</span>
      </div>
    </div>
  );
}