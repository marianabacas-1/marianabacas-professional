"use client";
import React, { useEffect, useContext } from 'react';
import WebContainer from './components/webContainer';
import { Context } from "./context/Context";
import Carrousel from './components/carrousel';
import Link from 'next/link';
import Image from 'next/image';
import ImageAndTextSection from './components/ImageAndTextSection';
import PromoBanner from './components/promoBanner';
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
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Hola, soy <span className="text-primary">Mariana Bacas</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Osteópata y Terapeuta especializada en Bienestar Integral
            </motion.p>
            <motion.div 
              className="w-40 h-1 bg-primary mx-auto mb-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            ></motion.div>
            <motion.div 
              className="w-64 h-80 md:w-80 md:h-96 mx-auto relative rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Image 
                src="/inicio_hero.jpg" 
                alt="Mariana Bacas" 
                layout="fill" 
                objectFit="cover"
                className="rounded-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mi Camino Section */}
      <motion.section 
        className="py-16 bg-white"
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
              Mi <span className="text-primary">Camino</span>
            </h2>
            
            <div className="space-y-20">
              {/* First Journey Step */}
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-8"
                variants={fadeInUp}
              >
                <div className="w-full md:w-1/3">
                  <motion.div 
                    className="relative h-64 rounded-xl overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image 
                      src="/inicio_camino.jpg" 
                      alt="Inicio del camino" 
                      layout="fill" 
                      objectFit="cover"
                    />
                  </motion.div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Mis inicios</h3>
                  <p className="text-gray-600 leading-relaxed">
                    El primer paso fue a los 16 años cuando comencé a practicar yoga. Me gradué como Tecnóloga en Industrias de alimentos pero no era feliz, estaba descentrada. Me sentía vacía, sin propósito y sin saber qué hacer con mi vida.
                  </p>
                </div>
              </motion.div>

              {/* Second Journey Step */}
              <motion.div 
                className="flex flex-col md:flex-row-reverse items-center gap-8"
                variants={fadeInUp}
              >
                <div className="w-full md:w-1/3">
                  <motion.div 
                    className="relative h-64 rounded-xl overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image 
                      src="/inicio_giro.jpg" 
                      alt="Transformación" 
                      layout="fill" 
                      objectFit="cover"
                    />
                  </motion.div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Un giro inesperado</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Mi vida dio un giro de 180° cuando retomé mi práctica de yoga y decidí formarme como profesora. Enseguida supe que era por donde quería caminar y fui recuperando el entusiasmo. Me di cuenta que mi pasión era ayudar a las personas a encontrar su equilibrio y bienestar integral.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Formación Section */}
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
              Mi <span className="text-primary">Formación</span>
            </h2>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-8 mb-12 text-gray-700"
              variants={staggerContainer}
            >
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
             <h3 className="text-xl font-semibold text-gray-700 mb-4">Educación Principal</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Osteópata - Centro de Estudios Osteopáticos de Buenos Aires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Terapeuta Shiatsu - Shiatsu Nuad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Profesora de Yoga - Centro de Maha Yoga Santa Visión</span>
                </li>
              </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Especializaciones</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Osteopatía Biodinámica con Carolle Dumais</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Yoga Terapéutico y Meditación en Centro de Maha Yoga Santa Visión</span>
                </li>
              </ul>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <motion.div 
                className="relative h-64 w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg mb-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image 
                  src="/IMG-20230723-WA0035 (1).jpg" 
                  alt="Mariana Bacas en formación" 
                  layout="fill" 
                  objectFit="cover"
                  className="rounded-xl"
                />
              </motion.div>
              <motion.p 
                className="text-gray-600 italic text-center max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                &ldquo;El aprendizaje es un viaje que nunca termina. Cada paciente, cada sesión, es una nueva oportunidad para crecer.&rdquo;
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Método Section */}
      <motion.section 
        className="py-16 bg-white"
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
                <span className="text-primary">Método</span> Shiatsu Biodinámico®
              </h2>
              <motion.div 
                className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              ></motion.div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Una propuesta que integra cuerpo, emoción y energía en un abordaje profundo y respetuoso.
              </p>
            </div>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-8 mb-12"
              variants={staggerContainer}
            >
              <motion.a 
                href="/escuela-presencial" 
                className="hover:shadow-md bg-gray-50 p-6 rounded-xl text-center block hover:shadow-lg transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-primaryWithOp2 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary">🏫</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Escuela Presencial</h3>
                <p className="text-gray-600">Formación profesional con acompañamiento personalizado</p>
              </motion.a>
              
              <motion.a 
                href="/escuela-virtual" 
                className="hover:shadow-md bg-gray-50 p-6 rounded-xl text-center block hover:shadow-lg transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-primaryWithOp2 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary">🌐</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Escuela Virtual</h3>
                <p className="text-gray-600">Formación profesional con acompañamiento virtual</p>
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="bg-primaryWithOp2 p-8 rounded-2xl text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.p 
                className="text-xl text-gray-700 mb-6 italic"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                &ldquo;Mi trabajo se basa en la escucha, la presencia y el compromiso con el bienestar integral.&rdquo;
              </motion.p>
              <div className="flex items-center justify-center space-x-4">
                <motion.div 
                  className="w-12 h-12 rounded-full overflow-hidden"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Image 
                    src="/mariana_bcas.png" 
                    alt="Mariana Bacas" 
                    width={48} 
                    height={48}
                    className="object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="text-left"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <p className="font-semibold text-gray-700">Mariana Bacas</p>
                  <p className="text-sm text-gray-600">Fundadora y Terapeuta</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}