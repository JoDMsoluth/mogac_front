import React, { useState, useMemo, useCallback } from 'react';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import UserAvatar from '../../component/common/utils/UserAvatar';
import palette from '../../lib/pallete';
import { useAuth } from '../../utils/auth/AuthProvider';
import { useMutation } from '@apollo/react-hooks';
import CommentGql from '../../lib/gql/commentGql';
import useInput from '../../lib/hooks/useInput';
import { useWrite } from '../../utils/write/WriteProvide';
import EditComment from './EditComment';

interface CommentCardProps {
  comment: any;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const { _id, image_url, name } = comment.commentBy;
  const [toggleEdit, setToggleEdit] = useState(false);
  const [{ data }, _] = useAuth();
  const [deleteComment] = useMutation(CommentGql.DELETE_COMMENT_IN_POST);
  const { state, dispatch } = useWrite();

  const filterComment = useCallback(
    async (e) => {
      e.preventDefault();
      const result = await deleteComment({
        variables: { commentId: comment._id },
      });
      if (result) {
        dispatch({ type: 'DeleteComments', data: comment._id });
      }
    },
    [comment],
  );
  const onClickToggle = useCallback(() => {
    setToggleEdit(!toggleEdit);
  }, [toggleEdit]);

  return (
    <>
      <S.CommentWrap>
        <S.CommentHead>
          {useMemo(
            () => (
              <UserAvatar name={name} image_url={image_url} />
            ),
            [name, image_url],
          )}

          {//유저 이메일과 작성자가 동일할 시
          data && _id === data.getCurrentUser._id ? (
            <S.CommentToolWrap>
              <Button onClick={onClickToggle}>Edit</Button>
              <Button onClick={filterComment}>Delete</Button>
            </S.CommentToolWrap>
          ) : (
            ''
          )}
        </S.CommentHead>
        {useMemo(
          () =>
            toggleEdit ? (
              <EditComment
                toggleEdit={toggleEdit}
                commentId={comment._id}
                onClickToggle={onClickToggle}
                setToggleEdit={setToggleEdit}
              />
            ) : (
              <Typography
                variant="body1"
                gutterBottom
                style={{ paddingLeft: '0.6rem' }}
              >
                {comment.contents}
              </Typography>
            ),
          [comment.contents, toggleEdit],
        )}
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
  @media (max-width: 768px) {
    margin-right: 0rem;
  }
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
