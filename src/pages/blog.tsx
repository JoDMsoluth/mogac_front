import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TeamHeader from '../component/team/TeamHeader';
import TeamListCard from '../component/team/TeamListCard';
import { useAuth } from '../utils/auth/AuthProvider';
import PersonalBlog from '../component/blog/PersonalBlog';
import { NextPage, NextPageContext } from 'next';

export default function BlogPage({ userId }) {
  return (
    <>
      <CssBaseline />
      <main>
        <PersonalBlog userId={userId} />
      </main>
    </>
  );
}

BlogPage.getInitialProps = async (ctx: NextPageContext) => {
  const { userId } = ctx.query;
  return { userId: userId as string };
};
