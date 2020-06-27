import react, { useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import palette from '../../../lib/pallete';
import UserToolbar from './UserToolbar';
import { FlashOn } from '@material-ui/icons';

const userAvatar = require('../../../static/images/avatar/1.jpg');

interface UserAvatarProps {
  name?: string;
  skill?: string;
  level?: number;
  image_url?: string;
  isTeam?: boolean;
}

export default function UserAvatar({
  name,
  skill,
  level,
  image_url,
  isTeam = false,
}: UserAvatarProps) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  console.log('anchorEl', anchorEl);
  return (
    <>
      <S.AvatarWrap>
        <S.AvatarImageWrap>
          <Avatar
            alt="JoHyehyeong"
            src={userAvatar}
            onClick={handleProfileMenuOpen}
          />
        </S.AvatarImageWrap>
        <S.AvatarTextWrap>
          <S.AvatarHead>
            <S.AvatarName>&nbsp;{name || `Jo Hyehyeong`}</S.AvatarName>
            <S.LevelWrap>
              <div>
                <FlashOn />
              </div>
              <span>{level ? level : 0}</span>
            </S.LevelWrap>
          </S.AvatarHead>
          <S.AvatarDesc>&nbsp;{skill || `Newbie`}</S.AvatarDesc>
        </S.AvatarTextWrap>

        {/* 툴바 */}
        <UserToolbar
          anchorEl={anchorEl}
          handleMenuClose={handleMenuClose}
          isTeam={isTeam}
        />
      </S.AvatarWrap>
    </>
  );
}

const S: any = {};
S.AvatarWrap = styled.div`
  display: inline-flex;
`;
S.AvatarImageWrap = styled.div`
  align-self: center;
`;

S.AvatarHead = styled.div`
  display: inline-flex;
`;
S.LevelWrap = styled.div`
  & > svg {
    font-size: 1rem;
    margin-top: 0.3rem;
  }
  & > span {
    font-size: 0.8rem;
    line-height: 1.5rem;
  }
  margin-left: 0.2rem;
  color: ${palette.gray4};
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
