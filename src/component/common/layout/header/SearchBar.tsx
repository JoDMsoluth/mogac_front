import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles, fade } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useRouter } from 'next/router';
import useInput from '../../../../lib/hooks/useInput';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const router = useRouter();
  const [searchWord, setSearchWord] = useState('');

  const changeSearchWord = useCallback(
    (e) => {
      setSearchWord(e.target.value);
    },
    [searchWord],
  );

  const totalSearch = () => {
    if (searchWord.length > 0) router.push(`/search?q=${searchWord}&filter=blog`);
    setSearchWord('');
  };

  const enterKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      totalSearch();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', enterKey);
    return () => {
      window.removeEventListener('keydown', enterKey);
    };
  });

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon} onClick={totalSearch}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={searchWord}
        inputProps={{ 'aria-label': 'search' }}
        onChange={changeSearchWord}
      />
    </div>
  );
}
