import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Message from '../component/message/Message';
import Modal from '../component/modal/Modal';
import MessageItem from '../component/common/layout/message/MessageItem';

const TeamPage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CssBaseline />
      <button onClick={() => setVisible(!visible)}>눌러라</button>
      <main>
        <Modal
          visible={visible}
          setVisible={setVisible}
          render={<Message />}
        ></Modal>
      </main>
      <div style={{ background: 'yellow' }}>
        <MessageItem />
      </div>
    </>
  );
};

export default TeamPage;
