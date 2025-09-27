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
      <div className="fixed top-0 w-screen z-50 bg-secondary md:bg-gradient-to-r from-white via-secondary to-primary">
        <div className="px-6 md:px-16 shadow mx-auto flex z-50 flex-col py-4 md:py-3 md:flex-row w-full">
          <MobileNav />
          <Link
            href="/"
            className="hidden md:block title-font font-medium items-center text-white text-2xl hover:text-gray-300 md:mb-0"
          >
            <div className="flex flex-col items-center"><Image alt="Logo Mi Celu" src="/mi_celu.png" width={80} height={80} /></div>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-gray-700 justify-center">
            <NavLink to="/" text="Inicio" />
            <NavLink to="/products?category=accesorios" text="Accesorios" />
            <NavLink to="/products?category=electronica" text="Electronica" />
            <NavLink to="/products?category=regalos" text="Regalos" />
            <NavLink to="/contact" text="Contacto" />
          </nav>
          <div className="my-auto hidden md:block">
            <div className="flex gap-2">
                {!webToken && <PrimaryButton onClick={() => router.push('/login')} actionText="Iniciar sesión / registrarse" />}
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
