import React, { Component, useCallback } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/markdown/markdown'; // 마크다운 문법 색상
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/base16-light.css';
// 마크다운 내부에 들어가는 코드 색상
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

// CodeMirror를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

export default function CodeWithCodemirror({ markdown, setMarkdown }) {
  const handleChange = useCallback(
    (value) => {
      setMarkdown(value);
    },
    [markdown],
  );
  return (
    <div>
      <CodeMirror
        value={markdown}
        options={{ theme: 'base16-light', mode: 'markdown' }}
        onBeforeChange={(editor, data, value) => {
          console.log(value);
          handleChange(value);
        }}
        onChange={(editor, data, value) => {}}
      />
    </div>
  );
}
