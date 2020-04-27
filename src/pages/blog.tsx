import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TeamHeader from '../component/team/TeamHeader';
import TeamListCard from '../component/team/TeamListCard';

export default function BlogPage() {
  return (
    <>
      <CssBaseline />
      <main>
        <TeamHeader />
        <TeamListCard />
      </main>
    </>
  );
}
