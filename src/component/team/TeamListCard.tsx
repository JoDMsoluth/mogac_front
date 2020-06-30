import React, { useState, useMemo, useEffect } from 'react';
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
import teamGql from '../../lib/gql/teamGql';
import { useQuery } from '@apollo/react-hooks';
import { userReducer } from '../../utils/user/UserReducer';
import { useAuth } from '../../utils/auth/AuthProvider';

interface TeamListCardProps {
  location: string;
  skillset: string;
  teams: any;
  setTeams: any;
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

const cards = [];

const TeamListCard = ({
  location,
  skillset,
  teams,
  setTeams,
}: TeamListCardProps) => {
  const classes = useStyles();
  const [user, _] = useAuth();
  console.log(teams);
  const { data, error } =
    location || skillset
      ? useQuery(teamGql.GET_FILTER_TEAM, {
          variables: {
            data: { page: 1, limit: 9, location: location, category: skillset },
          },
        })
      : useQuery(teamGql.GET_ALL_TEAM, {
          variables: { data: { page: 1, limit: 9 } },
        });
  if (error) {
    console.log('get teams error', error);
  }
  useEffect(() => {
    if (data) {
      console.log('data', data);
      location || skillset
        ? setTeams(data.getFilterTeam.teams)
        : setTeams(data.getAllTeam.teams);
    }
  }, [data, location, skillset, teams]);

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {teams.length > 0 &&
            teams.map((team) => (
              <Grid item key={team._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {team.title}
                    </Typography>
                    <Typography>{team.desc}</Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      href={`/view/team?room=${team.title}&name=${user.data.getCurrentUser.name}`}
                    >
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

export default TeamListCard;
