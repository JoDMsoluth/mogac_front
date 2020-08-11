import React from 'react';
import styled from 'styled-components';

export default function ErrorMessage({ children }) {
  return (
    <>
      <S.AlertWrap>{children}</S.AlertWrap>
    </>
  );
}
const S: any = {};
S.AlertWrap = styled.div`
  position: absolute;
  top: -1.2rem;
  left: 0;
  color: red;
  font-size: 13px;
`;
