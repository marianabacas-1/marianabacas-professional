'use client';
import React, { useEffect, useState } from 'react';
import WebTitle from "../components/webTitle";
import WebContainer from '../components/webContainer';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Map = dynamic(
  () => import('../components/map'),
  { ssr: false }
);


export default function Contact() {
  const [wd, setWd] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWd(window);
    }
  }, []);

  return (
    <WebContainer>
      {/*<WebTitle text="Contacto" />
      <div className="text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 md:p-6 md:gap-6 p-4 gap-4 mx-auto bg-secondary rounded-lg shadow-xl">
          <div className='col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          <div>
              <p>
                <span className='flex gap-1 font-semibold text-gray-700'>
                  <PhoneIcon /> 
                  Contacto
                </span>
                <hr className="w-full h-0.5 mb-4 bg-gray-700" />
              </p>
              <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <EmailIcon fontSize="small" className="ml-0.5" />
                <a
                  href="mailto:micelubolivar@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-500"
                >
                  micelubolivar@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon fontSize="small" className="ml-0.5" />
                <a
                  href="https://wa.me/5492314479338"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-500"
                >
                  +54 9 2314 479338
                </a>
              </li>
              </ul> 
            </div>           
            <div>
              <p>
                <span className='flex gap-1 font-semibold text-gray-700'>
                  <ConnectWithoutContactIcon /> 
                  Redes sociales
                </span>
                <hr className="w-full h-0.5 mb-4 bg-gray-700" />
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <InstagramIcon fontSize="small" className="ml-0.5" />
                  <a
                    href="https://www.instagram.com/micelubolivar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-500"
                  >
                    Instagram
                  </a>
                </li>
                <li className="flex items-center gap-3 transition-colors">
                  <FaTiktok fontSize="small" className="ml-0.5" />
                  <a
                    href="https://www.tiktok.com/@micelubolivar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-500"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
            <Image
              className="rounded-lg col-span-2 mx-auto hidden md:block"
              src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/7.png"
              width={600}
              height={300}
              alt="Mi Celu Bolívar logo"
            />
          </div>
          <div>
            <p>
              <span className='flex gap-1 font-semibold text-gray-700'>
                <LocationOnIcon /> 
                Av. Lavalle 479, San Carlos de Bolívar
              </span>
              <hr className="w-full h-0.5 mb-4 bg-gray-700" />
            </p>
            <Map 
              lat={-36.2334026} 
              lon={-61.1194657} 
              className="w-full h-64" 
              address="Av. Lavalle 479, San Carlos de Bolívar" 
            />
          </div>
        </div>
      </div>
      */}
    </WebContainer>
  );
}
