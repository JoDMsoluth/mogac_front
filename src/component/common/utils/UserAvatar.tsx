import react from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import palette from '../../../lib/pallete';

const userAvatar = require('../../../static/images/avatar/1.jpg');

export default function UserAvatar() {
  return (
    <>
      <S.AvatarWrap>
        <Avatar alt="JoHyehyeong" src={userAvatar} />
        <S.AvatarTextWrap>
          <S.AvatarName>&nbsp;Jo Hyehyeong</S.AvatarName>
          <S.AvatarDesc>&nbsp;Front-End</S.AvatarDesc>
        </S.AvatarTextWrap>
      </S.AvatarWrap>
    </>
  );
}

const S: any = {};
S.AvatarWrap = styled.div`
  display: flex;
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
