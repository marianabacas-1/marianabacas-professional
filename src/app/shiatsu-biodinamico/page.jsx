"use client";
import React, { useEffect, useContext } from 'react';
import WebContainer from '../components/webContainer';
import { Context } from "../context/Context";
import Carrousel from '../components/carrousel';
import Link from 'next/link';
import Image from 'next/image';
import ImageAndTextSection from '../components/ImageAndTextSection';
import PromoBanner from '../components/promoBanner';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};


export default function Home() {
  return (

      <div className="bg-white py-20">
        <video id="video" className="relative z-10 w-full mb-8 mx-auto rounded-3xl md:w-2/6" autoPlay muted loop>
            <source src="mariana_bacas.mp4" type="video/mp4"/>
        </video>
           {/* Método Shiatsu Biodinámico Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-700 mb-12">
              <span className="text-primary">Método</span> Shiatsu Biodinámico
            </h2>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              variants={fadeInUp}
            >
              <p className="text-gray-600 leading-relaxed mb-6">
                Es la integración de los tres pilares de mi trabajo: Shiatsu, osteopatía y yoga. Sumando mis más de 20 años de experiencia como terapeuta corporal.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Haciendo énfasis en lo somático, en el movimiento respiratorio primario y en la relación que existe entre nuestros órganos y las emociones.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Profundizando sobre la escucha con los oídos y con las manos para acompañar los procesos personales y los de otras personas con amabilidad y confianza.
              </p>
              
              <motion.div 
                className="text-center mt-10"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">Escuela presencial</h3>
                <p className="text-gray-600 italic">
                  Próximamente fechas para la formación 2026
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>

  )
}
