import React, { ReactNode } from 'react';
import { WriteProvider } from './WriteProvide';

interface withWriteProps {
  children: ReactNode;
}

const WithWrite = ({ children }: withWriteProps) => {
  return <WriteProvider>{children}</WriteProvider>;
};

export default WithWrite;
