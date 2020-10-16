import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import UserAvatar from '../common/utils/UserAvatar';

export default function RecommendList ({recommends}) {
    return (
      <S.RecommendListWrap>
          <S.CommentWrap>
            {recommends.length > 0 && recommends.map((recommend) => (
                <>
                <S.CommentHead>
                    <UserAvatar desc={recommend?.contents} name={recommend?.recommendedBy?.name} image_url={recommend?.recommendedBy?.image_url} />
                </S.CommentHead>
              </>
            ))}
        </S.CommentWrap>
      </S.RecommendListWrap>
    )
}
const S: any = {};

S.CommentWrap = styled.div`
  border-bottom: 1px solid ${palette.gray4};
  &:last-child {
    border: none;
  }
`;

S.CommentHead = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

S.RecommendListWrap = styled.div`
  max-height : 20rem;
  overflow : auto;
  width : 100%;
  margin: 1rem 2rem 0;
  @media (max-width: 768px) {
    margin: 1rem 0.5rem 0;
  }
`;
