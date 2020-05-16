import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
  writeReducer,
  initialWriteState,
  IinitialWriteState,
} from './WriteReducer';

type ContextParamsType = { state: IinitialWriteState; dispatch: any };

const WriteContext = createContext<ContextParamsType>(null);

const WriteProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(writeReducer, initialWriteState);
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
    <WriteContext.Provider value={{ state, dispatch }}>
      {children}
    </WriteContext.Provider>
  );
};

// Returns authentication-related data and functions
const useWrite = (): ContextParamsType => useContext(WriteContext);

export { WriteProvider, useWrite };
