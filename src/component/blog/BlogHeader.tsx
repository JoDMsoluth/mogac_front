import react from 'react';
import { Container, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CategoryGql from '../../lib/gql/categoryGql';

interface BlogHeaderProps {}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const BlogHeader = () => {
  const classes = useStyles();
  const { categoryArray, skillsetData } = CategoryGql.loadAllCategory();
  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            블로그
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            매일 블로그에 정리를 한다면 스터디를 하는데 좋은 동기부여가 될
            것입니다. 자신이 공부한 내용을 다른 사람과 공유해보세요.
          </Typography>

          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  상세 검색
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  새로운 글 게시
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BlogHeader;
