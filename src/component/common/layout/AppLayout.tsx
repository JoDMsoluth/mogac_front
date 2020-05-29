import React, { useState, ReactNode } from 'react';
import { Container } from '@material-ui/core';
import AppBurgerBar from './AppBurgerBar';
import AppHeader from './header/AppHeader';
import AppFooter from './AppFooter';
import { useAuth } from '../../../utils/auth/AuthProvider';

interface LayoutProps {
  children: ReactNode;
}

export const drawerWidth = 240;

const AppLayout = ({ children }: LayoutProps) => {
  const [data, logout] = useAuth();
  console.log('auth', data, logout);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <section>
        <AppBurgerBar open={open} handleDrawerClose={handleDrawerClose} />
        <AppHeader open={open} handleDrawerOpen={handleDrawerOpen} />

        <Container>
          <article>
            {children}
            <AppFooter />
          </article>
        </Container>
      </section>
    </>
  );
};

export default AppLayout;
