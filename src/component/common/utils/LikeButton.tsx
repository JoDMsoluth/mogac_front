import react, { useState, useCallback, useEffect } from 'react';
import { ThumbUpAltOutlined, ThumbUpAlt } from '@material-ui/icons';
import { useAuth } from '.././../../utils/auth/AuthProvider';
import styled from 'styled-components';
import palette from '../../../lib/pallete';
import transitions from '../../../lib/utils/transitions';

interface LikeButtonProps {
  likeList?: any;
  id?: string;
}

const checkLike = (likeList: Array<string>, userId: string) => {
  if (likeList instanceof Array && likeList.length > 0) {
    return likeList.includes(userId);
  }
  return false;
};

const LikeButton = ({ likeList, id }: LikeButtonProps) => {
  console.log('likeList, id', likeList, id);
  const [like, setLike] = useState<boolean>(false);

  console.log('like', like);

  useEffect(() => {
    if (id) setLike(checkLike(likeList, id));
  }, [id]);

  const onClickLike = useCallback(() => {
    if (!id) {
      alert('로그인 후 이용');
      return;
    } else {
      setLike(!like);
    }
  }, [like]);

  return (
    <>
      <S.LikeButtonWrap onClick={onClickLike}>
        {like ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
        <S.LikeNumber>
          {likeList && likeList.length > 0 ? likeList.length : '0'}
        </S.LikeNumber>
      </S.LikeButtonWrap>
    </>
  );
};

export default LikeButton;

const S: any = {};

S.LikeButtonWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
  color: ${palette.blue8};
  background: ${palette.gray2};
  border-radius: 2rem;
  padding: 0.5rem 0;
  text-align: center;
  & > svg {
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
  top: 2rem;
  left: 1rem;
`;
