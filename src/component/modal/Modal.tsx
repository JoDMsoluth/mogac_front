import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import palette from '../../lib/pallete';

interface ModalProps {
  setVisible: any;
  visible: boolean;
  render: any;
}

export default function Modal({ visible, setVisible, render }: ModalProps) {
  const toggle = useCallback(() => setVisible(!visible), [visible, setVisible]);
  const noneEvent = useCallback((e) => e.stopPropagation(), []);

  const escapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggle();
      }
    },
    [toggle],
  );
  useEffect(() => {
    if (visible) window.addEventListener('keydown', escapeKey);
    else if (!visible) window.removeEventListener('keydown', escapeKey);
    return () => {
      window.removeEventListener('keydown', escapeKey);
    };
  }, [visible, setVisible, escapeKey]);

  return visible
    ? createPortal(
        <>
          <S.Overlay />
          <S.Container onClick={toggle}>
            <S.Wrap onClick={noneEvent}>{render}</S.Wrap>
          </S.Container>
        </>,
        document.body,
      )
    : null;
}

const S: any = {};

S.Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: gray;
  opacity: 0.5;
`;

S.Container = styled.div`
  position: fixed;
  z-index: 1050;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

S.Wrap = styled.div`
  z-index: 1060;
  color: white;
  position: absolute;
  border-radius: 3px;
  max-width: 40.75rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
