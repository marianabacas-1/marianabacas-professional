"use client";
import React, { useEffect, useContext } from 'react';
import WebContainer from './components/webContainer';
import { Context } from "./context/Context";
import Carrousel from './components/carrousel';
import Link from 'next/link';
import Image from 'next/image';
import ImageAndTextSection from './components/ImageAndTextSection';
import PromoBanner from './components/promoBanner';

export default function Home() {
  return (

      <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 mb-6 leading-tight">
              Hola, soy <span className="text-primary">Mariana Bacas</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Osteópata y Terapeuta especializada en Bienestar Integral
            </p>
            <div className="w-40 h-1 bg-primary mx-auto mb-12"></div>
            <div className="w-64 h-80 md:w-80 md:h-96 mx-auto relative rounded-lg overflow-hidden shadow-2xl">
              <Image 
                src="/mariana_bcas.png" 
                alt="Mariana Bacas" 
                layout="fill" 
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mi Camino Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-700 mb-12">
              Mi <span className="text-primary">Camino</span>
            </h2>
            
            <div className="space-y-20">
              {/* First Journey Step */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image 
                      src="/mariana_bcas.png" 
                      alt="Inicio del camino" 
                      layout="fill" 
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Mis inicios</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Mi camino comenzó a los 16 años, cuando descubrí el Yoga. Ese primer contacto con el cuerpo y la respiración abrió una búsqueda que continúa hasta hoy.
                  </p>
                </div>
              </div>

              {/* Second Journey Step */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="w-full md:w-1/3">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image 
                      src="/mariana_bcas.png" 
                      alt="Transformación" 
                      layout="fill" 
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Un giro inesperado</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Trabajé durante años en oficinas y laboratorios, pero no me sentía plena. El insomnio y la desconexión me llevaron a retomar mi práctica de Yoga.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formación Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-700 mb-12">
              Mi <span className="text-primary">Formación</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12 text-gray-700">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Educación Principal</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Instructora de Yoga y Meditación - Instituto Santa Visión</span>
                  </li>
                  {/* Add more education items */}
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Especializaciones</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Yoga Terapéutico</span>
                  </li>
                  {/* Add more specializations */}
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative h-64 w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg mb-8">
                <Image 
                  src="/mariana_bcas.png" 
                  alt="Mariana Bacas en formación" 
                  layout="fill" 
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
              <p className="text-gray-600 italic text-center max-w-3xl mx-auto">
              &ldquo;El aprendizaje es un viaje que nunca termina. Cada paciente, cada sesión, es una nueva oportunidad para crecer.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Método Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
                <span className="text-primary">Método</span> Shiatsu Biodinámico®
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Una propuesta que integra cuerpo, emoción y energía en un abordaje profundo y respetuoso.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Link href="/escuela-presencial" className="hover:shadow-md bg-gray-50 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-primaryWithOp2 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary">🏫</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Escuela Presencial</h3>
                <p className="text-gray-600">Formación profesional con acompañamiento personalizado</p>
              </Link>
              <Link href="/escuela-virtual" className="hover:shadow-md bg-gray-50 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-primaryWithOp2 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary">🌐</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Escuela Virtual</h3>
                <p className="text-gray-600">Formación profesional con acompañamiento virtual</p>
              </Link>
              
              {/* Add more method features */}
            </div>
            
            <div className="bg-primaryWithOp2 p-8 rounded-2xl text-center">
              <p className="text-xl text-gray-700 mb-6 italic">
              &ldquo;Mi trabajo se basa en la escucha, la presencia y el compromiso con el bienestar integral.&rdquo;
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image 
                    src="/mariana_bcas.png" 
                    alt="Mariana Bacas" 
                    width={48} 
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-700">Mariana Bacas</p>
                  <p className="text-sm text-gray-600">Fundadora y Terapeuta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
           {/* <ImageAndTextSection
        title="Mariana Bacas."
        text="Soy Mariana Bacas, Osteópata y Terapeuta especializada en Bienestar Integral."
        src="/mariana_bcas.png"
        link="Productos"
        href="/products"
        width={650}
        reverse
        height={650}
      /> */}
    </div>

  )
}
