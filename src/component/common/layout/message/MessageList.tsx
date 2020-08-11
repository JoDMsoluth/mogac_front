import React from 'react';
import styled from 'styled-components';

const dummyData = {
  _id: 'string',
  sendDate: 'Date',
  receiveDate: 'Date',
  title: 'string',
  contents: 'string',
  sendUser: 'any',
  receiveUser: 'any',
};

export default function MessageList() {
  return (
    <>
      <S.Container>
        <span>{dummyData?.sendUser}</span>
        <span>{dummyData?.sendDate}</span>
        <span>{dummyData?.title}</span>
      </S.Container>
    </>
  );
}

const S: any = {};

S.Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20rem;
  height: 10rem;
  overflow: auto;
  margin: 0.5rem 0.5rem 0 0.5rem;
`;
