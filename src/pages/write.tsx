import React, { useEffect } from 'react';
import WriteComponent from '../component/write';
import WithAuth from '../utils/auth/WithAuth';
import WithWrite from '../utils/write/WithWrite';
export default function WritePage() {
  return (
    <>
      <WithAuth>
        <WithWrite>
          <WriteComponent />
        </WithWrite>
      </WithAuth>
    </>
  );
}
