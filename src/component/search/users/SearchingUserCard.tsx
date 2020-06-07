import react from 'react';
import UserAvatar from '../../common/utils/UserAvatar';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import palette from '../../../lib/pallete';

const users = [1, 2, 3];
export default function SearchingUserCard() {
  return (
    <>
      <S.SearchUserCardWarp>
        <div>
          <UserAvatar
            name={'조혜형'}
            image_url={'https://source.unsplash.com/random'}
            skill="리액트"
          />
        </div>
        <S.UserDescWrap>
          <div>
            <div>skillset</div>
            <div>level</div>
          </div>
          <div>
            <div>skillset</div>
            <div>level</div>
          </div>
          <div>
            <div>skillset</div>
            <div>level</div>
          </div>
          <div>able location</div>
          <div>able location</div>
          <div>able location</div>
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

S.SearchUserCardWarp = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  border: 1px solid ${palette.gray3};
`;

S.UserDescWrap = styled.div`
  display: flex;
  & > div {
    margin-left: 2rem;
  }
`;
S.ButtonWrap = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 1100px) {
    display: none;
  }
`;
