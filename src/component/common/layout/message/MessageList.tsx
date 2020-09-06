import { useQuery } from '@apollo/react-hooks';
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
        <td>{dummyData?.sendUser}</td>
        <td>{dummyData?.sendDate}</td>
        <td>{dummyData?.title}</td>
      </S.Container>
    </>
  );
}

const S: any = {};

S.Container = styled.tr`
  display: flex;
  justify-content: space-between;
  height: 5rem;
  overflow: auto;
  margin: 0.5rem 0.5rem 0 0.5rem;
`;
