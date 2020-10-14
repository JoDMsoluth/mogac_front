import { useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import notificationGql from '../../../../lib/gql/notificationGql';
import palette from '../../../../lib/pallete';
import formatDate from '../../../../lib/utils/dateFormat';

export default function NotificationList({ data }) {
  console.log('noti data', data);
  
  const [updateNotificationIsView] = useMutation(notificationGql.UPDATE_NOTIFICATION_ISVIEW);
  
  const clickNotification = useCallback((notification) => () => {
    updateNotificationIsView({
      variables : {
        id : notification._id
      }
    })
  }, []);


  return (
    <>
      {data.map((notification) => (
        <>
          <Link href="/team">
            <a onClick={clickNotification(notification)}>
              <S.Container>
                <div>{formatDate(notification?.createdAt) || '날짜'}</div>
                <div>{notification?.title || '제목'}</div>
                <div>{notification?.contents || '내용'}</div>
              </S.Container>
            </a>
          </Link>
        </>
      ))}
    </>
  );
}

const S: any = {};

S.Container = styled.div`
  background: ${palette.gray3};
  color: ${palette.gray7};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  overflow: auto;
  margin: 1rem 1rem;
`;
