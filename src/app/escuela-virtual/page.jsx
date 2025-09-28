"use client";
import React from 'react';
import Image from 'next/image';
import PrimaryButton from '../components/primaryButton';

export default function EscuelaVirtual() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-14 pb-4 md:pt-20 pb-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Escuela de <span className="text-primary">Shiatsu Biodinámico®</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 mb-8">Modalidad Virtual</h2>
            <div className="w-32 h-1 bg-primary mx-auto mb-12"></div>
          </div>
        </div>
      </section>

      {/* Descripción Principal */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg text-gray-700">
              <p className="text-xl mb-6">
                La modalidad virtual de la Escuela de Shiatsu Biodinámico® fue creada para expandir el acceso a esta formación, sin perder la calidad, la profundidad ni el acompañamiento que caracterizan nuestro método. Está pensada para quienes desean formarse profesionalmente desde cualquier lugar, integrando teoría, práctica y reflexión en un formato flexible y cuidadosamente diseñado.
              </p>
              <p className="mb-6">
                El programa combina clases grabadas, encuentros en vivo, materiales de estudio y espacios de supervisión, permitiendo que cada estudiante avance a su ritmo, con seguimiento personalizado y una comunidad de aprendizaje activa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Temáticas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Lo que <span className="text-primary">aprenderás</span>
            </h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Fundamentos del Shiatsu, la visión biodinámica de la osteopatía y la práctica de yoga para desarrollar la consciencia y el cuidado personal del cuerpo</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Anatomía energética y emocional</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Lectura corporal y escucha profunda</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Técnicas de contacto consciente y regulación del sistema nervioso</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Prácticas guiadas y estudio de casos</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Integración somática y rituales de cierre</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* A quién va dirigido */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary/10 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">¿A quién está dirigido?</h2>
              <p className="text-lg text-gray-700 mb-6">
                La escuela virtual está dirigida a terapeutas, profesionales del bienestar, docentes y personas interesadas en el Trabajo corporal como camino de transformación. No se requiere experiencia previa, solo compromiso, apertura y disposición para aprender desde el cuerpo y la presencia.
              </p>
              <p className="text-lg text-gray-700">
                El objetivo es formar profesionales capaces de sostener espacios de Cuidado, transformación y profundidad, con una mirada integradora y respetuosa. Si buscás una formación seria, flexible y transformadora, esta modalidad puede ser tu puerta de entrada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Querés comenzar tu viaje?</h2>
          <p className="text-xl text-gray-600 mb-8">Inscribite ahora y comenza tu formación en Shiatsu Biodinámico®</p>
          <a 
          href="https://shiatsu-biodinamico.tiendup.com/" 
          target="_blank"
        className="bg-secondary hover:bg-secondaryInt hover:opacity-75 text-white px-4 py-2 rounded-lg shadow hover:shadow-inner">Inscribirme ahora</a>
        </div>
      </section>
    </div>
  );
}
