import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/pallete';
import formatDate from '../../../../lib/utils/dateFormat';
import MessageModal from '../../../modal/MessageModal';
import Modal from '../../../modal/Modal';

interface MeesageListProps {
  data : any;
  setVisibleReadMessage : any;
  visibleReadMessage: boolean;
  selectedMessage : any;
  setSelectedMessage : any;
}

export default function MessageList({ data, setVisibleReadMessage, visibleReadMessage, selectedMessage, setSelectedMessage } : MeesageListProps) {
  console.log('noti data', data);
  

  const toggleReadMessageModal = useCallback((message) => () => {
    setVisibleReadMessage(true);
    setSelectedMessage(message)
  }, [visibleReadMessage, setVisibleReadMessage]);

  return (
    <>
      {data?.map((message) => (
        <>
          {/* 클릭시 메시지 보기로 이동 */}
          <S.Container onClick={toggleReadMessageModal(message)}>
            <div>{formatDate(message?.createdAt) || '날짜'}</div>
            <div>{message?.sendUserName || '제목'} 보냄</div>
            <div>{message?.title || '내용'}</div>
          </S.Container>
        </>
      ))}
    </>
  );
}

const S: any = {};

S.Container = styled.div`
  background: ${palette.gray3};
  color: ${palette.gray7};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  overflow: auto;
  margin: 0.3rem 1rem;
`;
