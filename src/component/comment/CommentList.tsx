import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import CommentCard from './CommentCard';

interface CommentListProps {
  comments: any;
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <>
      <S.CommentListWrap>
        {comments.map((comment) => (
          <CommentCard comment={comment} />
        ))}
      </S.CommentListWrap>
    </>
  );
}

const S: any = {};

S.CommentListWrap = styled.div`
  margin: 1rem 2rem;
`;
