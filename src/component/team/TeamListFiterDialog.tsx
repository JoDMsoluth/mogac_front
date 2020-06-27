import react, { useState, useEffect, useCallback } from 'react';
import useInput from '../../lib/hooks/useInput';
import { makeStyles } from '@material-ui/core/styles';
import { locationsDataSet } from '../../../data/location';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  Input,
  DialogActions,
} from '@material-ui/core';
import { useRouter } from 'next/router';

interface TeamListFilterDialogProps {
  categoryArray: any;
  skillsetData: any;
}

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

const TeamListFilterDialog = ({
  categoryArray,
  skillsetData,
}: TeamListFilterDialogProps) => {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState<string>('');
  const [skillset, changeSkillSet] = useInput<string>('');

  const pubLocationArray = Object.keys(locationsDataSet);
  const [pubLocation, changePubLocation] = useInput<string>(
    pubLocationArray ? pubLocationArray[0] : '',
  );
  const [subLocation, changeSubLoction] = useInput<string>('');

  const changeCategory = useCallback(
    (e) => {
      setCategory(e.target.value);
    },
    [category],
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const filterTeamList = () => {
    handleClose();
    if (subLocation && skillset)
      return router.push(
        `/team?location=${pubLocation} ${subLocation}&skillset=${category} ${skillset}`,
      );
    if (skillset) return router.push(`/team?skillset=${category} ${skillset}`);
    if (subLocation)
      return router.push(`/team?location=${pubLocation} ${subLocation}`);
  };
  useEffect(() => {
    if (categoryArray[0]) setCategory(categoryArray[0]);
  }, [categoryArray]);
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Filtering Team List
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Fitering Team List</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="pubLocation">Pub Location</InputLabel>
              <Select
                native
                value={pubLocation}
                onChange={changePubLocation as any}
                input={<Input />}
                defaultValue={''}
              >
                {pubLocationArray.map((pub) => (
                  <option key={pub} value={pub}>
                    {pub}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="subLocation">Sub Location</InputLabel>
              <Select
                labelId="subLocation"
                value={subLocation}
                onChange={changeSubLoction as any}
                input={<Input />}
                disabled={pubLocation.length < 1}
              >
                {pubLocation
                  ? locationsDataSet[pubLocation].map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))
                  : ''}
              </Select>
            </FormControl>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={filterTeamList} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TeamListFilterDialog;
