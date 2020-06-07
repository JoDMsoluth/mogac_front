import react from 'react';
import UserAvatar from '../../common/utils/UserAvatar';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import palette from '../../../lib/pallete';
import SearchingUserCard from './SearchingUserCard';

const users = [1, 2, 3];
export default function SearchingUserList() {
  return (
    <>
      <div>
        {users.map((v, i) => (
          <SearchingUserCard key={i} />
        ))}
      </div>
    </>
  );
}
