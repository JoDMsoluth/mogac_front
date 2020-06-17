import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import AppLayout from '../../component/common/layout/AppLayout';
import TeamView from '../../component/team/view/TeamView';

interface ViewTeamPageProps {
  teamId: string;
}

const ViewTeamPage: NextPage<ViewTeamPageProps> = ({ teamId }) => {
  return (
    <>
      <AppLayout>
        <TeamView />
      </AppLayout>
    </>
  );
};

ViewTeamPage.getInitialProps = async (ctx: NextPageContext) => {
  const { team } = ctx.query;
  return { teamId: team as string };
};

export default ViewTeamPage;
