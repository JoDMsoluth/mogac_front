import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import CommentCard from './CommentCard';

const comments = [1, 2, 3];

export default function CommentList() {
  return (
    <>
      <S.CommentListWrap>
        {comments.map((comment) => (
          <CommentCard />
        ))}
      </S.CommentListWrap>
    </>
  );
}

const S: any = {};

S.CommentListWrap = styled.div`
  margin: 1rem 2rem;
`;
