import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Badge, NoSsr } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';
import MessageBox from '../message/MessageBox';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

interface ToolbarItemListProps {
  handleProfileMenuOpen: any;
  handleMobileMenuOpen: any;
}

export default function ToolbarItemList({
  handleProfileMenuOpen,
  handleMobileMenuOpen,
}: ToolbarItemListProps) {
  const [toggleNoti, setToggleNoti] = useState(false);
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
    <>
      <div className={classes.grow} />
      <div className={classes.sectionDesktop}>
        {/* 알림 아이콘 */}
        <S.NotificationIcon
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={() => setToggleNoti(!toggleNoti)}
        >
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
            <MessageBox toggle={toggleNoti} />
          </Badge>
        </S.NotificationIcon>
        {/* 유저 아이콘 */}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>
      {/* 모바일 버전 */}
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
    </>
  );
}

const S: any = {};

S.NotificationIcon = styled(IconButton)`
  position: relative;
`;
