import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useInput from '../../../lib/hooks/useInput';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import CategoryGql from '../../../lib/gql/categoryGql';
import { useUser } from '../../../utils/user/UserProvide';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const levels = ['상', '중상', '중', '중하', '하'];

export default function SelectSkillSetDialog({ categoryArray, skillsetData }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState<string>('');
  const [skillset, setSkillSet] = useState<string>('');
  const [level, setLevel] = useState<number>(0);
  const [ableSkillSet, setAbleSkillSet] = useState<Array<string>>([]);
  const [ableSkillSetLevel, setAbleSkillSetLevel] = useState<Array<string>>([]);

  const { state, dispatch } = useUser();

  const changeCategory = useCallback(
    (e) => {
      setCategory(e.target.value);
    },
    [category],
  );
  const changeSkillSet = useCallback(
    (e) => {
      setSkillSet(e.target.value);
    },
    [skillset],
  );
  const changeLevel = useCallback(
    (e) => {
      setLevel(e.target.value);
    },
    [level],
  );

  const changeAbleSkillSet = useCallback(() => {
    dispatch({ type: 'ChangeAbleSkillSet', data: ableSkillSet });
    dispatch({ type: 'ChangeAbleSkillSetLevel', data: ableSkillSetLevel });
    setOpen(false);
  }, [state.ableSkillSet, ableSkillSet, state.ableSkillSetLevel]);

  useEffect(() => {
    if (categoryArray[0]) setCategory(categoryArray[0]);
  }, [categoryArray]);

  const addAbleSkillSet = useCallback(
    (e) => {
      e.preventDefault();
      if (category && skillset && ableSkillSet.length < 3 && level) {
        const setSkillSet = `${category} ${skillset}`;
        const setSkillSetLevel = `${category} ${skillset}/${level}`;
        if (!ableSkillSet.includes(setSkillSet)) {
          setAbleSkillSet(ableSkillSet.concat(setSkillSet));
          setAbleSkillSetLevel(ableSkillSetLevel.concat(setSkillSetLevel));
        }
      }
    },
    [category, skillset, ableSkillSet, ableSkillSetLevel, level],
  );
  const removeAbleSkillSet = useCallback(
    (SkillSet: string) => () => {
      const skill = SkillSet.split('/')[0];
      setAbleSkillSet(ableSkillSet.filter((v) => v !== skill));
      setAbleSkillSetLevel(ableSkillSetLevel.filter((v) => !v.includes(skill)));
    },
    [ableSkillSet, ableSkillSetLevel],
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Select Able SkillSet</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Select Able SkillSet</DialogTitle>
        <DialogContent>
          <S.DialogForm className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                native
                value={category}
                onChange={changeCategory as any}
                input={<Input />}
              >
                {categoryArray.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="skillset">SkillSet</InputLabel>
              <Select
                labelId="skillset"
                value={skillset}
                onChange={changeSkillSet as any}
                input={<Input />}
              >
                {skillsetData[category]
                  ? skillsetData[category].map((skill) => (
                      <option key={skill.skill} value={skill.skill}>
                        {skill.skill}
                      </option>
                    ))
                  : ''}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="level">level</InputLabel>
              <Select
                labelId="level"
                value={level}
                onChange={changeLevel as any}
                input={<Input />}
              >
                {levels.map((lev, i) => (
                  <option key={lev} value={5 - i}>
                    {lev}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={addAbleSkillSet}
              color="primary"
              variant="contained"
            >
              Add
            </Button>
          </S.DialogForm>
        </DialogContent>
        <S.ContentListWrap>
          {ableSkillSetLevel.map((able) => (
            <S.ContentWrap key={able}>
              <S.ContentItem>{able}</S.ContentItem>
              <Button color="primary" onClick={removeAbleSkillSet(able)}>
                X
              </Button>
            </S.ContentWrap>
          ))}
        </S.ContentListWrap>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={changeAbleSkillSet} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const S: any = {};

S.DialogForm = styled.form`
  display: flex;
  justify-content: space-between;
  @media (max-width: 763px) {
    flex-direction: column;
  }
`;
S.ContentListWrap = styled(DialogContent)`
  display: flex;
  @media (max-width: 763px) {
    flex-direction: column;
  }
`;

S.ContentWrap = styled.div`
  display: flex;
`;
S.ContentItem = styled.div`
  padding: 0.55rem 0;
  @media (max-width: 763px) {
    display: inline-block;
  }
`;
