import react from 'react';
import styled from 'styled-components';
import {
  AddBoxOutlined,
  IndeterminateCheckBoxOutlined,
} from '@material-ui/icons';

interface ReCommentsToggleButtonProps {
  toggleReComment: boolean;
  setToggleReComment: any;
  reComments: number;
}
export default function ReCommentsToggleButton({
  toggleReComment,
  setToggleReComment,
  reComments,
}: ReCommentsToggleButtonProps) {
  const buttonIcon = toggleReComment ? (
    <IndeterminateCheckBoxOutlined />
  ) : (
    <AddBoxOutlined />
  );
  const buttonText = (reComments) =>
    toggleReComment ? (
      <span>{`hide ${reComments - 1} comment`}</span>
    ) : (
      <span>{`show ${reComments - 1} comment`}</span>
    );
  return (
    <S.ShowReCommentsButtonWrap>
      {reComments > 0 ? (
        reComments === 2 ? (
          <div onClick={() => setToggleReComment(!toggleReComment)}>
            {buttonIcon}
            {buttonText(reComments)}
          </div>
        ) : (
          <div onClick={() => setToggleReComment(!toggleReComment)}>
            {buttonIcon}
            {`${buttonText(reComments)}s`}
          </div>
        )
      ) : (
        ''
      )}
    </S.ShowReCommentsButtonWrap>
  );
}

const S: any = {};
S.ShowReCommentsButtonWrap = styled.div``;
