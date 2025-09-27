"use client";
import React, { useEffect, useContext } from 'react';
import WebContainer from './components/webContainer';
import { Context } from "./context/Context";
import Carrousel from './components/carrousel';
import Image from 'next/image';
import ImageAndTextSection from './components/ImageAndTextSection';
import PromoBanner from './components/promoBanner';

export default function Home() {

  return (
    <WebContainer>
      {/*<Carrousel />*/}
        {/* Sección de bienvenida */}
        <section className="py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Hola, soy Mariana Bacas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soy osteópata terapeuta shiatsu, formada en Argentina y con experiencia en el campo.
          </p>
        </section>

        <ImageAndTextSection
          title="Tecnología confiable, pensada para vos."
          text="Trabajamos con productos que combinan diseño, innovación y durabilidad. Desde accesorios para tu teléfono hasta equipos de audio, cada detalle está pensado para brindarte comodidad, estilo y el mejor desempeño."
          src="/mariana_bcas.png"
          link="Productos"
          href="/products"
          width={650}
          reverse
          height={650}
        />
    </WebContainer>
  )
}
