import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/pallete';
import { useWrite } from '../../../utils/write/WriteProvide';
import CommentGql from '../../../lib/gql/commentGql';

interface ReCommentListProps {
  commentId: string;
}
export default function ReCommentList({ commentId }) {
  console.log('commentId', commentId);
  const result = CommentGql.getAllReCommentInComment(commentId);
  const [reComments, setReComments] = useState([]);
  console.log('RECOMMENT', result);

  if (result && reComments.length < 1) {
    setReComments(result);
    console.log(reComments);
  } else {
    return <div>loading</div>;
  }

  return (
    <>
      <S.CommentListWrap></S.CommentListWrap>
    </>
  );
}

const S: any = {};

S.CommentListWrap = styled.div`
  margin: 1rem 2rem;
`;
