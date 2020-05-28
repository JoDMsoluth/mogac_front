import react, { FC, useCallback, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/pallete';
import { Button, TextField } from '@material-ui/core';
import useInput from '../../../lib/hooks/useInput';
import PostLeftPanel from './PostLeftPanel';
import PostRightPanel from './PostRightPanel';
import { useWrite } from '../../../utils/write/WriteProvide';
import { useMutation } from '@apollo/react-hooks';

interface PostPanelProps {
  openPanel: boolean;
  setOpenPanel: any;
}

export default function PostPanel({ openPanel, setOpenPanel }: PostPanelProps) {
  const { state, dispatch } = useWrite();
  //const [addPost] = useMutation();
  const {
    title,
    contents,
    tags,
    desc,
    cover_img,
    category,
    skillset,
    series,
  } = state;
  const post = useCallback(() => {}, [
    title,
    contents,
    tags,
    desc,
    cover_img,
    category,
    skillset,
    series,
  ]);
  return (
    <>
      <S.PanelWrap>
        <S.PostBox>
          <S.BoxHead>
            <Button onClick={() => setOpenPanel(false)}>Back</Button>
            <Button onClick={() => setOpenPanel(false)}>Post</Button>
          </S.BoxHead>
          <S.BoxBody>
            <PostLeftPanel />
            <PostRightPanel />
          </S.BoxBody>
        </S.PostBox>
      </S.PanelWrap>
    </>
  );
}

const S: any = {};

S.PanelWrap = styled.div`
  z-index: 100;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  bottom: 0;
  width: 100vw;
  overflow: hidden;
  height: 100%;
  background: ${palette.teal0};
`;

S.PostBox = styled.div`
  width: 35rem;
  border-radius: 1rem;
  background: ${palette.blue4};
`;

S.BoxHead = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  & > button {
    color: white;
  }
`;

S.BoxBody = styled.div`
  display: flex;
`;
