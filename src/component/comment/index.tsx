import React, { useEffect, useState, useCallback } from 'react';
import CommentHeadInput from './CommentHeadInput';
import CommentList from './CommentList';
import CommentGql from '../../lib/gql/commentGql';
import useInput from '../../lib/hooks/useInput';
import { useWrite } from '../../utils/write/WriteProvide';

interface CommentComponentProps {
  postId: string;
}
export default function CommentComponent({ postId }: CommentComponentProps) {
  const result = CommentGql.getAllCommentInPost(postId);
  const { state, dispatch } = useWrite();

  useEffect(() => {
    if (result && !state.comments) {
      dispatch({ type: 'ChangeComments', data: result });
      console.log('메인 렌더링', state.comments);
    }
  }, [state.comments, result]);

  return <>{state.comments && <CommentHeadInput postId={postId} />}</>;
}
