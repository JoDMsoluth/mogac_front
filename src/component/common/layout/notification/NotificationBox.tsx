import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/pallete';
import NotificationList from './NotificationList';

interface NotificationBox {
  data: any;
}

export default function NotificationBox({ data }) {
  return (
    <>
      <S.Container>
        <NotificationList data={data} />
      </S.Container>
    </>
  );
}

const S: any = {};

S.Container = styled.div`
  width: 20rem;
  height: 20rem;
  overflow: auto;
  font-size: 0.8rem;
  background: ${palette.gray0};
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
