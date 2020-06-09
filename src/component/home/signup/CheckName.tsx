import react, { useCallback, useState } from 'react';
import UserGql from '../../../lib/gql/userGql';
import { Button } from '@material-ui/core';
import { useUser } from '../../../utils/user/UserProvide';
import { useQuery } from '@apollo/react-hooks';

interface CheckButtonProps {
  setCheckName: any;
  checkName: boolean;
}

export default function CheckName({
  setCheckName,
  checkName,
}: CheckButtonProps) {
  const { state } = useUser();
  const { name } = state;

  if (name.length < 1 || name.length > 20) {
    return <div>20글자제한</div>;
  }
  const { data, error, loading } = checkName
    ? {
        data: {
          checkUniqueName: true,
        },
        error: false,
        loading: false,
      }
    : useQuery(UserGql.CHECK_UNIQUE_NAME, {
        variables: { name },
      });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('check email error', error);
    return <div></div>;
  }
  if (data) {
    console.log('data', data);
    if (data.checkUniqueName && !checkName) setCheckName(true);
  }
  return (
    <>
      {data?.checkUniqueName || checkName ? <p>사용가능</p> : <p>사용불가능</p>}
    </>
  );
}
