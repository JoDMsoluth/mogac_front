import react from 'react';
import { Menu, MenuItem } from '@material-ui/core';

export default function UserToolbar({ anchorEl, handleMenuClose, isTeam }) {
  const isMenuOpen = Boolean(anchorEl);
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="avatar"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>블로그</MenuItem>
      <MenuItem onClick={handleMenuClose}>쪽지</MenuItem>
      {isTeam ? '' : <MenuItem onClick={handleMenuClose}>팀초대</MenuItem>}
    </Menu>
  );
}
