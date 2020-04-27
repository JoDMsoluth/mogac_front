import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, Button, Typography } from '@material-ui/core';
import styled from 'styled-components';
import palette from '../../lib/pallete';

const userAvatar = require('../../static/images/avatar/1.jpg');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  textField: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: '100%',
  },
  commentHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  userAvater: {
    width: '10rem',
  },
}));

export default function CommentList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.commentHeader}>
        <S.AvatarWrap>
          <Avatar alt="JoHyehyeong" src={userAvatar} />
          <div>
            <S.AvatarName>&nbsp;Jo Hyehyeong</S.AvatarName>
            <S.AvatarDesc>&nbsp;Front-end</S.AvatarDesc>
          </div>
        </S.AvatarWrap>
        <Button variant="contained" color="primary">
          Post
        </Button>
      </div>
      <TextField
        id="outlined-full-width"
        label="Comment Input"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    </div>
  );
}

const S: any = {};
S.AvatarWrap = styled.div`
  display: flex;
`;
S.AvatarName = styled.div`
  margin: auto 0;
  color: ${palette.gray8};
`;
S.AvatarDesc = styled.div`
  margin: auto 0;
  color: ${palette.gray6};
`;
