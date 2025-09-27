"use client";
import React, { useEffect, useContext } from 'react';
import WebContainer from './components/webContainer';
import visitsService from "./services/statsService";
import { Context } from "./context/Context";
import Carrousel from './components/carrousel';
import Image from 'next/image';
import ImageAndTextSection from './components/ImageAndTextSection';
import PromoBanner from './components/promoBanner';

export default function Home() {
  const { account, fetchUser } = useContext(Context);

  useEffect(() => {
    if(!account) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if(userInfo?.sub) {
          fetchUser(userInfo.sub);
      }
    }
    const updateVisits = async () => {
      const body = { page: window.location.pathname };
      await visitsService.addVisit(body);
    }
    updateVisits();
  }, [])

  return (
    <WebContainer>
      <PromoBanner />
      <Carrousel />
        {/* Sección de bienvenida */}
        <section className="py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Artículos electrónicos, accesorios y regalos para todo tipo de ocasiones
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontrá auriculares, parlantes, fundas de teléfono, mouses, teclados y mucho más para acompañar tu día a día.
          </p>
        </section>

        <ImageAndTextSection
          title="Tecnología confiable, pensada para vos."
          text="Trabajamos con productos que combinan diseño, innovación y durabilidad. Desde accesorios para tu teléfono hasta equipos de audio, cada detalle está pensado para brindarte comodidad, estilo y el mejor desempeño."
          src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/Imagen%20de%20WhatsApp%202025-09-03%20a%20las%2011.00.22_acd42462.jpg"
          link="Productos"
          href="/products"
          width={650}
          reverse
          height={650}
        />

        {/* Sección de productos destacados */}
        <section className="">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Productos destacados
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="bg-white shadow rounded-xl p-4 text-center hover:shadow-lg transition">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src="/mi_celu.png" // reemplazar
                  alt="Auriculares"
                  fill
                  className="object-contain rounded"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Auriculares</h3>
              <p className="text-sm text-gray-500">Sonido de alta calidad</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow rounded-xl p-4 text-center hover:shadow-lg transition">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src="/mi_celu.png" // reemplazar
                  alt="Parlante"
                  fill
                  className="object-contain rounded"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Parlantes</h3>
              <p className="text-sm text-gray-500">Potencia y estilo</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow rounded-xl p-4 text-center hover:shadow-lg transition">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src="/mi_celu.png" // reemplazar
                  alt="Funda de teléfono"
                  fill
                  className="object-contain rounded"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Fundas</h3>
              <p className="text-sm text-gray-500">Protección con diseño</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white shadow rounded-xl p-4 text-center hover:shadow-lg transition">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src="/mi_celu.png" // reemplazar
                  alt="Mouse"
                  fill
                  className="object-contain rounded"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-800">Mouses y teclados</h3>
              <p className="text-sm text-gray-500">Precisión y comodidad</p>
            </div>
          </div>
        </section>
        <Image
          src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/7.png"
          alt="Micelu"
          width={3780}
          height={1890}
          className="w-full md:w-4/6 rounded-lg shadow-xl h-auto mx-auto"
        />

        {/* Beneficios */}
        <section className="py-12 rounded-xl">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <h4 className="text-xl font-semibold text-gray-800">🚚 Envíos rápidos</h4>
              <p className="text-sm text-gray-600">A todo el país</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">💳 Pagá en cuotas</h4>
              <p className="text-sm text-gray-600">Con todas las tarjetas</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">🛡️ Garantía asegurada</h4>
              <p className="text-sm text-gray-600">Comprá con confianza</p>
            </div>
          </div>
        </section>
    </WebContainer>
  )
}
