import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/pallete';
import MessageContents from './MessageContents';
import MessageList from './MessageList';

interface MessageBox {
  data: any;
}

export default function MessageBox({ data }) {
  const [visibleReadMessage, setVisibleReadMessage] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  return (
    <>
      <S.Container>
        {visibleReadMessage
        ? <MessageContents selectedMessage={selectedMessage} visibleReadMessage={visibleReadMessage} setVisibleReadMessage={setVisibleReadMessage} />
        : <MessageList data={data} visibleReadMessage={visibleReadMessage} setVisibleReadMessage={setVisibleReadMessage} selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} />
         }
      </S.Container>
    </>
  );
}

const S: any = {};

S.Container = styled.div`
  width: 20rem;
  height: 20rem;
  font-size: 0.8rem;
  overflow: auto;
  padding : 1rem 0;
  background: ${palette.gray0};
  color: ${palette.gray6};
  &:hover {
    box-shadow: 0 0 30px 0 rgba(223, 120, 239, 0.2);
  }
`;
