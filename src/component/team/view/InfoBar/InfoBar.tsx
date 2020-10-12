import React from 'react';
import styled from 'styled-components';

const onlineIcon = require('../../../../static/images//onlineIcon.png');
const closeIcon = require('../../../../static/images//closeIcon.png');

const InfoBar = ({ room }) => (
  <S.InfoBar>
    <S.LeftInnerContainer>
      <S.OnlineIcon src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </S.LeftInnerContainer>
    <S.RightInnerContainer>
      <a href="/">
        <img src={closeIcon} alt="close icon" />
      </a>
    </S.RightInnerContainer>
  </S.InfoBar>
);

const S: any = {};

S.InfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2979ff;
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;
`;

S.LeftInnerContainer = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  margin-left: 5%;
  color: white;
`;

S.RightInnerContainer = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: flex-end;
  margin-right: 5%;
`;

S.OnlineIcon = styled.div`
  margin-right: 5%;
`;

export default InfoBar;
