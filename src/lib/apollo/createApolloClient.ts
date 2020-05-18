import { NextPageContext } from 'next';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
/**
 * Get the user token from cookie
 */
const getToken = () => {
  const token = Cookies.get('qid');
  return token;
};

const createApolloClient = (initialState = {}, ctx: NextPageContext) => {
  const fetchOptions = {
    agent: null,
  };

  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      fetchOptions.agent = new (require('https-proxy-agent'))(
        process.env.https_proxy,
      );
    }
  }

  console.log('server url : ', process.env.GRAPHQL_URL);
  // httpLink 대신 uploadLink 사용함(파일 업로드 해야되서 )
  const uploadLink = new createUploadLink({
    uri: process.env.GRAPHQL_URL, // Server URL (must be absolute)
  });

  const authLink = setContext((_request, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    connectToDevTools: Boolean(ctx),
    ssrMode: Boolean(ctx),
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache().restore(initialState),
  });
};

export default createApolloClient;
