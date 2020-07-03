import React, { useState } from 'react';
import Link from 'next/link';
import {
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  ChevronLeft,
  Home,
  Inbox,
  Mail,
  GroupTwoTone,
  Pageview,
  AccountBox,
} from '@material-ui/icons';
import { drawerWidth } from './AppLayout';
import { useAuth } from '../../../utils/auth/AuthProvider';

interface AppHeaderProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const AppBurgerBar = ({ open, handleDrawerClose }: AppHeaderProps) => {
  const [{ data }, _] = useAuth();
  return (
    <>
      <Drawer variant="persistent" open={open}>
        <div style={{ width: drawerWidth }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link href="/">
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </a>
            </Link>
            <Link href="/profile">
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <AccountBox />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
              </a>
            </Link>
            <Link href="/user/search">
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <Pageview />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItem>
              </a>
            </Link>
            <Link href={`/blog?userId=${data.getCurrentUser._id}`}>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <Inbox />
                  </ListItemIcon>
                  <ListItemText primary="Blog" />
                </ListItem>
              </a>
            </Link>
            <Link href="/team">
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <GroupTwoTone />
                  </ListItemIcon>
                  <ListItemText primary="Team" />
                </ListItem>
              </a>
            </Link>
            <Link href="/about">
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <Mail />
                  </ListItemIcon>
                  <ListItemText primary="About" />
                </ListItem>
              </a>
            </Link>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default AppBurgerBar;
