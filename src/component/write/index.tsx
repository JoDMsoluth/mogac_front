import react, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import WriteHeadBar from './WriteHeadBar';
import EditPane from './EditPane';
import WritePreviewPane from './WritePreviewPane';
import TagBar from './TagBar';

export default function WriteComponent() {
  const [markdown, setMarkdown] = useState('');
  const WriteHeadBarLayout = <WriteHeadBar />;
  const EditPanetLayout = (
    <EditPane markdown={markdown} setMarkdown={setMarkdown} />
  );
  const TagBarLayout = <TagBar />;
  const WritePreviewPaneLayout = <WritePreviewPane markdown={markdown} />;
  return (
    <>
      <S.WriteWrap>
        <S.EditPaneWrap>
          {WriteHeadBarLayout}
          {EditPanetLayout}
          {TagBarLayout}
        </S.EditPaneWrap>
        <S.PreviewPaneWrap>{WritePreviewPaneLayout}</S.PreviewPaneWrap>
      </S.WriteWrap>
    </>
  );
}

const S: any = {};

S.WriteWrap = styled.div`
  height: 100vh;
  display: flex;
`;
S.EditPaneWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  background: ${palette.gray2};
`;
S.PreviewPaneWrap = styled.div`
  height: 100%;
  flex: 1;
  @media (max-width: 768px) {
    display: none;
  }
`;
