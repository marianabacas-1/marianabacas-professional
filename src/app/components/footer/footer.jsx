import React from "react";
import FooterMenuItem from "../footerMenuItem";
import { FaInstagram, FaLinkedin, FaSpotify } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-gray-700 p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sección 1: Información de la empresa */}
        <div>
          <h2 className="text-xl font-semibold">Sobre Mi</h2>
          <p className="text-sm mt-2">
            <span>Osteópata Terapeuta Shiatsu Prof. yoga.</span><br/>
            <span>Podcast Voces del cuerpo.</span><br/>
            <span>Formación Terapeuta Shiatsu Biodinámico. Presencial y online.</span>
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Menú</h2>
          <ul className="mt-2 space-y-2">
            <FooterMenuItem href="/" item="Inicio" />
            <FooterMenuItem href="/shiatsu-biodinamico" item="Shiatsu Biodinámico" />
            <FooterMenuItem href="/escuela-virtual" item="Escuela Virtual" />
            <FooterMenuItem href="/contact" item="Contacto" />
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Contacto</h2>
          <p className="text-sm mt-2">Correo: marianabacas1@gmail.com</p>
          <p className="flex items-center gap-3 text-sm">
            Teléfono: +54 9 1111111111
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.instagram.com/marianabacas/"
              className="hover:text-white text-gray-700"
              aria-label="Instagram"
              target="_BLANK"
            >
              <FaInstagram size={30} className="my-auto" />
            </a>
            <a
              href="https://open.spotify.com/show/34zJkxItTEwqDz3wMFCjCC?si=7a40ba25c9814120"
              className="hover:text-white text-gray-700"
              aria-label="Spotify"
              target="_BLANK"
            >
              <FaSpotify size={30} className="my-auto" />
            </a>
            <a
              href="https://www.linkedin.com/in/mariana-bacas-92b1ba26/"
              className="hover:text-white text-gray-700"
              aria-label="Linkedin"
                target="_BLANK"
            >
                <FaLinkedin size={30} className="my-auto" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-700">
          © {new Date().getFullYear()} Mariana Bacas. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
