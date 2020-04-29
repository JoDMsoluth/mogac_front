import react from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'markdown-to-jsx';
import Markdown from '../blog/view/Markdown';

interface WritePreviewPaneProps {
  markdown: string;
}

export default function WritePreviewPane({ markdown }: WritePreviewPaneProps) {
  return (
    <>
      <S.PreviewWrap>
        <Markdown>{markdown}</Markdown>
      </S.PreviewWrap>
    </>
  );
}

const S: any = {};
S.PreviewWrap = styled.div`
  padding: 1rem;
  line-height: 1.7rem;
`;
