import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TeamHeader from '../component/team/TeamHeader';
import TeamListCard from '../component/team/TeamListCard';

export default function Album() {
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <TeamHeader />
        <TeamListCard />
      </main>
    </React.Fragment>
  );
}
