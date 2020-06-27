import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import AppLayout from '../../component/common/layout/AppLayout';
import Chat from '../../component/team/view/chat/Chat';
import { useRouter } from 'next/router';

interface ViewTeamPageProps {
  room: string;
  name: string;
}

const ViewTeamPage: NextPage<ViewTeamPageProps> = ({ room, name }) => {
  const router = useRouter();
  const showErrorPage = () => {
    alert('잘못된 URL입니다.');
    router.back();
    return null;
  };
  return (
    <>
      <AppLayout>
        {room && name ? (
          <Chat initRoom={room} initName={name} />
        ) : (
          showErrorPage()
        )}
      </AppLayout>
    </>
  );
};

ViewTeamPage.getInitialProps = async (ctx: NextPageContext) => {
  const { room, name } = ctx.query;
  return { room: room as string, name: name as string };
};

export default ViewTeamPage;
