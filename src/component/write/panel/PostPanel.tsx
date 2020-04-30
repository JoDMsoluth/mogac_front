import react, { FC, useCallback, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/pallete';
import { Button, TextField } from '@material-ui/core';
import useInput from '../../../lib/hooks/useInput';
import PostLeftPanel from './PostLeftPanel';
import PostRightPanel from './PostRightPanel';

interface PostPanelProps {
  openPanel: boolean;
  setOpenPanel: any;
  markdown: string;
  tags: string;
  title: string;
  changeTags: any;
  changeTitle: any;
}

export default function PostPanel({
  openPanel,
  setOpenPanel,
  markdown,
  tags,
  title,
  changeTags,
  changeTitle,
}: PostPanelProps) {
  setOpenPanel(true);

  return (
    <>
      <S.PanelWrap open={openPanel}>
        <S.PostBox>
          <S.BoxHead>
            <Button onClick={() => setOpenPanel(false)}>Back</Button>
            <Button onClick={() => setOpenPanel(false)}>Post</Button>
          </S.BoxHead>
          <S.BoxBody>
            <PostLeftPanel
              markdown={markdown}
              title={title}
              changeTitle={changeTitle}
            />
            <PostRightPanel />
          </S.BoxBody>
        </S.PostBox>
      </S.PanelWrap>
    </>
  );
}

const S: any = {};

S.PanelWrap = styled.div<{ open: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  bottom: 0;
  width: 100vw;
  overflow: hidden;
  height: ${(props) => (props.open ? '100vh' : '0')};
  background: ${palette.teal0};
  transition: height 0.5s ease;
` as FC<{ open: boolean }>;

S.PostBox = styled.div`
  width: 35rem;
  height: 30rem;
  border-radius: 1rem;
  background: ${palette.teal3};
`;

S.BoxHead = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

S.BoxBody = styled.div`
  display: flex;
`;
