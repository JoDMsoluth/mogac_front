import react, { useState, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';
import { Label } from '@material-ui/icons';

export default function TagBar() {
  const [tag, setTag] = useState('');
  const handleChange = useCallback(
    (e) => {
      setTag(e.target.value);
    },
    [tag],
  );
  return (
    <>
      <S.TagBarWrap>
        <TextField
          id="standard-basic"
          fullWidth
          label="Tag"
          name="tag"
          value={tag}
          onChange={handleChange}
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
