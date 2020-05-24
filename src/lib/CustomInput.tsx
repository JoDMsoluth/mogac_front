import react, { ReactNode, Props } from 'react';
import styled from 'styled-components';
import { Title } from '@material-ui/icons';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

interface CustomInputProps {
  type?: string;
  name?: string;
  value?: any;
  placeholder?: string;
  inputIcon?: ReactNode;
  onChange?: (e: Event) => void;
}

export default function CustomInput(props: CustomInputProps) {
  return (
    <S.InputContainer>
      <S.InputSpan {...props} />
      <S.InputIconWrap>{props.inputIcon}</S.InputIconWrap>
    </S.InputContainer>
  );
}

const S: any = {};

S.InputContainer = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  width: 100%;
  height: 2.5rem;
  color: rgba(0, 0, 255, 0.25);
`;

S.InputSpan = styled.input`
  outline: none;
  border: 1px solid white;
  background: ghostwhite;
  border-radius: 7px;
  height: 100%;
  padding-left: 2.4rem;
  width: 100%;
  box-sizing: border-box;
`;

S.InputIconWrap = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`;
