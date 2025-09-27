import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import NavLink from "./navLink";
import PrimaryButton from "./primaryButton";
import { useRouter } from 'next/navigation'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { createTheme } from '@mui/material/styles';
import AccountMenu from "./accountMenu"; 
import { useContext } from 'react';
import { Context } from '../context/Context';

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState('');
  const router = useRouter();
  const [webToken, setWebToken] = useState(null);
  const { account, logout } = useContext(Context);
  const theme = createTheme({
    palette: {
        primary: {
        main: '#992846'
        }
    },
  });

  const closeSession = () => {
    logout();
    router.push('/login');
  }

  useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if(token) setWebToken(token);
  }, [])
  
  
  return (
    <>
      <div className="fixed top-0 w-screen z-50 bg-gradient-to-r from-white via-secondary to-primary">
        <div className="px-6 md:px-16 shadow mx-auto flex z-50 flex-col py-4 md:py-3 md:flex-row w-full">
          <MobileNav />
          <Link
            href="/"
            className="hidden md:block title-font font-medium items-center text-white text-2xl hover:text-gray-300 md:mb-0"
          >
            <div className="flex flex-col items-center py-2"><Image alt="Logo mariana bacas" src="/mariana_bacas_recortada.png" width={120} height={60} /></div>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-gray-700 justify-center">
            <NavLink to="/" text="Inicio" />
            <NavLink to="/shiatsu-biodinamico" text="Shiatsu Biodinámico" />
            <NavLink to="/escuela-virtual" text="Escuela Virtual" />
            <NavLink to="/contact" text="Contacto" />
          </nav>
          <div className="my-auto hidden md:block">
            <div className="flex gap-2">
                {/* {!webToken && <PrimaryButton onClick={() => router.push('/login')} actionText="Iniciar sesión / registrarse" />}
                {webToken && <AccountMenu account={account} theme={theme} closeAction={() => closeSession()}/>}
                {/*<PrimaryButton onClick={() => closeSession()} actionText={<span className="flex items-center"><ExitToAppIcon sx={{ marginRight: '8px' }} />Cerrar sesión</span>} />*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
