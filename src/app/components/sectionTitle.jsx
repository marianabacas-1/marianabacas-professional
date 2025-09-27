import React from "react";

export default function SectionTitle({ text, className }) {
  return (
    <div
      className={`relative py-4 px-6 bg-white rounded-t-xl border-2 border-secondaryWithOp shadow-md ${className}`}
    >
      {/* Línea decorativa arriba */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primaryWithOp to-primaryWithOp2 rounded-full"></span>

      {/* Texto */}
      <h2 className="text-secondary text-center text-2xl md:text-3xl font-bold tracking-wide">
        {text}
      </h2>
    </div>
  );
}
