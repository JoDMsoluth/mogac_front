import React, { useMemo, useState, useRef, MutableRefObject } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/pallete';
import { useWrite } from '../../../utils/write/WriteProvide';
import CommentGql from '../../../lib/gql/commentGql';
import ReCommentCard from './ReCommentCard';
import AddReCommentForm from './AddReCommentForm';

interface ReCommentListProps {
  commentId: string;
}
export default function ReCommentList({ commentId }: ReCommentListProps) {
  console.log('commentId', commentId);
  const [reComments, setReComments] = useState([]);
  const result = CommentGql.getAllReCommentInComment(commentId);
  console.log('RECOMMENT', result);

  // 대댓글 바뀜
  if (result && result.length > 0 && reComments.length < 1) {
    setReComments(result);
    console.log(reComments);
  }
  console.log('리랜더링', reComments);
  return (
    <>
      <S.CommentListWrap>
        {reComments &&
          reComments.length > 0 &&
          reComments.map((reComment) => (
            <ReCommentCard
              reComment={reComment}
              reComments={reComments}
              setReComments={setReComments}
            />
          ))}

        {/* 대댓글 쓰기 폼 */}
        <AddReCommentForm
          parentComment={commentId}
          reComments={reComments}
          setReComments={setReComments}
        />
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
