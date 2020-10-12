import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import PersonalBlog from '../component/blog/PersonalBlog';
import { NextPage, NextPageContext } from 'next';

export default function BlogPage({ userId, page }) {
  return (
    <>
      <CssBaseline />
      <main>
        <PersonalBlog userId={userId} page={page} />
      </main>
    </>
  );
}

BlogPage.getInitialProps = async (ctx: NextPageContext) => {
  const { userId, page } = ctx.query;
  return { page: parseInt(page as string, 10) || 1, userId: userId as string };
};
