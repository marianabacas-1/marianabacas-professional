"use client";
import React from 'react';
import Image from 'next/image';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function EscuelaPresencial() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-14 pb-4 md:pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Escuela de <span className="text-primary">Shiatsu Biodinámico®</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 mb-8">Modalidad Presencial</h2>
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
                La Escuela de Shiatsu Biodinámico® nace como un espacio de formación integral, donde el cuerpo, la escucha y la presencia son los pilares del aprendizaje. En la modalidad presencial, ofrecemos una experiencia formativa profunda y vivencial, diseñada para quienes desean formarse profesionalmente en esta disciplina y vivir el proceso desde la práctica directa y el acompañamiento cercano.
              </p>
              <p className="mb-6">
                El método que desarrollé integra los principios del Shiatsu tradicional con la mirada biodinámica de la osteopatía, la práctica de yoga, incorporando herramientas de meditación, regulación emocional y contacto consciente. A lo largo de la formación, los estudiantes aprenden a leer el cuerpo desde su lenguaje sutil, a acompañar procesos de transformación y a cultivar una práctica respetuosa, sensible y eficaz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Modalidad */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              La modalidad incluye
            </h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Clases teóricas y prácticas</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Prácticas supervisadas</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Espacios de integración somática y reflexión grupal</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Material de estudio y recursos complementarios</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Rituales de apertura y cierre que acompañan cada etapa del proceso</span>
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
              <p className="text-lg text-gray-700">
                Está dirigida a terapeutas corporales, profesionales de la salud, docentes, y personas interesadas en el Trabajo corporal como camino de transformación. No se requiere experiencia previa, solo el compromiso de habitar el cuerpo con presencia y apertura.
              </p>
              <p className="text-lg text-gray-700 mt-6">
                Formamos profesionales capaces de sostener espacios de Cuidado, transformación y profundidad. Si sentís el llamado a aprender desde el cuerpo, la escucha y el vínculo, esta escuela puede ser tu lugar.
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
            href="https://wa.me/+5491163573328"
            target="_blank"
            className="flex items-center mx-auto px-auto py-auto w-[250px] gap-2 bg-secondary hover:bg-secondaryInt hover:opacity-75 text-white px-4 py-2 rounded-lg shadow hover:shadow-inner"><span>Inscribirme ahora</span>
            <WhatsAppIcon fontSize="small" />
            </a>
        </div>
      </section>
    </div>
  );
}
