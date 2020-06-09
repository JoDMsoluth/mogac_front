import react, { useCallback, useState } from 'react';
import UserGql from '../../../lib/gql/userGql';
import { Button } from '@material-ui/core';
import { useUser } from '../../../utils/user/UserProvide';
import { useQuery } from '@apollo/react-hooks';

interface CheckButtonProps {
  setCheckEmail: any;
  checkEmail: boolean;
}

export default function CheckName({
  setCheckEmail,
  checkEmail,
}: CheckButtonProps) {
  const { state } = useUser();
  const { email } = state;

  if (email.length < 5 || email.length > 50) {
    return <div>50글자제한</div>;
  }
  // 이미 인증을 받았으면 리렌더링시 다시 서버로 체크하지 않는다.
  const { data, error, loading } = checkEmail
    ? {
        data: {
          checkUniqueEmail: true,
        },
        error: false,
        loading: false,
      }
    : useQuery(UserGql.CHECK_UNIQUE_EMAIL, {
        variables: { email },
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
    // 체크되지 않은 상태에서만 변화 시킨다.
    if (data.checkUniqueEmail && !checkEmail) setCheckEmail(true);
  }
  return (
    <>
      {data?.checkUniqueEmail || checkEmail ? (
        <div>사용가능</div>
      ) : (
        <div>사용불가능</div>
      )}
    </>
  );
}
