import React from 'react';
import PostView from '../../component/blog/view/PostView';
import { NextPage, NextPageContext } from 'next';
import WithAuth from '../../utils/auth/WithAuth';
import AppLayout from '../../component/common/layout/AppLayout';

interface ViewPostPageProps {
  postId: string;
  name: string;
}

const ViewPostPage: NextPage<ViewPostPageProps> = ({ postId, name }) => {
  return (
    <>
      <AppLayout>
        <main>
          <PostView postId={postId} name={name} />
        </main>
      </AppLayout>
    </>
  );
};

ViewPostPage.getInitialProps = async (ctx: NextPageContext) => {
  const { post, name } = ctx.query;
  console.log(post, name);
  return { postId: post as string, name: name as string };
};

export default ViewPostPage;
