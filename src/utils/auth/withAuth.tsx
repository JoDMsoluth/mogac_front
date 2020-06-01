import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthProvider';

interface withAuthProps {
  children: ReactNode;
  loginRequired: boolean;
}

const WithAuth = ({ children, loginRequired }: withAuthProps) => {
  return <AuthProvider loginRequired={loginRequired}>{children}</AuthProvider>;
};

export default WithAuth;
