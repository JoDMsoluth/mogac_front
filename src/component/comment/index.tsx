import React from 'react';
import CommentHeadInput from './CommentHeadInput';
import CommentList from './CommentList';
import CommentGql from '../../lib/gql/commentGql';

interface CommentComponentProps {
  postId: string;
}
export default function CommentComponent({ postId }: CommentComponentProps) {
  const comments = CommentGql.getAllCommentInPost(postId);
  console.log(comments);
  return (
    <>
      <CommentHeadInput />
      {comments && comments.length > 0 && <CommentList comments={comments} />}
    </>
  );
}
