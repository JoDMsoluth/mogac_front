import React from 'react';
import PostView from '../../component/blog/view/PostView';
import { NextPage, NextPageContext } from 'next';

interface ViewPostPageProps {
  postId: string;
}

const ViewPostPage: NextPage<ViewPostPageProps> = ({ postId }) => {
  return (
    <>
      <main>
        <PostView postId={postId} />
      </main>
    </>
  );
};

ViewPostPage.getInitialProps = async (ctx: NextPageContext) => {
  const { post } = ctx.query;
  return { postId: post as string };
};

export default ViewPostPage;
