import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from 'next/link';
import { useAuth } from '../../../../utils/auth/AuthProvider';
import { useQuery } from '@apollo/react-hooks';
import searchGql from '../../../../lib/gql/searchGql';
import SearchingUserCard from '../../../search/users/SearchingUserCard';

interface SearchUserListCardProps {
  searchWord: string;
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function SearchUserListCard({
  searchWord,
}: SearchUserListCardProps) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const { data, error } = useQuery(searchGql.GET_SEARCH_USER, {
    variables: {
      searchWord,
      page: 1,
    },
  });

  if (error) {
    console.log('get users error', error);
  }
  useEffect(() => {
    if (data) {
      setUsers(data.totalSearchUser.users);
    }
  }, [data, users]);
  return (
    <>
      <div>
        {users && users.map((v, i) => <SearchingUserCard key={i} user={v} />)}
      </div>
    </>
  );
}
