import React, { createContext, useContext, useEffect } from 'react';

type WriteContextParams = { data: any; series: any; category: any };

const WriteContext = createContext<WriteContextParams>({
  data: null,
  series: null,
  category: null,
});

const WriteProvider: React.FC = ({ children }) => {
  const series = null;
  const category = null;
  const data = null;
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
    <WriteContext.Provider value={{ data, series, category }}>
      {children}
    </WriteContext.Provider>
  );
};

// Returns authentication-related data and functions
const useWrite = (): WriteContextParams => useContext(WriteContext);

export { WriteProvider, useWrite };
