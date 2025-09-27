import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People'; 
import SettingsIcon from '@mui/icons-material/Settings';
import WebIcon from '@mui/icons-material/Web';

export default function AdminMenu(props) {
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
      <div className="md:w-auto flex items-center rounded-3xl my-auto">
        <button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className="mx-2 w-11/12 flex gap-2 rounded-2xl py-2 px-3 flex items-center text-white text-md hover:bg-tertiaryWithOp bg-tertiary"
        >
          <span className="bg-secondary text-white p-1 rounded-lg flex items-center"><AdminPanelSettingsIcon color={props.theme.palette.primary.main} /></span>
          <span className="w-full grid justify-start text-sm">Administración</span>
          {!open && <KeyboardArrowUpIcon
            style={{
              transform: 'rotate(180deg)'
            }}
          />}
          {open && <KeyboardArrowRightIcon />}
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

        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#C1666B',
            color: '#ffffff',
          },
        }}
      >
        <MenuItem 
          onClick={handleClose}
          sx={{
            '&:hover': {
              backgroundColor: '#555555',
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
              backgroundColor: '#555555',
              color: '#ffffff',
            }
          }}
        >
          <Link href="/admin/web">
            <WebIcon sx={{ marginRight: '8px' }} />
            Web
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
