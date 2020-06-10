import react from 'react';
import UserAvatar from '../../common/utils/UserAvatar';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import palette from '../../../lib/pallete';
import {
  getSkillFormat,
  skillLevelSum,
} from '../../../lib/utils/skillLevelFormat';

interface SearchingUserCardProps {
  user: any;
}
export default function SearchingUserCard({ user }: SearchingUserCardProps) {
  const { ableSkillSet, ableLocation, image_url, name, level } = user;
  const LocationFormat: { pubLocation: string; subLocation: string }[] = [];

  const { highLevelSkill, SkillFormat, SkillLevelArray } = getSkillFormat(
    level,
  );

  for (const loc of ableLocation) {
    const location = loc.split(' ');
    LocationFormat.push({ pubLocation: location[0], subLocation: location[1] });
  }

  console.log(SkillFormat, LocationFormat);

  return (
    <>
      <S.SearchUserCardWarp>
        <S.AvatarWrap>
          <UserAvatar
            name={name}
            image_url={'https://source.unsplash.com/random'}
            skill={highLevelSkill[0] as string}
            level={skillLevelSum(SkillLevelArray)}
          />
        </S.AvatarWrap>
        <S.UserDescWrap>
          <S.SkillListWrap>
            {SkillFormat.map((skill) => (
              <div>
                <div>{skill.skill}</div>
                <div>{skill.level}</div>
              </div>
            ))}
          </S.SkillListWrap>
          <S.LocationListWrap>
            {LocationFormat.map((location) => (
              <div>
                <div>{location.pubLocation}</div>
                <div>{location.subLocation}</div>
              </div>
            ))}
          </S.LocationListWrap>
          <S.ButtonWrap>
            <Button color="primary" variant="contained">
              블로그
            </Button>
            <Button color="primary" variant="contained">
              쪽지
            </Button>
            <Button color="primary" variant="contained">
              팀초대
            </Button>
          </S.ButtonWrap>
        </S.UserDescWrap>
      </S.SearchUserCardWarp>
    </>
  );
}

const S: any = {};

S.AvatarWrap = styled.div`
  width: 10rem;
`;
S.SearchUserCardWarp = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  border: 1px solid ${palette.gray3};
`;

S.UserDescWrap = styled.div`
  display: flex;
  text-align: center;
`;
S.ButtonWrap = styled.div`
  width: 15rem;
  display: flex;
  margin-left: 2rem;
  justify-content: space-evenly;

  @media (max-width: 1100px) {
    display: none;
  }
`;

S.SkillListWrap = styled.div`
  display: flex;
  margin-left: 2rem;
  & > div {
    width: 5rem;
  }
  @media (max-width: 763px) {
    display: none;
  }
`;

S.LocationListWrap = styled.div`
  display: flex;
  margin-left: 2rem;
  & > div {
    width: 5rem;
  }
  @media (max-width: 763px) {
    margin-left: 0;
    & > div {
      width: 3rem;
    }
  }
  @media (max-width: 450px) {
    & > div {
      font-size: 0.7rem;
      align-self: center;
    }
  }
`;
