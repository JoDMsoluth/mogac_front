import React from 'react';
import Link from 'next/link';
import {
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  AppBar,
} from '@material-ui/core';
import { Menu, ChevronLeft, Home, Inbox, Mail } from '@material-ui/icons';
import { drawerWidth } from './AppLayout';

interface AppBurgerBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const AppHeader = ({ open, handleDrawerOpen }: AppBurgerBarProps) => {
  return (
    <>
      <AppBar
        position="static"
        style={{
          width: `calc(100% - ${open ? drawerWidth : 0}px)`,
          marginLeft: open ? drawerWidth : 0,
          transition: 'all 0.2s',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Menu"
            onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flex: 1 }}>
            Cosmos 코딩 스터디 모임s
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppHeader;
