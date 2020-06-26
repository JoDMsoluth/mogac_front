import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import AppLayout from '../../component/common/layout/AppLayout';
import Chat from '../../component/team/view/chat/Chat';

interface ViewTeamPageProps {
  room: string;
  name: string;
}

const ViewTeamPage: NextPage<ViewTeamPageProps> = ({ room, name }) => {
  return (
    <>
      <AppLayout>
        <Chat initRoom={room} initName={name} />
      </AppLayout>
    </>
  );
};

ViewTeamPage.getInitialProps = async (ctx: NextPageContext) => {
  const { room, name } = ctx.query;
  return { room: room as string, name: name as string };
};

export default ViewTeamPage;
