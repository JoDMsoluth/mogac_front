import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from 'next/link';

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

interface PersonalBlogBodyProps {
  page?: number;
  posts: any;
  userId: string;
}
const PersonalBlogBody = ({ page, posts, userId }: PersonalBlogBodyProps) => {
  console.log('page', page);
  const classes = useStyles();
  console.log(posts);

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {posts?.length > 0 &&
            posts.map((post, i) => (
              <Grid item key={`${i}${post.title}`} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={
                      post.cover_img || 'https://source.unsplash.com/random'
                    }
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title || `Heading`}
                    </Typography>
                    <Typography>
                      {post.desc ||
                        post.content ||
                        `This is a media card. You can use this section to describe the content.`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`/view/post?post=${post._id}&userId=${userId}`}>
                      <a>
                        <Button size="small" color="primary">
                          View
                        </Button>
                      </a>
                    </Link>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default PersonalBlogBody;
