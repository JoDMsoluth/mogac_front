import React, { useEffect } from 'react';
import { AppProps, AppContext } from 'next/app';

import { Helmet } from 'react-helmet';

import './_app.scss';
import { withApollo } from '../lib/apollo';
import AppLayout from '../component/common/layout/AppLayout';
import WithAuth from '../utils/auth/WithAuth';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  });
  return (
    <>
      <Helmet
        title="Cosmos"
        htmlAttributes={{ lang: 'ko' }}
        meta={[
          {
            charSet: 'UTF-8',
          },
          {
            name: 'viewport',
            content:
              'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
          },
          {
            httpEquiv: 'X-UA-Compatible',
            content: 'IE=edge',
          },
          {
            name: 'description',
            content: 'team matching web application for developer',
          },
          {
            name: 'og:title',
            content: 'Cosmos',
          },
          {
            name: 'og:description',
            content: 'team matching web application for developer',
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            property: 'og:image',
            content: 'http://localhost:3060/favicon.ico',
          },
        ]}
        link={[
          {
            rel: 'stylesheet',
            href:
              'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css',
          },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/earlyaccess/notosanskr.css',
          },
          {
            rel: 'stylesheet',
            href:
              'https://fonts.googleapis.com/css?family=Anton|Bangers|Bebas+Neue|IBM+Plex+Sans&display=swap',
          },
          {
            rel: 'stylesheet',
            href: 'http://localhost:3060/prism-okaidia.css',
          },
        ]}
      />
      {router.pathname === '/signup' ? (
        <Component {...pageProps} />
      ) : (
        <WithAuth>
          <Component {...pageProps} />
        </WithAuth>
      )}
    </>
  );
};

export default withApollo({ ssr: true })(App);
