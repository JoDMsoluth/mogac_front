import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TeamHeader from '../component/team/TeamHeader';
import TeamListCard from '../component/team/TeamListCard';
import { NextPage, NextPageContext } from 'next';

interface TeamPageProps {
  location: string;
  skillset: string;
}

const TeamPage: NextPage<TeamPageProps> = ({ location, skillset }) => {
  const [teams, setTeams] = useState([]);
  console.log('remnder');
  return (
    <>
      <CssBaseline />
      <main>
        <TeamHeader
          teams={teams}
          location={location}
          skillset={skillset}
          setTeams={setTeams}
        />
        <TeamListCard
          skillset={skillset}
          location={location}
          teams={teams}
          setTeams={setTeams}
        />
      </main>
    </>
  );
};

TeamPage.getInitialProps = async (ctx: NextPageContext) => {
  const { location, skillset } = ctx.query;
  return { location: location as string, skillset: skillset as string };
};

export default TeamPage;
