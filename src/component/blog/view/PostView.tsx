import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import PostViewMain from './PostViewMain';
import SideBar from './SideBar';
import CommentComponent from '../../comment';
import postGql from '../../../lib/gql/postGql';
import { useWrite } from '../../../utils/write/WriteProvide';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: 'Series Text Title',
  description: 'Sereis Test Description',
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

interface PostViewProps {
  postId: string;
  userId: string;
}
export default function PostView({ postId, userId }: PostViewProps) {
  const classes = useStyles();
  const post = postGql.getPostForView(postId);
  const posts = postGql.getAllPostsByUserForPostView(userId);
  const { state, dispatch } = useWrite();

  const index = posts && posts.findIndex((v) => v._id == postId);
  const nextPost = index > -1 && posts[index + 1];
  const postPost = index > 0 && posts[index - 1];

  console.log(nextPost, 'nextPost');

  useEffect(() => {
    return () => {
      dispatch({ type: 'Reset' });
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <main style={{ paddingTop: '1rem' }}>
          {post?.series ? (
            <MainFeaturedPost series={post.series} />
          ) : (
            <MainFeaturedPost series={mainFeaturedPost} />
          )}

          <Grid container spacing={5} className={classes.mainGrid}>
            {post && (
              <>
                <PostViewMain post={post} />
                {posts && <SideBar desc={post.desc} posts={posts} />}
              </>
            )}
          </Grid>

          <Grid container spacing={4}>
            {postPost && <FeaturedPost post={postPost} />}
            {nextPost && <FeaturedPost post={nextPost} />}
          </Grid>
        </main>
      </Container>
      <CommentComponent postId={postId} />
    </>
  );
}
