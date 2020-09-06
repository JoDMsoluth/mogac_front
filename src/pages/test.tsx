import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Message from '../component/message/Message';
import Modal from '../component/modal/Modal';
import MessageBox from '../component/common/layout/message/MessageBox';

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
      <div style={{ background: 'yellow' }}></div>
    </>
  );
};

export default TeamPage;
