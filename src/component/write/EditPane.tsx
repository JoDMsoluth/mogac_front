import react, { useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import { TextField } from '@material-ui/core';
import dynamic from 'next/dynamic';

const CodeWithCodemirror = dynamic(import('./CodeMirror'), {
  ssr: false,
});

interface EditPaneProps {
  markdown: string;
  setMarkdown: any;
  title: string;
  changeTitle: any;
}

export default function EditPane({
  markdown,
  setMarkdown,
  title,
  changeTitle,
}: EditPaneProps) {
  return (
    <>
      <S.WriteHeadBarWrap>
        <TextField
          id="standard-basic"
          fullWidth
          label="  Title"
          onChange={changeTitle}
          name="title"
          value={title}
        />
        <CodeWithCodemirror markdown={markdown} setMarkdown={setMarkdown} />
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
  & > div:nth-child(2) {
    width: 100%;
    height: 100%;
    line-height: 1.7rem;
  }
  .CodeMirror {
    height: 100%;
    width: 100%;
  }
  .react-codemirror2 {
    width: 100%;
  }
  .CodeMirror-sizer {
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem 1.5rem;
  }
`;
