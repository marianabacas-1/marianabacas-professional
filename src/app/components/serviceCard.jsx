import React from "react";
import PaymentCheckout from "./paymentCheckout";

const ServiceCard = ({ service }) => {
  const { title, description, iconUrl, price } = service;

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg p-4 gap-4 w-full max-w-5xl">
      <div className="w-24 h-24 flex-shrink-0">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={title}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            <span className="text-sm">Sin Icono</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between flex-grow space-y-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{description || "Sin descripción disponible."}</p>
        </div>
        <p className="text-lg font-semibold text-secondary">${price.toFixed(2)}</p>
        <div className="block md:hidden w-full md:w-2/6">
          <PaymentCheckout title={title} unitPrice={price} quantity={1} disabled={false} />
        </div>
      </div>
      <div className="hidden md:block">
          <PaymentCheckout title={title} unitPrice={price} quantity={1} disabled={false} />
        </div>
    </div>
  );
};

export default ServiceCard;
