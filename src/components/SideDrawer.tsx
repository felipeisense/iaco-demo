"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';  // Asegúrate de que js-cookie está instalado

const drawerWidth = 240;

const SideDrawer = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleNavigation = (path: string) => {
    if (path === '/login') {
      Cookies.remove('isAuthenticated'); // Elimina la cookie de autenticación
      localStorage.removeItem('isAuthenticated'); // Opcional, en caso de que uses localStorage también
    }
    router.push(path);
    setOpen(false);
  };

  return (
    <Box>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ position: 'absolute', top: 16, left: 16 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en dispositivos móviles
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ width: drawerWidth, display: 'flex', flexDirection: 'column' }}>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ alignSelf: 'flex-end', m: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/home')}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/home')}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Mi Perfil" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/login')}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideDrawer;
