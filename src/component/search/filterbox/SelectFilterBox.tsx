import react from 'react';
import SearchLocationSelect from './SearchLocationSelect';
import SearchSkillSetSelect from './SearchSkillSetSelect';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  filterbox: {
    margin: 0,
  },
}));

export default function SearchFilterBox() {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid className={classes.filterbox} md={6} xs={12}>
        <SearchLocationSelect />
      </Grid>
      <Grid className={classes.filterbox} md={6} xs={12}>
        <SearchSkillSetSelect />
      </Grid>
    </Grid>
  );
}
