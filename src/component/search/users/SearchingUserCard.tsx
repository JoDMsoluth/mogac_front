import React, { useCallback, useState } from 'react';
import UserAvatar from '../../common/utils/UserAvatar';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import Modal from '../../modal/Modal';
import palette from '../../../lib/pallete';
import {
  getSkillFormat,
  skillLevelSum,
} from '../../../lib/utils/skillLevelFormat';
import { useRouter } from 'next/router';
import InviteTeamModal from '../../modal/InviteTeamModal';
import MessageModal from '../../modal/MessageModal';
import { useAuth } from '../../../utils/auth/AuthProvider';
import { ThumbUpAlt } from '@material-ui/icons';
import transitions from '../../../lib/utils/transitions';

export enum levelLabel {
  master = 5,
  senior = 4,
  middle = 3,
  junior = 2,
  newbie = 1,
}

interface SearchingUserCardProps {
  user: any;
}
export default function SearchingUserCard({ user }: SearchingUserCardProps) {
  const { ableSkillSet, ableLocation, recommendPoint, image_url, name, level, _id, email, totalPoint } = user;
  const [visibleTeamModal, setVisibleTeamModal] = useState<boolean>(false);
  const [visibleMessageModal, setVisibleMessageModal] = useState<boolean>(false);
  const LocationFormat: { pubLocation: string; subLocation: string }[] = [];
  const router = useRouter();

  const { highLevelSkill, SkillFormat, SkillLevelArray } = getSkillFormat(
    level,
  );

  for (const loc of ableLocation) {
    const location = loc.split(' ');
    LocationFormat.push({ pubLocation: location[0], subLocation: location[1] });
  }

  

  const toggleTeamModal = useCallback(() => {
    setVisibleTeamModal(true);
  }, [visibleTeamModal, setVisibleTeamModal]);

  const toggleMessageModal = useCallback(() => {
    setVisibleMessageModal(true);
  }, [visibleMessageModal, setVisibleMessageModal]);

  const onClickBlog = useCallback(() => {
    router.push(`/blog?userId=${_id}`);
  }, []);

  console.log('recommendPoint', recommendPoint)

  return (
    <>
      <S.SearchUserCardWarp>
        <S.AvatarWrap>
          <UserAvatar
            id={_id}
            name={name}
            image_url={image_url}
            totalPoint={totalPoint}
          />
        </S.AvatarWrap>
        <S.UserDescWrap>
          <S.SkillListWrap>
            {SkillFormat.map((skill, i) => (
              <div>
                <div>{skill.skill}</div>
                <S.SkillLevelWrap>
                  <div>{levelLabel[skill.level % 10]}</div>
                  <S.LikeButtonWrap>
                    <ThumbUpAlt /> 
                    <S.LikeNumber>
                      {recommendPoint && recommendPoint[i]?.split('/')[1]}
                    </S.LikeNumber>
                  </S.LikeButtonWrap>
                </S.SkillLevelWrap>
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
            <Button color="primary" variant="contained" onClick={onClickBlog}>
              블로그
            </Button>
            <Button color="primary" variant="contained" onClick={toggleMessageModal}>
              쪽지
            </Button>
            <Button color="primary" variant="contained" onClick={toggleTeamModal}>
              팀초대
            </Button>
          </S.ButtonWrap>
        </S.UserDescWrap>
      </S.SearchUserCardWarp>
      <Modal
        visible={visibleTeamModal}
        setVisible={setVisibleTeamModal}
        render={<InviteTeamModal userId={_id} />}
      />
      <Modal
        visible={visibleMessageModal}
        setVisible={setVisibleMessageModal}
        render={<MessageModal
          receiveUser={_id}
          receiveName={name}
        />}
      />
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
  width : 15rem;
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
  width : 15rem;
  & > div {
    width: 5rem;
  }
  @media (max-width: 763px) {
    margin-left: 0;
    width : 9rem;
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

S.SkillLevelWrap = styled.div`
  position: relative;
  & > div:first-child {
    text-align: left;
    font-size: 0.6rem;
    line-height: 1.8rem;
    font-weight: bold;
  }
`;

S.LikeButtonWrap = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 1.8rem;
  width: 1rem;
  height: 1rem;
  color: ${palette.blue8};
  background: ${palette.gray2};
  border-radius: 1rem;
  padding: 0.2rem 0;
  text-align: center;
  & > svg {
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    animation: ${transitions.shaking} 10s linear infinite;
    animation-delay: 4s;
  }
  &:hover {
    background: ${palette.gray3};
  }
  &:active {
    background: ${palette.gray5};
  }
`;

S.LikeNumber = styled.div`
  position: absolute;
  top: -0.27rem;
  left: 1.2rem;
`;
