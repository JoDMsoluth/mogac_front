import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/pallete';
import MessageList from './MessageList';

interface MessageBox {
  toggle: boolean;
}
export default function MessageBox({ toggle }) {
  return (
    <>
      {!toggle ? null : (
        <S.Container>
          <S.Header>
            <th>보낸사람</th>
            <th>보낸날짜</th>
            <th>제목</th>
          </S.Header>
          <tbody>
            <MessageList />
          </tbody>
        </S.Container>
      )}
    </>
  );
}

const S: any = {};

S.Container = styled.table`
  width: 30rem;
  height: 20rem;
  overflow: auto;
  background: ${palette.gray0};
  position: absolute;
  top: 0;
  right: 0;
  color: ${palette.gray6};
  &:hover {
    box-shadow: 0 0 30px 0 rgba(223, 120, 239, 0.2);
  }
`;

S.Header = styled.thead`
  display: flex;
  padding: 0.5rem;
  font-size: 1.5rem;
  justify-content: space-between;
`;
