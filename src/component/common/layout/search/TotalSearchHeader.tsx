import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Container } from '@material-ui/core';
import styled from 'styled-components';
import Link from 'next/link';

interface TotalSearchHeaderProps {
  searchWord: string;
  filter: string;
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function TotalSearchHeader({
  searchWord,
  filter,
}: TotalSearchHeaderProps) {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Search List
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          검색결과 페이지입니다;
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={3} justify="center">
            <S.LinkWrap item filter={filter} type={'user'}>
              <Link href={`/search?q=${searchWord}&filter=user`}>
                <S.StyleLink>User</S.StyleLink>
              </Link>
            </S.LinkWrap>
            <S.LinkWrap item filter={filter} type={'blog'}>
              <Link href={`/search?q=${searchWord}&filter=blog`}>
                <S.StyleLink>Blog</S.StyleLink>
              </Link>
            </S.LinkWrap>
            <S.LinkWrap item filter={filter} type={'team'}>
              <Link href={`/search?q=${searchWord}&filter=team`}>
                <S.StyleLink>Team</S.StyleLink>
              </Link>
            </S.LinkWrap>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

const S: any = {};

interface LinkWrapProps {
  filter: string;
  type: string;
}
S.LinkWrap = styled(Grid)<LinkWrapProps>`
  padding: 12px 3px !important;
  margin: 0 1rem;
  border-bottom: ${(props) =>
    props.filter == props.type ? '2px solid blue' : '0'};
` as FC<LinkWrapProps>;

S.StyleLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  font-size: 1.1rem;
`;
