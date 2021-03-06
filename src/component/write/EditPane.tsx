import react, { useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import { TextField } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { useWrite } from '../../utils/write/WriteProvide';

// 동적임폴트하여 ssr과 별개로 불러온다.
const CodeWithCodemirror = dynamic(import('./CodeMirror'), {
  ssr: false,
});

export default function EditPane() {
  const { state, dispatch } = useWrite();

  const onChangeTitle = useCallback(
    (e) => {
      dispatch({ type: 'ChangeTitle', data: e.target.value });
    },
    [state.title],
  );

  return (
    <>
      <S.WriteHeadBarWrap>
        <TextField
          fullWidth
          label="  Title"
          onChange={onChangeTitle}
          name="title"
          value={state.title}
        />
        {typeof window !== 'undefined' && <CodeWithCodemirror />}
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
    margin: 0.5rem auto;
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
  .CodeMirror-scroll {
    width: 100%;
    padding-right: 1rem;
  }
`;
