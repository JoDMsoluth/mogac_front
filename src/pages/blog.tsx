import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TeamHeader from '../component/team/TeamHeader';
import TeamListCard from '../component/team/TeamListCard';
import { useAuth } from '../utils/auth/AuthProvider';

export default function BlogPage() {
  const [data, logout] = useAuth();
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
