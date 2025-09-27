import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';
import AttributionIcon from '@mui/icons-material/Attribution';
import PeopleIcon from '@mui/icons-material/People';
import ChecklistIcon from '@mui/icons-material/Checklist';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; 

  return (
    <div>
      <div className="md:w-auto flex items-center rounded-lg my-auto">
        <button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className="inline-flex space-x-2 items-center justify-center  p-2 rounded-lg text-white bg-tertiary hover:bg-tertiaryWithOp shadow hover:opacity-100 text-sm font-semibold transition"
        >
          <AttributionIcon color={props.theme.palette.primary.main} />
          <div className="mx-auto -my-4 bg-rose-1000 text-white font-medium flex items-center justify-center uppercase hidden md:block">{props.account ? props.account?.firstName + ' ' + props.account?.lastName : 'Cargando...'}</div>
        </button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true} 
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        // Estilos personalizados para el fondo y color de texto
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.9)', // Fondo del menú
            color: '#ffffff', // Color de texto
          },
        }}
      >
        {
          props.account?.role === 'MASTERADMIN' && (<>
          <MenuItem 
            onClick={handleClose}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(122, 107, 107, 1)',
                color: '#ffffff',
              }
            }}
          >
            <Link href="/admin/users">
              <PeopleIcon sx={{ marginRight: '8px' }} />
              Usuarios
            </Link>
          </MenuItem>
          <MenuItem 
            onClick={handleClose}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(122, 107, 107, 1)',
                color: '#ffffff',
              }
            }}
          >
            <Link href="/admin/products">
              <InventoryIcon sx={{ marginRight: '8px' }} />
              Productos
            </Link>
          </MenuItem>
          <MenuItem 
            onClick={handleClose}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(122, 107, 107, 1)',
                color: '#ffffff',
              }
            }}
          >
            <Link href="/admin/orders">
              <ChecklistIcon sx={{ marginRight: '8px' }} />
              Pedidos
            </Link>
          </MenuItem>
          <MenuItem 
            onClick={handleClose}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(122, 107, 107, 1)',
                color: '#ffffff',
              }
            }}
          >
            <Link href="/admin/stats">
              <QueryStatsIcon sx={{ marginRight: '8px' }} />
              Estadísticas
            </Link>
          </MenuItem>
          </>)
        }
        <MenuItem 
          onClick={handleClose}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(122, 107, 107, 1)',
              color: '#ffffff',
            }
          }}
        >
          <Link href="/account">
            <AccountCircleIcon sx={{ marginRight: '8px' }} />
            Mi cuenta
          </Link>
        </MenuItem>
        <MenuItem 
          onClick={props.closeAction}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(122, 107, 107, 1)',
              color: '#ffffff',
            }
          }}
        >
          <ExitToAppIcon sx={{ marginRight: '8px' }} />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </div>
  );
}
