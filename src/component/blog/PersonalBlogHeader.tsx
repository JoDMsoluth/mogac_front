import react from 'react';
import { Container, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CategoryGql from '../../lib/gql/categoryGql';

interface BlogHeaderProps {
  userName: string;
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const PersonalBlogHeader = ({ userName }) => {
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
            Blog Post List
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            {`${userName}님의 블로그 포스트 페이지 입니다.`}
          </Typography>

          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  블로그 필터링
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PersonalBlogHeader;
