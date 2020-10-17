import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright } from '@material-ui/icons';
import { RadioGroup, FormLabel, Radio } from '@material-ui/core';
import UploadAvatar from '../../../component/common/utils/UploadAvatar';
import SelectLocationDialog from './SelectLocationDialog';
import SelectSkillSetDialog from './SelectSkillSetDialog';
import { useUser } from '../../../utils/user/UserProvide';
import CategoryGql from '../../../lib/gql/categoryGql';
import UserGql from '../../../lib/gql/userGql';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import CheckName from './CheckName';
import CheckEmail from './CheckEmail';
import { makeSkillLevel } from '../../../lib/utils/skillLevelFormat';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  checkButtonWrap: {
    alignSelf: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const router = useRouter();
  const [signup] = useMutation(UserGql.SIGNUP);

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkName, setCheckName] = useState(false);
  const [toggleCheckName, setToggleCheckName] = useState(false);
  const [toggleCheckEmail, setToggleCheckEmail] = useState(false);

  const [allowCheck, setAllowCheck] = useState(false);
  const { state, dispatch } = useUser();
  const { categoryArray, skillsetData } = CategoryGql.loadAllCategory();
  const {
    name,
    email,
    gender,
    password,
    image_url,
    ableSkillSet,
    ableLocation,
    ableSkillSetLevel,
  } = state;
  const changeAllowCheck = useCallback(
    (e, checked) => {
      setAllowCheck(checked);
      if (!gender) dispatch({ type: 'ChangeGender', data: 'female' });
    },
    [allowCheck],
  );
  const changeName = useCallback(
    (e) => {
      dispatch({ type: 'ChangeName', data: e.target.value });
    },
    [name],
  );
  const changeEmail = useCallback(
    (e) => {
      dispatch({ type: 'ChangeEmail', data: e.target.value });
    },
    [email],
  );
  const changePassword = useCallback(
    (e) => {
      dispatch({ type: 'ChangePassword', data: e.target.value });
    },
    [password],
  );
  const changeGender = useCallback(
    (e) => {
      dispatch({ type: 'ChangeGender', data: e.target.value });
    },
    [gender],
  );

  const onClickSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      if (!checkEmail) {
        return alert('이메일 중복체크 해주세요');
      }
      if (!checkName) {
        return alert('이름 중복체크 해주세요');
      }
      console.log(
        'name email password gender image_url ableLocation ableSkillSet, allowCheck',
        name,
        email,
        password,
        gender,
        image_url,
        ableLocation,
        ableSkillSet,
        ableSkillSetLevel,
        allowCheck,
      );
      try {
        if (
          name &&
          email &&
          password &&
          gender &&
          allowCheck &&
          ableLocation.length > 0 &&
          ableSkillSet.length > 0 &&
          ableSkillSetLevel.length > 0
        ) {
          if (password.length < 6 || password.length > 30)
            return alert('password is more than 6, less then 30');
          console.log('length', ableLocation.length, ableSkillSet.length);

          console.log(ableLocation, ableSkillSet, ableSkillSetLevel);
          const sortedAbleLocation = await ableLocation.slice().sort();
          const sortedAbleSkillSet = await ableSkillSet.slice().sort();
          const sortedAbleSkillSetLevel = await ableSkillSetLevel.slice().slice(0,ableSkillSet.length).sort();
          const recommendPoint = await ableSkillSet.map(skill => skill.concat('/0'));
          console.log(ableLocation, ableSkillSet, ableSkillSetLevel, recommendPoint);

          const result = await signup({
            variables: {
              data: {
                name,
                email,
                password,
                gender,
                image_url: `https://picsum.photos/id/${Math.floor(Math.random() * 1051)}/50/50`,
                ableLocation : sortedAbleLocation,
                ableSkillSet : sortedAbleSkillSet,
                level: sortedAbleSkillSetLevel,
                recommendPoint,
              },
            },
          });
          console.log('result', result);
          if (result.data) {
            alert('회원가입 성공!');
            router.push('/');
          } else {
            alert('회원가입 실패!');
            window.location.href = '/';
          }
        } else alert('write required field');
      } catch (err) {
        console.log(err);
      }
    },
    [
      name,
      email,
      password,
      gender,
      image_url,
      ableLocation,
      ableSkillSet,
      ableSkillSetLevel,
      allowCheck,
      checkEmail,
      checkName,
    ],
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form encType="multipart/form-data" className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                disabled={checkName}
                onChange={changeName}
              />
            </Grid>
            <Grid item xs={4} className={classes.checkButtonWrap}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                onClick={() => {
                  setToggleCheckName(!toggleCheckName);
                  if (checkName) setCheckName(false);
                }}
              >
                Check
              </Button>
              {toggleCheckName && (
                <CheckName setCheckName={setCheckName} checkName={checkName} />
              )}
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={checkEmail}
                onChange={changeEmail}
              />
            </Grid>
            <Grid item xs={4} className={classes.checkButtonWrap}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                onClick={() => {
                  setToggleCheckEmail(!toggleCheckEmail);
                  if (checkEmail) setCheckEmail(false);
                }}
              >
                Check
              </Button>
              {toggleCheckEmail && (
                <CheckEmail
                  setCheckEmail={setCheckEmail}
                  checkEmail={checkEmail}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changePassword}
              />
            </Grid>
            <Grid item xs={7} sm={7}>
              <UploadAvatar />
            </Grid>
            <Grid item xs={5} sm={5}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                defaultValue="female"
                aria-label="gender"
                name="gender"
                onChange={changeGender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={6}>
              <SelectLocationDialog />
            </Grid>
            <Grid item xs={6}>
              <SelectSkillSetDialog
                categoryArray={categoryArray}
                skillsetData={skillsetData}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={allowCheck}
                    color="primary"
                    onChange={changeAllowCheck}
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClickSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
