'use client';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Context } from '../context/Context';
import { useEffect, useState, useContext } from 'react';
import PrimaryButton from './primaryButton';
import paymentsService from '../services/paymentsService';

export default function PaymentCheckout({ disabled, title, unitPrice, quantity }) {
  const [isLoading, setIsLoading] = useState(false);
  const { changeAlertStatusMessage } = useContext(Context);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
      locale: 'es-AR',
    });
  }, []);

  const createPreference = async () => {
    setIsLoading(true);
    let body = {
      title,
      unit_price: unitPrice,
      quantity,
    };
    const res = await paymentsService.newPayment(body);
    setIsLoading(false);
    if (res.init_point) {
      window.location.href = res.init_point;
    }
  };

  return (
    <>
      <PrimaryButton buttonDisabled={disabled} isLoading={isLoading} isLoadingText="Redireccionando..." onClick={createPreference} actionText="Agregar al carrito" />
      <PrimaryButton buttonDisabled={disabled} isLoading={isLoading} isLoadingText="Redireccionando..." onClick={createPreference} actionText="Comprar" />
    </>
  );
}
