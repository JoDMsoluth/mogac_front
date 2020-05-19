import React from 'react';
import { NextPage } from 'next';
import TeamHeader from '../component/team/TeamHeader';
import TeamListCard from '../component/team/TeamListCard';
import SignUp from '../component/home/signup/Signup';

const SignUpPage: NextPage = () => {
  return (
    <>
      <main>
        <SignUp />
      </main>
    </>
  );
};

export default SignUpPage;
