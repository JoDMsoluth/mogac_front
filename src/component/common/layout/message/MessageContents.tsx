import { Button } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/pallete';
import MessageModal from '../../../modal/MessageModal';
import Modal from '../../../modal/Modal';

interface MessageContentsProps {
    selectedMessage : any;
    setVisibleReadMessage : any;
    visibleReadMessage : boolean;
}

export default function MessageContents ({selectedMessage, setVisibleReadMessage, visibleReadMessage} : MessageContentsProps) {
    // 토글 쪽지보내기
    const [visibleMessage, setVisibleMessage] = useState<boolean>(false);
    
    const toggleMessageModal = useCallback(() => {
        setVisibleMessage(true);
    }, [visibleMessage, setVisibleMessage]);

    const backMessageBox = useCallback(() => {
        setVisibleReadMessage(false);
    }, [visibleReadMessage, setVisibleReadMessage]);

    if(!selectedMessage) return null;
    return (
        <>
            <S.Container>
                <S.Header>
                    <Button variant="contained" color="primary" onClick={backMessageBox}>뒤로가기</Button>
                    <Button variant="contained" color="primary" onClick={toggleMessageModal}>답장하기</Button>
                </S.Header>
                <S.Sender>보낸사람 : {selectedMessage.sendUserName}</S.Sender>
                <S.Title>
                    {selectedMessage.title}
                </S.Title>
                <S.Contents>
                    {selectedMessage.contents}
                </S.Contents>
            </S.Container>
          <Modal
            visible={visibleMessage}
            setVisible={setVisibleMessage}
            render={<MessageModal
              receiveUser={selectedMessage?.sendUser}
              receiveName={selectedMessage?.sendUserName}
            />}
          />
        </>
    )
}

const S: any = {};

S.Container = styled.div`
  color: ${palette.gray7};
  padding: 0.5rem;
  overflow: auto;
  margin: 1rem 1rem;
`;

S.Sender = styled.h4`
    color : ${palette.gray5};
`;

S.Header = styled.div`
    display: flex;
    width : 100%;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

S.Title = styled.h3`
    width : 100%;
    margin-bottom: 1rem;
`;

S.Contents = styled.div`
    width : 100%;
`;