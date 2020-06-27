import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TeamHeader from '../component/team/TeamHeader';
import TeamListCard from '../component/team/TeamListCard';
import { NextPage, NextPageContext } from 'next';

interface TeamPageProps {
  location: string;
  skillset: string;
}

const TeamPage: NextPage<TeamPageProps> = ({ location, skillset }) => {
  return (
    <>
      <CssBaseline />
      <main>
        <TeamHeader location={location} skillset={skillset} />
        <TeamListCard skillset={skillset} location={skillset} />
      </main>
    </>
  );
};

TeamPage.getInitialProps = async (ctx: NextPageContext) => {
  const { location, skillset } = ctx.query;
  return { location: location as string, skillset: skillset as string };
};

export default TeamPage;
