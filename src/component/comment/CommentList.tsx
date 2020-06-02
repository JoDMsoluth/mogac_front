import React, { useMemo } from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import CommentCard from './CommentCard';
import { useWrite } from '../../utils/write/WriteProvide';

export default function CommentList() {
  const { state } = useWrite();
  const { comments } = state;
  return (
    <>
      <S.CommentListWrap>
        {comments.length > 0 &&
          comments.map((comment) => <CommentCard comment={comment} />)}
      </S.CommentListWrap>
    </>
  );
}

const S: any = {};

S.CommentListWrap = styled.div`
  margin: 1rem 2rem;
`;
