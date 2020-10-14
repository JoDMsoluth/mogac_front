import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import searchGql from '../../../../lib/gql/searchGql';

interface SearchBlogListCardProps {
  searchWord: string;
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function SearchBlogListCard({
  searchWord,
}: SearchBlogListCardProps) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const { data, error } = useQuery(searchGql.GET_SEARCH_BLOG, {
    variables: {
      searchWord,
      page: 1,
    },
  });

  if (error) {
    console.log('get posts error', error);
  }
  useEffect(() => {
    if (data) {
      setPosts(data.totalSearchPost.posts);
    }
  }, [data, posts]);

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {posts.length > 0 &&
            posts.map((post) => (
              <Grid item key={post._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography>{post.desc}</Typography>
                  </CardContent>
                  <S.ButtonContainer>
                    <Link href={`/search?q=${post?.postedBy?.name}&filter=user`}>
                      <a>
                        <Button size="small" color="primary">
                          작성자 : {post?.postedBy?.name}
                        </Button>
                      </a>
                    </Link>
                    <Link
                      href={`/view/post?post=${post._id}&userId=${post.postedBy._id}`}
                    >
                      <a>
                        <Button size="small" color="primary">
                          View
                        </Button>
                      </a>
                    </Link>
                  </S.ButtonContainer>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}

const S : any = {}

S.ButtonContainer = styled(CardActions)`
  display :flex;
  justify-content : space-between;
  & span {
    font-weight: bold;
  }
`;