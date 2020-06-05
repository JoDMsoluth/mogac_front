import react, { useState, useCallback, useMemo } from 'react';
import { useAuth } from '../../../utils/auth/AuthProvider';
import { useMutation } from '@apollo/react-hooks';
import CommentGql from '../../../lib/gql/commentGql';
import styled from 'styled-components';
import palette from '../../../lib/pallete';
import UserAvatar from '../../common/utils/UserAvatar';
import createPalette from '@material-ui/core/styles/createPalette';
import { Button, Typography } from '@material-ui/core';
import EditComment from '../EditComment';

interface ReCommentCardProps {
  reComment: any;
  reComments: any[];
  setReComments: any;
}

export default function ReCommentCard({
  reComment,
  reComments,
  setReComments,
}: ReCommentCardProps) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [deleteReComment] = useMutation(CommentGql.DELETE_RECOMMENT_IN_POST);
  const [{ data }, _] = useAuth();
  const { contents, commentBy } = reComment;
  const { _id, image_url, name } = commentBy;

  const filterComment = useCallback(
    async (e) => {
      e.preventDefault();
      console.log('delete', reComment._id);
      const result = await deleteReComment({
        variables: { reCommentId: reComment._id },
      });
      if (result) {
        setReComments(
          reComments.filter((re) => re._id !== result.data.deleteReComment._id),
        );
        console.log(reComments);
      }
    },
    [reComments],
  );
  const onClickToggle = useCallback(() => {
    setToggleEdit(!toggleEdit);
  }, [toggleEdit]);
  return (
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
              reComments={reComments}
              toggleEdit={toggleEdit}
              commentId={reComment._id}
              onClickToggle={onClickToggle}
              setToggleEdit={setToggleEdit}
              setReComments={setReComments}
            />
          ) : (
            <Typography
              variant="body1"
              gutterBottom
              style={{ paddingLeft: '0.6rem' }}
            >
              {contents}
            </Typography>
          ),
        [contents, toggleEdit],
      )}{' '}
    </S.CommentWrap>
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

  @media (max-width: 768px) {
    margin-right: 0rem;
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
