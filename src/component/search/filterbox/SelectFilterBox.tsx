import react, { useState, useCallback } from 'react';
import SearchLocationSelect from './SearchLocationSelect';
import SearchSkillSetSelect from './SearchSkillSetSelect';
import { Grid, makeStyles, Button } from '@material-ui/core';
import styled from 'styled-components';
import useInput from '../../../lib/hooks/useInput';
import { useQuery } from '@apollo/react-hooks';
import UserGql from '../../../lib/gql/userGql';

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
interface SearchFilterBoxProps {
  changeAbleLocation: any;
  changeAbleSkillSet: any;
}
export default function SearchFilterBox({
  changeAbleLocation,
  changeAbleSkillSet,
}) {
  const classes = useStyles();
  const [locationData, setLocationData] = useState([]);
  const [skillSetData, setSkillSetData] = useState([]);

  const onClickSearch = useCallback(() => {
    changeAbleLocation(locationData);
    changeAbleSkillSet(skillSetData);
  }, [locationData, skillSetData]);

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.filterbox} md={5} xs={12}>
        <SearchLocationSelect setLocationData={setLocationData} />
      </Grid>
      <Grid className={classes.filterbox} md={5} xs={12}>
        <SearchSkillSetSelect
          skillSetData={skillSetData}
          setSkillSetData={setSkillSetData}
        />
      </Grid>
      <Grid className={classes.button} md={2} xs={12}>
        <S.Button color="primary" variant="contained" onClick={onClickSearch}>
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
