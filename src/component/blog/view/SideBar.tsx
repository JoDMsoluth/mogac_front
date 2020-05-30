import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

const getCreateAtArray = function*(posts) {
  for (const post of posts) yield moment(post.createdAt).format('MMMM YYYY');
};

interface SidebarProps {
  posts: any;
  desc: string;
}

export default function Sidebar({ posts, desc }: SidebarProps) {
  const classes = useStyles();
  const createAtArray = getCreateAtArray(posts);
  const archive = [];
  for (const createAt of createAtArray) {
    if (!archive.includes(createAt)) archive.push(createAt);
  }
  console.log('archive', archive);
  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography>{desc}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Archives
      </Typography>
      {archive.map((date) => (
        <div>{date}</div>
      ))}
    </Grid>
  );
}
