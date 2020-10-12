import React, { useCallback, useState, FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import teamGql from '../../lib/gql/teamGql';
import { ListAlt } from '@material-ui/icons';
import { Button } from '@material-ui/core';

export default function InviteTeamModal({ userId }) {
  const { data, error, loading } = useQuery(teamGql.GET_ALL_TEAM_BY_ME);
  const [inviteUserToTeam] = useMutation(teamGql.INVITE_USER_TO_TEAM);
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [team, setTeam] = useState<{ title: string; id: string }>(null);

  const changeTeam = useCallback(
    (teamset: { title: string; id: string }) => () => {
      setTeam(teamset);
    },
    [team],
  );

  const changeOpenPanel = useCallback(() => {
    setOpenPanel(!openPanel);
  }, [openPanel]);

  const clickOk = useCallback(
    async (e) => {
      e.preventDefault();
      const result = await inviteUserToTeam({
        variables: {
          userId,
          teamId: team?.id,
        },
      });
      if (result) {
        alert('초대에 성공했습니다.');
      }
    },
    [team?.id],
  );

  console.log('data', data);
  if (error) {
    console.error(error);
  }
  if (loading) {
    return null;
  }

  return (
    <>
      <Button onClick={clickOk}>초대하기</Button>
      <S.SelectWrap>
        <S.SelectSpan onClick={changeOpenPanel}>
          {team ? team.title : 'Team'}
        </S.SelectSpan>
        <S.SelectIconWrap>
          <ListAlt />
        </S.SelectIconWrap>
        <S.SelectOptionWrap open={openPanel}>
          {data?.getAllTeamsByMe.length > 0 &&
            data?.getAllTeamsByMe.map((v) => (
              <S.SelectOption
                key={v._id}
                onClick={changeTeam({ title: v.title, id: v._id })}
              >
                {v.title}
              </S.SelectOption>
            ))}
        </S.SelectOptionWrap>
      </S.SelectWrap>
    </>
  );
}

const S: any = {};

S.SelectWrap = styled.div`
  margin: 0.75rem 0;
  position: relative;
  width: 100%;
  height: 2.5rem;
  color: rgba(0, 0, 255, 0.25);
  z-index: 1;
`;

S.SelectSpan = styled.div`
  outline: none;
  color: ${palette.blue8};
  border: 1px solid white;
  background: ghostwhite;
  border-radius: 7px;
  height: 100%;
  padding: 0.5rem 0.5rem 0.5rem 2.4rem;
  width: 100%;
  box-sizing: border-box;
`;

S.SelectOption = styled.div`
  height: 2rem;
  font-size: 1rem;
  line-height: 2rem;
  overflow: hidden;
  &:hover {
    background: ${palette.gray3};
  }
`;

S.SelectOptionWrap = styled.div<{ open: boolean }>`
  text-align: center;
  color: ${palette.blue9};
  max-height: ${(prop) => (prop.open ? '10rem' : '0')};
  width: 100%;
  overflow: auto;
  background: ${palette.gray2};
  border-radius: 3px;
  transition: max-height 0.5s ease;
  @media (max-width: 763px) {
    max-height: ${(prop) => (prop.open ? '6rem' : '0')};
  }
` as FC<{ open: boolean }>;

S.SelectIconWrap = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`;
