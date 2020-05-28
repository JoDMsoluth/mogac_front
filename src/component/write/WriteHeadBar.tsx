import react from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface WriteHeadBarProps {
  setOpenPanel: any;
}

export default function WriteHeadBar({ setOpenPanel }: WriteHeadBarProps) {
  const router = useRouter();
  const clickPostButton = () => {
    setOpenPanel(true);
  };
  return (
    <>
      <S.WriteHeadBarWrap>
        <Link href="/">
          <a>
            <Button>Back</Button>
          </a>
        </Link>
        <Button onClick={clickPostButton}>Post</Button>
      </S.WriteHeadBarWrap>
    </>
  );
}

const S: any = {};
S.WriteHeadBarWrap = styled.div`
  background: ${palette.blue9};
  padding: 0 0.8rem;
  display: flex;
  justify-content: space-between;
  & button {
    height: 4rem;
    color: white;
  }
  & button:hover {
    color: ${palette.blue8};
    transform: scale(1.1);
  }
`;
