import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { logout } from './helpers';
import UserGql from '../../lib/gql/userGql';
import LoginForm from '../../component/home/LoginForm';
import AppLayout from '../../component/common/layout/AppLayout';
type AuthContextParams = [{ data: any }, typeof logout];

const AuthContext = createContext<AuthContextParams>([{ data: null }, logout]);

interface AuthProviderProps {
  children: ReactNode;
  loginRequired: boolean;
}
const AuthProvider = ({ children, loginRequired }: AuthProviderProps) => {
  useEffect(() => {});
  const { loading, data, error } = useQuery(UserGql.GET_CURRENT_USER);

  // Usally you dont see this, because we have no "loading" state on SSR
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log('auth data', data);
  // JWT token expired or any API-level errors, you can use redirects here
  if (error) {
    console.log('session error');
    if (loginRequired) return <LoginForm />;
  }

  return (
    <AuthContext.Provider value={[{ data }, logout]}>
      {children}
    </AuthContext.Provider>
  );
};

// Returns authentication-related data and functions
const useAuth = (): AuthContextParams => useContext(AuthContext);

export { AuthProvider, useAuth };
