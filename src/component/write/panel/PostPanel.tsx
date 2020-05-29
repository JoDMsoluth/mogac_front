import react, { FC, useCallback, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/pallete';
import { Button, TextField } from '@material-ui/core';
import useInput from '../../../lib/hooks/useInput';
import PostLeftPanel from './PostLeftPanel';
import PostRightPanel from './PostRightPanel';
import { useWrite } from '../../../utils/write/WriteProvide';
import { useMutation } from '@apollo/react-hooks';
import regex from '../../../lib/regex';
import postGql from '../../../lib/gql/postGql';
import { useRouter } from 'next/router';

interface PostPanelProps {
  openPanel: boolean;
  setOpenPanel: any;
}

export default function PostPanel({ openPanel, setOpenPanel }: PostPanelProps) {
  const { state, dispatch } = useWrite();
  const router = useRouter();
  const [addPost] = useMutation(postGql.Add_Post);
  const {
    title,
    contents,
    tags,
    desc,
    cover_img,
    category,
    skillset,
    seriesId,
  } = state;
  const clickPostButton = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(
        'title, contents, tags, desc, cover_img, category, skillset, series',
        title,
        contents,
        tags,
        desc,
        cover_img,
        category,
        skillset,
        seriesId,
      );
      // string tags 를 #을 기준으로 배열로 만듦
      const arrayTags = regex.tagsToArrayTags(tags);
      console.log('arrayTags', arrayTags);
      // category skillset을 합쳐서 post category로 저장
      const postCategory = `${category} ${skillset}`;
      console.log('postCategory', postCategory);

      try {
        const result = await addPost({
          variables: {
            data: {
              title,
              contents,
              desc,
              tags: arrayTags,
              cover_img,
              category: postCategory,
              series: seriesId,
            },
          },
        });
        console.log('result', result);
        router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    [title, contents, tags, desc, cover_img, category, skillset, seriesId],
  );
  return (
    <>
      <S.PanelWrap>
        <S.PostBox>
          <S.BoxHead>
            <Button onClick={() => setOpenPanel(false)}>Back</Button>
            <Button onClick={clickPostButton}>Post</Button>
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
