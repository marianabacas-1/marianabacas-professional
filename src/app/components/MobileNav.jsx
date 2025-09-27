import React, { useState, Fragment, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import PrimaryButton from './primaryButton';
import { useRouter } from 'next/navigation'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Context } from '../context/Context';
import MobileAdminMenu from './mobileAdminMenu';

export default function MobileNav() {
  const [state, setState] = useState({
    top: false,
  });
  const router = useRouter();
  const { logout, accessToken } = useContext(Context);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const closeSession = () => {
    logout();
    router.push('/login');
  }

  const navbarItems = [{itemName: 'Inicio', href: '/'}, {itemName: 'Accesorios', href: '/products?category=accesorios'}, {itemName: 'Electronica', href: '/products?category=electronica'}, {itemName: 'Regalos', href: '/products?category=regalos'}, {itemName: 'Contacto', href: '/contact'}]

  const list = (anchor) => (
      <div className="bg-secondary py-4 px-4">
        <Box
          sx={{ width: anchor === 'Menú' ? 'auto' : 250, minWidth: '100%', }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="basis-1/3 flex justify-start items-center"
            >
              <Image
                alt="Logo Mi Celu"
                src="/mi_celu.png"
                width={60}
                height={60}
              />
            </Link>
           
            <button
              onClick={toggleDrawer('Menú', true)}
              className="basis-1/3 flex justify-end"
            >
              <MenuIcon style={{ color: 'rgba(150, 29, 112, 1)' }} />
            </button>
          </div>
            <List>
              {navbarItems?.map((item, index) => (
                    <div className="w-full text-gray-700 grid justify-items-end" key={index}><Link href={item.href} className="text-lg hover:font-semibold hover:text-2xl">{item.itemName}</Link></div>
              ))}
            </List>
            <div className="my-auto text-white grid justify-end mt-2">
                <div className="grid gap-2">
                  {!accessToken && <PrimaryButton onClick={() => router.push('/login')} actionText="Iniciar sesión / registrarse" />}
                  {/*accessToken && <PrimaryButton onClick={() => closeSession()} actionText={<span className="flex items-center"><ExitToAppIcon sx={{ marginRight: '8px' }} />Cerrar sesión</span>} />*/}
                  {accessToken && <MobileAdminMenu />}
                </div>
              </div>
        </Box>
      </div>
  );

  return (
    <div className="block md:hidden" style={{ zIndex: 900 }}>
    <div className="flex justify-between items-center">
            <Link
              href="/"
              className="basis-1/3 flex justify-start items-center"
            >
              <Image
                alt="Logo Mi Celu"
                src="/mi_celu.png"
                width={60}
                height={60}
              />
            </Link>
     
            <button
              onClick={toggleDrawer('Menú', true)}
              className="basis-1/3 flex justify-end"
            >
              <MenuIcon fontSize='medium' color='action'/>
            </button>
          </div>
      {['Menú'].map((anchor) => (
        <Fragment key={anchor}>
            <Drawer
              color="primary"
              anchor={'top'}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
        </Fragment>
      ))}
    </div>
  );
}