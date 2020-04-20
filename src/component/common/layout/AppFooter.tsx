import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import Copyright from './Copyright';

interface AppFooterProps {}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8),
  },
}));

const AppFooter = () => {
  const classes = useStyles();
  return (
    <>
      <S.FooterContainer>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </S.FooterContainer>
    </>
  );
};

const S: any = {};

S.FooterContainer = styled.div`
  text-align: center;
  height: 20rem;
  width: 100%;
`;

export default AppFooter;
