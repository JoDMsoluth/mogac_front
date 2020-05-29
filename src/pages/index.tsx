import React from 'react';
import { NextPage, NextPageContext } from 'next';
import TeamHeader from '../component/team/TeamHeader';
import TeamListCard from '../component/team/TeamListCard';
import BlogListCard from '../component/home/blog/BlogListCard';

interface IndexPageProps {
  page: number;
}

const IndexPage: NextPage<IndexPageProps> = ({ page }) => {
  return (
    <>
      <main>
        <TeamHeader />
        <article>
          <BlogListCard page={page} />
        </article>
      </main>
    </>
  );
};

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const { page } = ctx.query;
  return { page: parseInt(page as string, 10) || 1 };
};

export default IndexPage;
