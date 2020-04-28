import react from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';

interface EditPaneProps {
  markdown: string;
  setMarkdown: any;
}

export default function EditPane({ markdown, setMarkdown }: EditPaneProps) {
  return (
    <>
      <S.WriteHeadBarWrap>asdfsf</S.WriteHeadBarWrap>
    </>
  );
}

const S: any = {};
S.WriteHeadBarWrap = styled.div`
  flex: 1;
  width: 100%;
`;
