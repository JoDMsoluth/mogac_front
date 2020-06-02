import React, { useState, Component, useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, Button } from '@material-ui/core';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import CommentCard from './CommentCard';
import { useAuth } from '../../utils/auth/AuthProvider';
import Link from 'next/link';
import CommentGql from '../../lib/gql/commentGql';
import useInput from '../../lib/hooks/useInput';
import { useMutation } from '@apollo/react-hooks';
import CommentList from './CommentList';
import { useWrite } from '../../utils/write/WriteProvide';

const userAvatar = require('../../static/images/avatar/1.jpg');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  textField: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: '100%',
  },
  commentHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  userAvater: {
    width: '10rem',
  },
}));

const comments = [1, 2, 3];
interface CommentHeadInputProps {
  postId: string;
}
export default function CommentHeadInput({ postId }: CommentHeadInputProps) {
  const [{ data }, _] = useAuth();
  const classes = useStyles();
  const [contents, setContents] = useState<string>('');
  const [createComment] = useMutation(CommentGql.CREATE_COMMET_IN_POST);
  const { state, dispatch } = useWrite();
  const { comments } = state;

  const addComment = useCallback(async () => {
    if (contents.length > 0) {
      const result = await createComment({
        variables: {
          data: {
            parentPost: postId,
            contents,
            secret: false,
          },
        },
      });
      console.log('comment result', result);
      if (result) {
        dispatch({ type: 'AddComments', data: result.data.createComment });
      }
    } else {
      alert('댓글을 입력해주세요.');
    }
    setContents('');
  }, [contents]);

  const changeContents = useCallback(
    (e) => {
      setContents(e.target.value);
    },
    [contents],
  );
  return (
    <>
      {data ? (
        <>
          <div className={classes.root}>
            <div className={classes.commentHeader}>
              <S.AvatarWrap>
                <Avatar alt="JoHyehyeong" src={userAvatar} />
                <div>
                  <S.AvatarName>&nbsp;{data.getCurrentUser.name}</S.AvatarName>
                  <S.AvatarDesc>
                    &nbsp;{data.getCurrentUser.ableSkillSet[0]}
                  </S.AvatarDesc>
                </div>
              </S.AvatarWrap>
              <Button variant="contained" color="primary" onClick={addComment}>
                Post
              </Button>
            </div>

            {useMemo(
              () => (
                <TextField
                  id="outlined-full-width"
                  label="Comment Input"
                  style={{ margin: 8 }}
                  placeholder="Placeholder"
                  fullWidth
                  name="contents"
                  value={contents}
                  margin="normal"
                  multiline
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={changeContents}
                />
              ),
              [contents],
            )}
          </div>
        </>
      ) : (
        <div>
          If you want to comment, Please{' '}
          <Link href="/">
            <a>Log In</a>
          </Link>{' '}
          Now
        </div>
      )}
      <CommentList />
    </>
  );
}

const S: any = {};
S.AvatarWrap = styled.div`
  display: flex;
`;
S.AvatarName = styled.div`
  margin: auto 0;
  color: ${palette.gray8};
`;
S.AvatarDesc = styled.div`
  margin: auto 0;
  color: ${palette.gray6};
`;
