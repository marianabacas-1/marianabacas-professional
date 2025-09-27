"use client";
import React, { useState, useEffect } from "react";
import { getPromotions } from "@/app/services/promotionService";

export default function PromoBanner() {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getPromotions();
        setPromotions(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching promotions:", err);
        setError("No se pudieron cargar las promociones");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 text-center py-2">
        Cargando promociones...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-100 text-red-700 text-center py-2">
        {error}
      </div>
    );
  }

  if (promotions.length === 0) {
    return null; // No mostrar nada si no hay promociones
  }

  return (
    <div className="w-full bg-secondary text-gray-700 py-2 rounded-lg overflow-hidden relative mt-8 md:mt-0 -mb-4 md:-mb-8">
      <div className="whitespace-nowrap animate-marquee rounded-lg">
        {promotions.map((promo, index) => (
          <span key={promo._id} className="mx-10">
            {promo.icon} {promo.text}
          </span>
        ))}
      </div>
    </div>
  );
}
