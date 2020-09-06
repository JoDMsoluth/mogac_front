import react, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { locationsDataSet } from '../../../../data/location';
import useInput from '../../../lib/hooks/useInput';
import palette from '../../../lib/pallete';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SearchLocationSelectProps {
  setLocationData: any;
}
export default function SearchLocationSelect({
  setLocationData,
}: SearchLocationSelectProps) {
  const classes = useStyles();
  const theme = useTheme();

  const [pubLocation, changePubLocation] = useInput<string>('');
  const [subLocation, setSubLocation] = useState<Array<string>>([]);

  const changeSubLocation = useCallback(
    (e) => {
      const { value }: { value: Array<string> } = e.target;
      if (value.length > 3) value.shift();
      setSubLocation(value);
      setLocationData(value);
    },
    [subLocation],
  );

  console.log('pubLocation', pubLocation);
  console.log('subLocation', subLocation);

  const pubLocationArray = Object.keys(locationsDataSet);

  return (
    <>
      <S.SearchFilterWrap>
        <FormControl className={classes.formControl}>
          <InputLabel id="PubLocation-Select">PubLocation</InputLabel>
          <Select
            labelId="PubLocation-Select"
            id="pubLocation"
            value={pubLocation}
            onChange={changePubLocation as any}
          >
            <S.PubLocationOption aria-label="None" value="" />
            {pubLocationArray.map((name, i) => (
              <S.PubLocationOption key={`name$${i}`} value={name}>
                {name}
              </S.PubLocationOption>
            ))}
          </Select>
        </FormControl>
        {/* subLocation  Form*/}

        <FormControl className={classes.formControl}>
          <InputLabel id="subLocation-select">SubLocation</InputLabel>
          <Select
            labelId="subLocation-select"
            id="subLocation"
            multiple
            value={subLocation}
            onChange={changeSubLocation as any}
            input={<Input />}
            renderValue={(selected: Array<string>) => selected.join(', ')}
            MenuProps={MenuProps}
            disabled={pubLocation.length < 1}
          >
            {pubLocation
              ? locationsDataSet[pubLocation].map((name) => (
                  <MenuItem
                    key={`${pubLocation} ${name}`}
                    value={`${pubLocation} ${name}`}
                  >
                    <Checkbox
                      checked={subLocation.includes(`${pubLocation} ${name}`)}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))
              : ''}
          </Select>
        </FormControl>
      </S.SearchFilterWrap>
    </>
  );
}

const S: any = {};

S.SearchFilterWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 5rem;
`;

S.PubLocationOption = styled.option`
  text-align: center;
  max-height: 2rem;
  &:hover {
    background: ${palette.gray1};
  }
`;
