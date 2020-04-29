import React, { useEffect } from 'react';
import WriteComponent from '../component/write';
import dynamic from 'next/dynamic';
const CodeWithCodemirror = dynamic(import('../component/write/CodeMirror'), {
  ssr: false,
});

export default function WritePage() {
  return (
    <>
      <WriteComponent />
      <CodeWithCodemirror
        value={'for (var i=0; i < 10; i++) {\n  console.log(i)\n}'}
      />
    </>
  );
}
