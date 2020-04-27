import React from 'react';
import { Menu, MenuItem, Badge, IconButton } from '@material-ui/core';
import { menuId } from './menuId';
import { useAuth } from '../../../../utils/auth/AuthProvider';

interface RenderMenuProps {
  anchorEl: any;
  handleMenuClose: any;
}

export default function RenderMenu({
  anchorEl,
  handleMenuClose,
}: RenderMenuProps) {
  const isMenuOpen = Boolean(anchorEl);
  const [_, logout] = useAuth();
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Post</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );
}
