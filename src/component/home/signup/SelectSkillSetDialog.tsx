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

export default function SelectSkillSetDialog({ categoryArray, skillsetData }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState<string>('');
  const [skillset, setSkillSet] = useState<string>('');
  const [ableSkillSet, setAbleSkillSet] = useState<Array<string>>([]);

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

  const changeAbleSkillSet = useCallback(() => {
    dispatch({ type: 'ChangeAbleSkillSet', data: ableSkillSet });
    setOpen(false);
  }, [state.ableSkillSet, ableSkillSet]);

  useEffect(() => {
    if (categoryArray[0]) setCategory(categoryArray[0]);
  }, [categoryArray]);

  const addAbleSkillSet = useCallback(
    (e) => {
      e.preventDefault();
      if (category && skillset && ableSkillSet.length < 3) {
        const setSkillSet = `${category} ${skillset}`;
        !ableSkillSet.includes(setSkillSet) &&
          setAbleSkillSet(ableSkillSet.concat(setSkillSet));
      }
    },
    [category, skillset, ableSkillSet],
  );
  const removeAbleSkillSet = useCallback(
    (SkillSet: string) => () => {
      console.log(ableSkillSet.filter((v) => v !== SkillSet));
      setAbleSkillSet(ableSkillSet.filter((v) => v !== SkillSet));
    },
    [ableSkillSet],
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
          <form className={classes.container}>
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
            <Button onClick={addAbleSkillSet} color="primary">
              Add
            </Button>
          </form>
        </DialogContent>
        <DialogContent style={{ display: 'flex' }}>
          {ableSkillSet.map((able) => (
            <S.ContentWrap key={able}>
              <S.ContentItem>{able}</S.ContentItem>
              <Button color="primary" onClick={removeAbleSkillSet(able)}>
                X
              </Button>
            </S.ContentWrap>
          ))}
        </DialogContent>
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

S.ContentWrap = styled.div`
  display: flex;
`;
S.ContentItem = styled.div`
  padding: 0.55rem 0;
`;
