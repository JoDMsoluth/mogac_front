import react, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import useInput from '../../../lib/hooks/useInput';
import palette from '../../../lib/pallete';
import CategoryGql from '../../../lib/gql/categoryGql';
import { useQuery } from '@apollo/react-hooks';

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

export default function SearchSkillSetSelect() {
  const classes = useStyles();
  const theme = useTheme();

  const [ableLocation, changeAbleLocation] = useInput([]);
  const [category, changeCategory] = useInput<string>('');
  const [skillset, setSkillSet] = useState<Array<string>>([]);

  const changeSkillSet = useCallback(
    (e) => {
      const { value }: { value: Array<string> } = e.target;
      console.log('value', value, value.length);
      if (value.length > 3) value.shift();
      setSkillSet(value);
    },
    [skillset],
  );

  const categoryArray = [];
  const skillsetData = {};

  const { data, error } = useQuery(CategoryGql.Get_All_Category);

  if (error) {
    console.log('get category error');
  }

  if (data) {
    data.getAllCategory.map((category) => {
      categoryArray.push(category['name']);
      if (category.skillset.length > 0)
        skillsetData[category['name']] = category.skillset;
    });
  }
  console.log('data', data);
  console.log('category', category);
  console.log('skillsetData', skillsetData);

  return (
    <>
      <S.SearchFilterWrap>
        <FormControl className={classes.formControl}>
          <InputLabel id="Category-Select">Category</InputLabel>
          <Select
            labelId="Category-Select"
            id="Category"
            value={category}
            onChange={changeCategory as any}
          >
            <S.CategoryOption aria-label="None" value="" />
            {categoryArray.map((name, i) => (
              <S.CategoryOption key={`name$${i}`} value={name}>
                {name}
              </S.CategoryOption>
            ))}
          </Select>
        </FormControl>
        {/* skillset  Form*/}

        <FormControl className={classes.formControl}>
          <InputLabel id="skillset-select">SubLocation</InputLabel>
          <Select
            labelId="skillset-select"
            id="skillset"
            multiple
            value={skillset}
            onChange={changeSkillSet as any}
            input={<Input />}
            renderValue={(selected: Array<string>) => selected.join(', ')}
            MenuProps={MenuProps}
            disabled={category.length < 1}
          >
            {category && skillsetData[category]
              ? skillsetData[category].map((skill) => (
                  <MenuItem key={skill.skill} value={skill.skill}>
                    <Checkbox checked={skillset.includes(skill.skill)} />
                    <ListItemText primary={skill.skill} />
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

S.CategoryOption = styled.option`
  text-align: center;
  max-height: 2rem;
  &:hover {
    background: ${palette.gray1};
  }
`;
