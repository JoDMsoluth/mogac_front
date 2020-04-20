import React from 'react';
import { NextPage } from 'next';
import LoginForm from '../component/home/LoginForm';

const IndexPage: NextPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default IndexPage;
