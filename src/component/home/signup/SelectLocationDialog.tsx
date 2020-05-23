import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useInput from '../../../lib/hooks/useInput';
import { locationsDataSet } from '../../../../data/location';
import styled from 'styled-components';
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

export default function SelectLocationDialog() {
  const classes = useStyles();
  const pubLocationArray = Object.keys(locationsDataSet);
  const [open, setOpen] = React.useState(false);
  const [pubLocation, changePubLocation] = useInput<string>(
    pubLocationArray ? pubLocationArray[0] : '',
  );
  const [subLocation, changeSubLoction] = useInput<string>('');
  const [ableLocation, setAbleLocation] = useState<Array<string>>([]);

  const { state, dispatch } = useUser();

  const changeAbleLocation = useCallback(() => {
    dispatch({ type: 'ChangeAbleLocation', data: ableLocation });
    setOpen(false);
  }, [state.ableLocation, ableLocation]);
  const addAbleLocation = useCallback(
    (e) => {
      e.preventDefault();
      if (pubLocation && subLocation && ableLocation.length < 3) {
        const setLocation = `${pubLocation} ${subLocation}`;
        !ableLocation.includes(setLocation) &&
          setAbleLocation(ableLocation.concat(setLocation));
      }
    },
    [pubLocation, subLocation, ableLocation],
  );
  const removeAbleLocation = useCallback(
    (location: string) => () => {
      console.log(ableLocation.filter((v) => v !== location));
      setAbleLocation(ableLocation.filter((v) => v !== location));
    },
    [ableLocation],
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Select Able Location</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Select Able Location</DialogTitle>
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
            <Button onClick={addAbleLocation} color="primary">
              Add
            </Button>
          </form>
        </DialogContent>
        <DialogContent style={{ display: 'flex' }}>
          {ableLocation.map((able) => (
            <S.ContentWrap key={able}>
              <S.ContentItem>{able}</S.ContentItem>
              <Button color="primary" onClick={removeAbleLocation(able)}>
                X
              </Button>
            </S.ContentWrap>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={changeAbleLocation} color="primary">
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
