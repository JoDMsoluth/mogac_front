import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
  userReducer,
  initialUserState,
  IinitialUserState,
} from './UserReducer';

type ContextParamsType = { state: IinitialUserState; dispatch: any };

const UserContext = createContext<ContextParamsType>(null);

const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  //const { loading, data, error } = useQuery(UserGql.GET_CURRENT_USER);

  // Usally you dont see this, because we have no "loading" state on SSR
  //if (loading) {
  //return <div>Loading...</div>;
  //}
  //console.log('auth data', data);
  // JWT token expired or any API-level errors, you can use redirects here
  //if (error) {
  //console.log('session error');
  // return <LoginForm />;
  //}

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Returns authentication-related data and functions
const useUser = (): ContextParamsType => useContext(UserContext);

export { UserProvider, useUser };
