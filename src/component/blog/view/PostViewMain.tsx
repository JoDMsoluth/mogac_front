import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import UserAvatar from '../../common/utils/UserAvatar';
import styled from 'styled-components';
import moment from 'moment';
import LikeButton from '../../common/utils/LikeButton';
import palette from '../../../lib/pallete';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

interface PostViewMainProps {
  post: any;
}

export default function PostViewMain({ post }) {
  const classes = useStyles();

  return (
    <>
      {useMemo(
        () => (
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Divider />
            <S.PostDetailWrap>
              <UserAvatar name={post.postedBy.name}></UserAvatar>
              <S.PostDateSpan>
                {moment(post.createdAt).format('YYYY-MM-DD')}
              </S.PostDateSpan>
              <LikeButton></LikeButton>
            </S.PostDetailWrap>
            <Markdown className={classes.markdown}>{post.contents}</Markdown>
          </Grid>
        ),
        [],
      )}
    </>
  );
}

const S: any = {};

S.PostDetailWrap = styled.div`
  margin: 1rem 0;
  display: flex;
  position: relative;
`;
S.PostDateSpan = styled.div`
  color: ${palette.gray6};
`;
