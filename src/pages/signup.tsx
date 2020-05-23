import React from 'react';
import { NextPage } from 'next';
import TeamHeader from '../component/team/TeamHeader';
import TeamListCard from '../component/team/TeamListCard';
import SignUp from '../component/home/signup/Signup';
import WithUser from '../utils/user/WithUser';

const SignUpPage: NextPage = () => {
  return (
    <>
      <main>
        <WithUser>
          <SignUp />
        </WithUser>
      </main>
    </>
  );
};

export default SignUpPage;
