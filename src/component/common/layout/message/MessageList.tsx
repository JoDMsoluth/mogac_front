import { useMutation } from '@apollo/react-hooks';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import messageGql from '../../../../lib/gql/messageGql';
import palette from '../../../../lib/pallete';
import formatDate from '../../../../lib/utils/dateFormat';
import MessageModal from '../../../modal/MessageModal';
import Modal from '../../../modal/Modal';

const NewSVG = require("../../../../static/images/new.svg")

interface MeesageListProps {
  data : any;
  setVisibleReadMessage : any;
  visibleReadMessage: boolean;
  selectedMessage : any;
  setSelectedMessage : any;
}

export default function MessageList({ data, setVisibleReadMessage, visibleReadMessage, selectedMessage, setSelectedMessage } : MeesageListProps) {
  console.log('noti data', data);
  
  const [updateMessageIsView] = useMutation(messageGql.UPDATE_MESSAGE_ISVIEW);

  const toggleReadMessageModal = useCallback((message) => () => {
    setVisibleReadMessage(true);
    setSelectedMessage(message)
    updateMessageIsView({
      variables : {
        id : message._id
      }
    })
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
            {!message?.isView && <S.New><img src={NewSVG} width="20" height="20"/></S.New>}
          </S.Container>
        </>
      ))}
    </>
  );
}

const S: any = {};

S.Container = styled.div`
  position : relative;
  background: ${palette.gray3};
  color: ${palette.gray7};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  margin: 0.3rem 1rem;
`;

S.New = styled.div`
  position : absolute;
  top : -0.5rem;
  left : -0.5rem;
`;