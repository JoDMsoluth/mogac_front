import React, { ReactNode } from 'react';
import { UserProvider } from './UserProvide';

interface withUserProps {
  children: ReactNode;
}

const WithUser = ({ children }: withUserProps) => {
  return <UserProvider>{children}</UserProvider>;
};

export default WithUser;
