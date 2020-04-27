import React from 'react';
import { NextPage } from 'next';
import TeamHeader from '../component/team/TeamHeader';
import TeamListCard from '../component/team/TeamListCard';

const IndexPage: NextPage = () => {
  return (
    <>
      <main>
        <TeamHeader />
        <TeamListCard />
      </main>
    </>
  );
};

export default IndexPage;
