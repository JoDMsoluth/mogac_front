import react from 'react';
import SearchLocationSelect from './SearchLocationSelect';
import SearchSkillSetSelect from './SearchSkillSetSelect';
import { Grid, makeStyles, Button } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  filterbox: {
    margin: 0,
  },
  button: {
    padding: '1rem',
  },
}));

export default function SearchFilterBox() {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid className={classes.filterbox} md={5} xs={12}>
        <SearchLocationSelect />
      </Grid>
      <Grid className={classes.filterbox} md={5} xs={12}>
        <SearchSkillSetSelect />
      </Grid>
      <Grid className={classes.button} md={2} xs={12}>
        <S.Button color="primary" variant="contained">
          Search
        </S.Button>
      </Grid>
    </Grid>
  );
}

const S: any = {};
S.Button = styled(Button)`
  width: 100%;
  margin: 0;
  @media (max-width: 863px) {
    width: 100%;
  }
`;
