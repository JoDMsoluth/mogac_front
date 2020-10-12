import React, { useState, useCallback } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { useRouter } from 'next/router';
import Modal from '../../modal/Modal';
import Message from '../../message/Message';
import InviteTeamModal from '../../modal/InviteTeamModal';

export default function UserToolbar({
  anchorEl,
  handleMenuClose,
  isTeam,
  userId,
}) {
  const isMenuOpen = Boolean(anchorEl);
  const [visibleTeamModal, setVisibleTeamModal] = useState<boolean>(false);
  const router = useRouter();

  const toggleModal = useCallback(() => {
    setVisibleTeamModal(true);
  }, [visibleTeamModal, setVisibleTeamModal]);

  const [visible, setVisible] = useState(false);
  const onClickMessage = useCallback(() => {
    handleMenuClose();
    setVisible(!visible);
  }, [setVisible, visible]);
  const onClickBlog = useCallback(() => {
    handleMenuClose();
    router.push(`/blog?userId=${userId}`);
  }, []);
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="avatar"
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={onClickBlog}>블로그</MenuItem>
        <MenuItem onClick={onClickMessage}>쪽지</MenuItem>
        {isTeam ? '' : <MenuItem onClick={toggleModal}>팀초대</MenuItem>}
      </Menu>
      <Modal
        visible={visible}
        setVisible={setVisible}
        render={<Message />}
      ></Modal>
      <Modal
        visible={visibleTeamModal}
        setVisible={setVisibleTeamModal}
        render={<InviteTeamModal userId={userId} />}
      />
    </>
  );
}
