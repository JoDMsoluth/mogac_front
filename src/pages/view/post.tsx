import React, { useEffect } from 'react';
import PostView from '../../component/blog/view/PostView';
import { NextPage, NextPageContext } from 'next';
import WithAuth from '../../utils/auth/WithAuth';
import AppLayout from '../../component/common/layout/AppLayout';
import WithWrite from '../../utils/write/WithWrite';

interface ViewPostPageProps {
  postId: string;
  userId: string;
}

const ViewPostPage: NextPage<ViewPostPageProps> = ({ postId, userId }) => {
  return (
    <>
      <WithWrite>
        <AppLayout>
          <main>
            <PostView postId={postId} userId={userId} />
          </main>
        </AppLayout>
      </WithWrite>
    </>
  );
};

ViewPostPage.getInitialProps = async (ctx: NextPageContext) => {
  const { post, userId } = ctx.query;
  console.log(post, userId);
  return { postId: post as string, userId: userId as string };
};

export default ViewPostPage;
