import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import UserAvatar from '../../component/common/utils/UserAvatar';
import palette from '../../lib/pallete';
import { useAuth } from '../../utils/auth/AuthProvider';
import { useMutation } from '@apollo/react-hooks';
import CommentGql from '../../lib/gql/commentGql';
import useInput from '../../lib/hooks/useInput';

interface CommentCardProps {
  comment: any;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const { _id, image_url, name } = comment.commentBy;
  const [{ data }, _] = useAuth();
  const [contents, changeContents] = useInput<string>('');
  const [secret, setSecret] = useState(false);
  const [updateComment] = useMutation(CommentGql.UPDATE_COMMENT_IN_POST);
  const [deleteComment] = useMutation(CommentGql.DELETE_COMMENT_IN_POST);
  return (
    <>
      <S.CommentWrap>
        <S.CommentHead>
          <UserAvatar name={name} image_url={image_url} />
          {//유저 이메일과 작성자가 동일할 시
          data && _id === data.getCurrentUser._id ? (
            <S.CommentToolWrap>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </S.CommentToolWrap>
          ) : (
            ''
          )}
        </S.CommentHead>
        <Typography
          variant="body1"
          gutterBottom
          style={{ paddingLeft: '0.6rem' }}
        >
          {comment.contents}
        </Typography>
      </S.CommentWrap>
    </>
  );
}

const S: any = {};
S.CommentHead = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;
S.CommentToolWrap = styled.div`
  margin-right: 2rem;
  & button:hover {
    color: ${palette.blue7};
  }
`;
S.CommentWrap = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid ${palette.gray4};
  &:last-child {
    border: none;
    margin-bottom: 3rem;
  }
`;
