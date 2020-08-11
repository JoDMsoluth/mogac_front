import React from 'react';
import styled from 'styled-components';

const dummyData = {
  id: 1,
  sendData: 'asdf',
  receiveDate: '나',
  title: '첫 쪽찌',
  contents: '첫 내용',
  sendUser: '흑흑',
  receiveUser: '띠용?',
};

export default function Dropdown() {
  return (
    <>
      <S.Container></S.Container>
    </>
  );
}

const S: any = {};

S.Container = styled.div`
  width: 30rem;
  height: 10rem;
`;
