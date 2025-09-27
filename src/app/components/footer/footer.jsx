import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FooterMenuItem from "../footerMenuItem";
import { FaTiktok } from "react-icons/fa";
import PhoneIcon from "@mui/icons-material/Phone"; 

const Footer = () => {
  return (
    <footer className="bg-secondaryWithOp text-primary p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sección 1: Información de la empresa */}
        <div>
          <h2 className="text-xl font-semibold">Sobre Mi Celu</h2>
          <p className="text-sm mt-2">
            Somos una tienda de productos tecnológicos, accesorios y regalos para todo tipo de ocasiones.<br/> Vení a visitarnos en <span className="font-semibold">Av. Lavalle 479, San Carlos de Bolívar.</span>
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Menú</h2>
          <ul className="mt-2 space-y-2">
            <FooterMenuItem href="/" item="Inicio" />
            <FooterMenuItem href="/about" item="Quiénes Somos" />
            <FooterMenuItem href="/products" item="Productos" />
            <FooterMenuItem href="/contact" item="Contacto" />
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Contáctanos</h2>
          <p className="text-sm mt-2">Correo: micelubolivar@gmail.com</p>
          <p className="flex items-center gap-3 text-sm">
            Teléfono: +54 9 2314 479338
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.instagram.com/micelubolivar/"
              className="hover:text-gray-700 text-primary"
              aria-label="Instagram"
              target="_BLANK"
            >
              <InstagramIcon fontSize="large" />
            </a>
            <a
              href="https://www.tiktok.com/@micelubolivar"
              className="hover:text-gray-700 text-primary"
              aria-label="TikTok"
                target="_BLANK"
            >
                <FaTiktok size={30} className="my-auto" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary mt-8 pt-4 text-center">
        <p className="text-sm text-primary">
          © {new Date().getFullYear()} Mi Celu - tienda tech & gift. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
