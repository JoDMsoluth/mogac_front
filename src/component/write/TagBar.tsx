import react, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import { TextField } from '@material-ui/core';
import { useWrite } from '../../utils/write/WriteProvide';

export default function TagBar() {
  const { state, dispatch } = useWrite();
  const onChangeTags = useCallback(
    (e) => {
      dispatch({ type: 'ChangeTags', data: e.target.value });
    },
    [state.tags],
  );
  return (
    <>
      <S.TagBarWrap>
        <TextField
          id="standard-basic"
          fullWidth
          label="Tag"
          name="tags"
          value={state.tags}
          onChange={onChangeTags}
        />
      </S.TagBarWrap>
    </>
  );
}

const S: any = {};
S.TagBarWrap = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray5};
  overflow: hidden;
  & > div {
    width: 90%;
    display: flex;
    margin: 0.5rem auto;
  }
`;
