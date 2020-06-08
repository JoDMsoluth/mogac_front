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
          comments.map((comment) => (
            <CommentCard comment={comment} key={comment._id} />
          ))}
      </S.CommentListWrap>
    </>
  );
}

const S: any = {};

S.CommentListWrap = styled.div`
  margin: 1rem 2rem;
  @media (max-width: 768px) {
    margin: 1rem 0.5rem;
  }
`;
