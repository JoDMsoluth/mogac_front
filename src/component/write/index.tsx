import react, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import WriteHeadBar from './WriteHeadBar';
import EditPane from './EditPane';
import WritePreviewPane from './WritePreviewPane';
import TagBar from './TagBar';
import PostPanel from './panel/PostPanel';
import useInput from '../../lib/hooks/useInput';
import { useAuth } from '../../utils/auth/AuthProvider';
import { useWrite } from '../../utils/write/WriteProvide';

export default function WriteComponent() {
  const [userDate, _] = useAuth();
  const { state } = useWrite();

  const [openPanel, setOpenPanel] = useState(false);

  const WriteHeadBarLayout = <WriteHeadBar setOpenPanel={setOpenPanel} />;
  const EditPanetLayout = <EditPane />;
  const TagBarLayout = <TagBar />;
  const WritePreviewPaneLayout = (
    <WritePreviewPane title={state.title} contents={state.contents} />
  );
  return (
    <>
      <S.WriteWrap>
        <S.EditPaneWrap>
          {WriteHeadBarLayout}
          {EditPanetLayout}
          {TagBarLayout}
        </S.EditPaneWrap>
        <S.PreviewPaneWrap>{WritePreviewPaneLayout}</S.PreviewPaneWrap>
        <PostPanel openPanel={openPanel} setOpenPanel={setOpenPanel} />
      </S.WriteWrap>
    </>
  );
}

const S: any = {};

S.WriteWrap = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
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
