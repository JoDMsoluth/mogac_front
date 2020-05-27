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
import { useWrite } from '../../utils/write/WriteProvide';

export default function CodeWithCodemirror() {
  const { state, dispatch } = useWrite();
  const handleChange = useCallback(
    (value) => {
      dispatch({ type: 'ChangeContents', data: value });
    },
    [state.contents],
  );
  return (
    <div>
      <CodeMirror
        value={state.contents}
        options={{
          theme: 'base16-light',
          mode: 'markdown',
          lineWrapping: true,
        }}
        onBeforeChange={(editor, data, value) => {
          console.log(value);
          handleChange(value);
        }}
        onChange={(editor, data, value) => {}}
      />
    </div>
  );
}
