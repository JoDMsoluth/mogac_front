import react, { useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import { TextField } from '@material-ui/core';

interface EditPaneProps {
  markdown: string;
  setMarkdown: any;
}

export default function EditPane({ markdown, setMarkdown }: EditPaneProps) {
  useEffect(() => {});

  const handleChange = useCallback(
    (e) => {
      setMarkdown(e.target.value);
    },
    [markdown],
  );
  return (
    <>
      <S.WriteHeadBarWrap>
        <TextField id="standard-basic" fullWidth label="  Title" />
      </S.WriteHeadBarWrap>
    </>
  );
}

const S: any = {};
S.WriteHeadBarWrap = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
  & > div {
    width: 90%;
    display: flex;
    margin: 0 auto;
  }
  & > textarea {
    padding: 0.5rem 1rem;
    width: 100%;
    height: 100%;
    line-height: 1.7rem;
    background: ${palette.gray0};
    border: none;
  }
`;
