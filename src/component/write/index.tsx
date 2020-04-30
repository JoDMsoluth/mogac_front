import react, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import WriteHeadBar from './WriteHeadBar';
import EditPane from './EditPane';
import WritePreviewPane from './WritePreviewPane';
import TagBar from './TagBar';
import PostPanel from './panel/PostPanel';
import useInput from '../../lib/hooks/useInput';

export default function WriteComponent() {
  const [title, changeTitle] = useInput<string>('');
  const [tags, changeTags] = useInput<string>('');
  const [desc, changeDesc] = useInput<string>('');

  const [markdown, setMarkdown] = useState('');
  const [openPanel, setOpenPanel] = useState(false);

  console.log(markdown);
  const WriteHeadBarLayout = <WriteHeadBar setOpenPanel={setOpenPanel} />;
  const EditPanetLayout = (
    <EditPane
      markdown={markdown}
      setMarkdown={setMarkdown}
      title={title}
      changeTitle={changeTitle}
    />
  );
  const TagBarLayout = <TagBar tags={tags} changeTags={changeTags} />;
  const WritePreviewPaneLayout = (
    <WritePreviewPane markdown={markdown} title={title} />
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
        <PostPanel
          openPanel={openPanel}
          setOpenPanel={setOpenPanel}
          title={title}
          changeTitle={changeTitle}
          markdown={markdown}
          tags={tags}
          changeTags={changeTags}
        />
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
