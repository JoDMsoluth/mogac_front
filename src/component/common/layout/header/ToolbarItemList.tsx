import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Badge, NoSsr } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';
import MessageBox from '../message/MessageBox';
import notificationGql from '../../../../lib/gql/notificationGql';
import messageGql from '../../../../lib/gql/messageGql';
import { useRouter } from 'next/router';
import Modal from '../../../modal/Modal';
import NotificationBox from '../notification/NotificationBox';


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
  const [totalNoti, setTotalNoti] = useState(0);
  const [toggleMessage, setToggleMessage] = useState(false);
  const [totalMessage, setTotalMessage] = useState(0);
  const [messages, setMessages] = useState(null);
  const [notifications, setNotifications] = useState(null);

  const { data: notificationData, error: notificationError, refetch: notificationRefetch } = useQuery(
    notificationGql.GET_ALL_NOTIFICATIONS,
    {
      variables: {
        page: 1,
      },
    },
  );

  
  const { data: messageData, error: messageError, refetch: messageRefetch } = useQuery(
    messageGql.GET_ALL_MESSAGES,
    {
      variables: {
        page: 1,
      },
    },
  );

  if (notificationError) {
    console.log('get notifications error', notificationError);
  }
  if (messageError) {
    console.log('get messages error', messageError);
  }

  notificationRefetch
  useEffect(() => {
    const interval = setInterval(() => {
      notificationRefetch()
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      messageRefetch()
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (notificationData) {
      setNotifications(notificationData.getAllNotifications.docs);
      setTotalNoti(notificationData.getAllNotifications.totalIsView);
    }
  }, [notificationData, notifications]);

  useEffect(() => {
    if (messageData) {
      console.log('messageData', messageData)
      setMessages(messageData.getAllMessages.docs);
      setTotalMessage(messageData.getAllMessages.totalIsView);
    }
  }, [messageData, messages]);

  const changeToggleNoti = useCallback(() => {
    setToggleNoti(!toggleNoti);
    setToggleMessage(false);
  }, [toggleNoti, toggleMessage]);

  const changeToggleMessage = useCallback(() => {
    setToggleMessage(!toggleMessage);
    setToggleNoti(false);
  }, [toggleNoti, toggleMessage]);

  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
    <>
      <div className={classes.grow} />
      <div className={classes.sectionDesktop}>
        <IconButton
          aria-label={`show ${totalMessage} new mails`}
          color="inherit"
          onClick={changeToggleMessage}
        >
          <Badge badgeContent={totalMessage} color="secondary">
            <MailIcon />
            <Modal
              visible={toggleMessage}
              setVisible={setToggleMessage}
              render={<MessageBox data={messages} />}
            />
          </Badge>
        </IconButton>
        {/* 알림 아이콘 */}
        <S.NotificationIcon
          aria-label={`show ${totalNoti} new notifications`}
          color="inherit"
          onClick={changeToggleNoti}
        >
          <Badge badgeContent={totalNoti} color="secondary">
            <NotificationsIcon />
            <Modal
              visible={toggleNoti}
              setVisible={setToggleNoti}
              render={<NotificationBox data={notifications} />}
            />
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
