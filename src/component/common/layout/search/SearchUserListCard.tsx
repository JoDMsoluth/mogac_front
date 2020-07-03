import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../../../../utils/auth/AuthProvider';
import { useQuery } from '@apollo/react-hooks';
import searchGql from '../../../../lib/gql/searchGql';

interface SearchUserListCardProps {
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

export default function SearchUserListCard({
  searchWord,
}: SearchUserListCardProps) {
  const classes = useStyles();
  const [user, _] = useAuth();
  const [users, setUsers] = useState([]);

  const { data, error } = useQuery(searchGql.GET_SEARCH_USER, {
    variables: {
      searchWord,
      page: 1,
    },
  });

  if (error) {
    console.log('get users error', error);
  }
  useEffect(() => {
    if (data) {
      setUsers(data.totalSearchUser.users);
    }
  }, [data, users]);
  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {users.length > 0 &&
            users.map((user) => (
              <Grid item key={user._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.name}
                    </Typography>
                    <Typography>{user.ableSkillSet}</Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`/blog?userId=${user._id}`}>
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
}
