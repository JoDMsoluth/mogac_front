import react, { useState } from 'react';
import styled from 'styled-components';
import {
  AddBoxOutlined,
  IndeterminateCheckBoxOutlined,
} from '@material-ui/icons';

interface ReCommentsToggleButtonProps {
  toggleReComment: boolean;
  setToggleReComment: any;

  toggleAddReComment: boolean;
  setToggleAddReComment: any;
  reComments: number;
}
export default function ReCommentsToggleButton({
  toggleReComment,
  setToggleReComment,
  toggleAddReComment,
  setToggleAddReComment,
  reComments,
}: ReCommentsToggleButtonProps) {
  const buttonIcon =
    toggleReComment || toggleAddReComment ? (
      <IndeterminateCheckBoxOutlined />
    ) : (
      <AddBoxOutlined />
    );

  const buttonText = (reComments: number) =>
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
            {buttonText(reComments)}
            <span>s</span>
          </div>
        )
      ) : (
        <div onClick={() => setToggleAddReComment(!toggleAddReComment)}>
          {buttonIcon}
          {toggleAddReComment ? (
            <span>Hide Add Recomment</span>
          ) : (
            <span>Show Add Recomment</span>
          )}
        </div>
      )}
    </S.ShowReCommentsButtonWrap>
  );
}

const S: any = {};
S.ShowReCommentsButtonWrap = styled.div``;
