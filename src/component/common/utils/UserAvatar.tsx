import react from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import palette from '../../../lib/pallete';

const userAvatar = require('../../../static/images/avatar/1.jpg');

interface UserAvatarProps {
  name?: string;
  skill?: string;
  level?: string;
  image_url?: string;
}

export default function UserAvatar({
  name,
  skill,
  level,
  image_url,
}: UserAvatarProps) {
  return (
    <>
      <S.AvatarWrap>
        <Avatar alt="JoHyehyeong" src={userAvatar} />
        <S.AvatarTextWrap>
          <S.AvatarName>&nbsp;{name || `Jo Hyehyeong`}</S.AvatarName>
          <S.AvatarDesc>&nbsp;{skill || `Newbie`}</S.AvatarDesc>
        </S.AvatarTextWrap>
      </S.AvatarWrap>
    </>
  );
}

const S: any = {};
S.AvatarWrap = styled.div`
  display: inline-flex;
`;
S.AvatarTextWrap = styled.div`
  margin-left: 0.5rem;
`;
S.AvatarName = styled.div`
  margin: auto 0;
  color: ${palette.gray8};
`;
S.AvatarDesc = styled.div`
  margin: auto 0;
  color: ${palette.gray6};
`;
