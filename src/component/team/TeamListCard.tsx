import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
import styled from 'styled-components';
import { useAuth } from '../../utils/auth/AuthProvider';
import { useRouter } from 'next/router';

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
  const [{ data: user }, _] = useAuth();
  const router = useRouter();

  console.log(teams);

  const { data, error } =
    location || skillset
      ? useQuery(teamGql.GET_FILTER_TEAM, {
          variables: {
            data: { page: 1, limit: 9, location: location, category: skillset },
          },
        })
      : useQuery(teamGql.GET_ALL_TEAM_BY_USER, {
          variables: { userId: user?.getCurrentUser._id, page: 1 },
        });

  if (error) {
    console.log('get teams error', error);
  }

  useEffect(() => {
    if (data) {
      console.log('data', data);
      location || skillset
        ? setTeams(data.getFilterTeam.teams)
        : setTeams(data.getAllTeamsByUser.teams);
    }
  }, [data, location, skillset, teams]);

  const clickVisitRoom = useCallback(
    (url, users: Array<string>, userId, adminId) => () => {
      console.log('users, userId', users, userId, adminId);
      // 권한이 있거나 관리자거나 둘 중하나면 입장
      if (users.includes(userId) || adminId == userId) router.push(url);
      else alert('권한이 없습니다.');
    },
    [],
  );

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {teams.length > 0 &&
            teams.map((team, i) => (
              <Grid item key={team._id} xs={12} sm={6} md={4} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`https://picsum.photos/200/300?random=${i}`}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {team.title}
                    </Typography>
                    <Typography>{team.desc}</Typography>
                  </CardContent>
                  <S.ButtonContainer>
                    <Link href={`/search?q=${team?.adminName}&filter=user`}>
                      <a>
                        <Button size="small" color="primary">
                          방장 : {team?.adminName}
                        </Button>
                      </a>
                    </Link>
                    <Button
                      size="small"
                      color="primary"
                      onClick={clickVisitRoom(
                        `/view/team?room=${team?.title}&name=${user?.getCurrentUser.name}`,
                        team?.users,
                        user?.getCurrentUser._id,
                        team?.adminId,
                      )}
                    >
                      View
                    </Button>
                  </S.ButtonContainer>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default TeamListCard;

const S : any = {}

S.ButtonContainer = styled(CardActions)`
  font-weight: bold;
  display :flex;
  justify-content : space-between;
`;