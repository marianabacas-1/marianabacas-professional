"use client";
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Context } from '../context/Context';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Inventory as InventoryIcon,
  Checklist as ChecklistIcon,
  ExitToApp as ExitToAppIcon,
  ExpandLess,
  ExpandMore,
  QueryStats as QueryStatsIcon,
} from '@mui/icons-material';

export default function MobileAdminMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { account, logout } = useContext(Context);

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleNavigation = (path) => (e) => {
    router.push(path);
    setOpen(false);
  };

  const handleLogout = (e) => {
    logout();
    router.push('/login');
  };

  if (!account) {
    return null;
  }

  const menuItemStyles = {
    '&:hover': {
      backgroundColor: 'rgba(122, 107, 107, 0.3)',
      borderRadius: 1,
    },
    color: 'gray',
    mb: 0.5,
  };

  const listItemIconStyles = { 
    color: 'inherit', 
    minWidth: 30,
    '& .MuiSvgIcon-root': {
      fontSize: '1.25rem',
    }
  };

  const listItemTextStyles = {
    '& .MuiTypography-root': {
      fontSize: '1rem',
      fontFamily: 'inherit',
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <ListItemButton 
        onClick={handleToggle}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(122, 107, 107, 0.1)',
          },
          color: 'gray',
          borderRadius: 1,
          mb: 1,
          px: 1,
        }}
      >
        <ListItemIcon sx={{ color: 'inherit', minWidth: 30 }}>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText 
          sx={listItemTextStyles}
          primary={
            <Typography variant="body1" fontWeight="medium">
              Administración
            </Typography>
          } 
        />
        {open ? <ExpandLess color="action"/> : <ExpandMore color="action" />}
      </ListItemButton>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 2, pr: 1 }}>
          {/* Mi Cuenta - Always visible */}
          <ListItem 
            button 
            onClick={handleNavigation('/account')}
            sx={menuItemStyles}
          >
            <ListItemIcon sx={listItemIconStyles}>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Mi cuenta" 
              sx={listItemTextStyles}
            />
          </ListItem>

          {/* Admin Menu Items - Only for MASTERADMIN */}
          {account.role === 'MASTERADMIN' && (
            <>
              <ListItem 
                button 
                onClick={handleNavigation('/admin/users')}
                sx={menuItemStyles}
              >
                <ListItemIcon sx={listItemIconStyles}>
                  <PeopleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Usuarios" 
                  sx={listItemTextStyles}
                />
              </ListItem>

              <ListItem 
                button 
                onClick={handleNavigation('/admin/products')}
                sx={menuItemStyles}
              >
                <ListItemIcon sx={listItemIconStyles}>
                  <InventoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Productos" 
                  sx={listItemTextStyles}
                />
              </ListItem>

              <ListItem 
                button 
                onClick={handleNavigation('/admin/orders')}
                sx={menuItemStyles}
              >
                <ListItemIcon sx={listItemIconStyles}>
                  <ChecklistIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Pedidos" 
                  sx={listItemTextStyles}
                />
              </ListItem>
              <ListItem 
                button 
                onClick={handleNavigation('/admin/stats')}
                sx={menuItemStyles}
              >
                <ListItemIcon sx={listItemIconStyles}>
                  <QueryStatsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Estadísticas" 
                  sx={listItemTextStyles}
                />
              </ListItem>
            </>
          )}

          <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <ListItem 
            button 
            onClick={handleLogout}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderRadius: 1,
              },
              color: '#ef4444',
            }}
          >
            <ListItemIcon sx={{ ...listItemIconStyles, color: '#ef4444' }}>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Cerrar sesión" 
              sx={{
                '& .MuiTypography-root': {
                  color: '#ef4444',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                }
              }}
            />
          </ListItem>
        </List>
      </Collapse>
    </Box>
  );
}