import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/pallete';
import MessageList from './MessageList';

export default function MessageItem() {
  return (
    <>
      <S.Container>
        <S.Header>
          <span>보낸사람</span>
          <span>보낸날짜</span>
          <span>제목</span>
        </S.Header>
        <div>
          <MessageList />
        </div>
      </S.Container>
    </>
  );
}

const S: any = {};

S.Container = styled.div`
  width: 20rem;
  height: 10rem;
  overflow: auto;
  background: ${palette.gray2};
`;

S.Header = styled.div`
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
`;
