import react from 'react';
import styled from 'styled-components';

interface WritePreviewPaneProps {
  markdown: string;
  setMarkdown: any;
}

export default function WritePreviewPane({
  markdown,
  setMarkdown,
}: WritePreviewPaneProps) {
  return (
    <>
      <div>asdfsf</div>
    </>
  );
}

const S: any = {};
S.WriteHeadBarWrap = styled.div`
  height: 2rem;
`;
