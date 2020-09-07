import React from 'react';
import UserAvatar from '../../common/utils/UserAvatar';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import palette from '../../../lib/pallete';
import SearchingUserCard from './SearchingUserCard';
import UserGql from '../../../lib/gql/userGql';
import { makeAbleSkillSetLevel } from '../../../lib/utils/skillLevelFormat';

interface SearchingUserListProps {
  ableLocation: any;
  ableSkillSet: any;
  level: number;
}
export default function SearchingUserList({
  ableLocation,
  ableSkillSet,
  level,
}: SearchingUserListProps) {
  console.log('make', makeAbleSkillSetLevel(ableSkillSet, level));
  const result = UserGql.getAllUserBySearch(
    ableLocation,
    makeAbleSkillSetLevel(ableSkillSet, level),
  );
  return (
    <>
      <div>
        {result && result.map((v, i) => <SearchingUserCard key={i} user={v} />)}
      </div>
    </>
  );
}
