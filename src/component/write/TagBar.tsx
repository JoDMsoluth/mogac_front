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
        <FormControl error={false}>
          <InputLabel htmlFor="component-error">Name</InputLabel>
          <Input
            id="component-error"
            value={tag}
            name="tag"
            onChange={handleChange}
            aria-describedby="component-error-text"
          />
          <FormHelperText id="component-error-text">Error</FormHelperText>
        </FormControl>
      </S.TagBarWrap>
    </>
  );
}

const S: any = {};
S.TagBarWrap = styled.div`
  border-top: 1px solid ${palette.gray5};
  width: 100%;
  & > div {
    width: 100%;
  }
  & > input {
    height: 3.5rem;
    margin: 0 1rem;
  }
`;
