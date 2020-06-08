import react from 'react';
import UserAvatar from '../../common/utils/UserAvatar';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import palette from '../../../lib/pallete';
import SearchingUserCard from './SearchingUserCard';
import UserGql from '../../../lib/gql/userGql';

interface SearchingUserListProps {
  ableLocation: any;
  ableSkillSet: any;
}
export default function SearchingUserList({
  ableLocation,
  ableSkillSet,
}: SearchingUserListProps) {
  console.log(ableLocation, ableSkillSet, 'submit');
  const result = UserGql.getAllUserBySearch(ableLocation, ableSkillSet);
  console.log('result', result);
  return (
    <>
      <div>{result && result.map((v, i) => <SearchingUserCard key={i} />)}</div>
    </>
  );
}
