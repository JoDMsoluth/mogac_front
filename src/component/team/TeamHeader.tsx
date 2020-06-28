import React from 'react';
import { Container, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CategoryGql from '../../lib/gql/categoryGql';
import TeamListFilterDialog from './TeamListFiterDialog';
import CreateTeamDialog from './CreateTeamDialog';
import teamGql from '../../lib/gql/teamGql';

interface TeamHeaderProps {
  location: string;
  skillset: string;
  setTeams: any;
  teams: any;
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

const TeamHeader = ({
  location,
  skillset,
  setTeams,
  teams,
}: TeamHeaderProps) => {
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
            Team List
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            팀 리스트 페이지입니다;
          </Typography>

          {location || skillset ? (
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              필터결과
              <br></br>
              {location && `스터디 지역 : ${location}\n`}
              <br></br>
              {skillset && `공부 주제 : ${skillset}\n`}
            </Typography>
          ) : null}
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <TeamListFilterDialog
                  categoryArray={categoryArray}
                  skillsetData={skillsetData}
                />
              </Grid>
              <Grid item>
                <CreateTeamDialog
                  categoryArray={categoryArray}
                  skillsetData={skillsetData}
                  teams={teams}
                  setTeams={setTeams}
                />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TeamHeader;
