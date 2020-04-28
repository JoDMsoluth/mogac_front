import React from 'react';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import UserAvatar from '../../component/common/utils/UserAvatar';
import palette from '../../lib/pallete';

export default function CommentCard() {
  return (
    <>
      <S.CommentWrap>
        <S.CommentHead>
          <UserAvatar />
          {//유저 이메일과 작성자가 동일할 시
          true ? (
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
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
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
