import react, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import { TextField } from '@material-ui/core';

interface TagBarProps {
  tags: string;
  changeTags: any;
}

export default function TagBar({ tags, changeTags }: TagBarProps) {
  return (
    <>
      <S.TagBarWrap>
        <TextField
          id="standard-basic"
          fullWidth
          label="Tag"
          name="tags"
          value={tags}
          onChange={changeTags}
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
    margin: 0 auto;
  }
`;
