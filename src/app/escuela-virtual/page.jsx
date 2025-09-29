"use client";
import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function EscuelaVirtual() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section 
        className="relative pb-4 pt-20 bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Escuela de <span className="text-primary">Shiatsu Biodinámico®</span>
            </h1>
            <motion.h2 
              className="text-2xl md:text-3xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Modalidad Virtual
            </motion.h2>
            <motion.div 
              className="w-32 h-1 bg-primary mx-auto mb-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            ></motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg text-gray-700">
              <motion.p 
                className="text-xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                La Escuela de Shiatsu Biodinámico® en su modalidad virtual es una propuesta innovadora que combina la profundidad del aprendizaje con la flexibilidad que ofrece la tecnología. A través de una plataforma intuitiva y dinámica, los estudiantes acceden a clases en vivo, material didáctico exclusivo y un espacio de práctica supervisada, sin importar su ubicación geográfica.
              </motion.p>
              
              <motion.p 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                El programa está diseñado para que puedas formarte a tu ritmo, con el acompañamiento personalizado y la riqueza del aprendizaje grupal. Cada módulo incluye clases teóricas, demostraciones prácticas, espacios de consulta y ejercicios vivenciales que te permitirán integrar los conocimientos de manera progresiva.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Beneficios de la modalidad virtual
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              {[
                "Flexibilidad horaria para adaptarte a tus necesidades",
                "Acceso desde cualquier lugar del mundo",
                "Material de estudio disponible 24/7",
                "Clases en vivo con interacción en tiempo real",
                "Acompañamiento personalizado",
                "Comunidad de aprendizaje activa"
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            ¿Querés comenzar tu viaje?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Inscribite ahora y comenza tu formación en Shiatsu Biodinámico®
          </motion.p>
          <motion.a 
            href="https://shiatsu-biodinamico.tiendup.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-secondaryInt hover:opacity-75 text-white px-4 py-2 rounded-lg shadow hover:shadow-inner"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Inscribirme ahora
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}