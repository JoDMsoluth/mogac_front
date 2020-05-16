import react, { useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'markdown-to-jsx';
import Markdown from '../blog/view/Markdown';
// prism 관련 코드 불러오기
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
// 지원할 코드 형식들을 불러옵니다.
// http://prismjs.com/#languages-list 참조
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

interface WritePreviewPaneProps {
  contents: string;
  title: string;
}

export default function WritePreviewPane({
  contents,
  title,
}: WritePreviewPaneProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [contents]);
  return (
    <>
      <S.PreviewWrap>
        <div>{title}</div>
        <Markdown>{contents}</Markdown>
      </S.PreviewWrap>
    </>
  );
}

const S: any = {};
S.PreviewWrap = styled.div`
  padding: 1rem;
  line-height: 1.7rem;
`;
