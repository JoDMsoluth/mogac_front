import react from 'react';
import styled from 'styled-components';

interface LevelGuideProps {
  guide: string;
}

export default function LevelGuide({ guide }: LevelGuideProps) {
  return (
    <>
      <S.GuideContainer>{guide}</S.GuideContainer>
    </>
  );
}

const S: any = {};
