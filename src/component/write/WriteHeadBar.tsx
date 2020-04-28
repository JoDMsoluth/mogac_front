import react from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import { Button } from '@material-ui/core';

export default function WriteHeadBar() {
  return (
    <>
      <S.WriteHeadBarWrap>
        <Button>Back</Button>
        <Button>Post</Button>
      </S.WriteHeadBarWrap>
    </>
  );
}

const S: any = {};
S.WriteHeadBarWrap = styled.div`
  background: ${palette.gray6};
  padding: 0 0.8rem;
  display: flex;
  justify-content: space-between;
  & > button {
    height: 4rem;
  }
`;
