import gql from 'graphql-tag';

const GET_ALL_NOTIFICATIONS = gql`
  query getAllNotifications($page: Int!) {
    getAllNotifications(page: $page) {
      docs {
        _id
        createdAt
        updatedAt
        userId
        title
        contents
        url
      }
    }
  }
`;

const CREATE_NOTIFICATION = gql`
  query createNotification($data: AddNotificationRequestType!) {
    createNotification(data: $data) {
      _id
      createdAt
      updatedAt
      userId
      title
      contents
      url
    }
  }
`;

const notificationGql = {
  GET_ALL_NOTIFICATIONS,
  CREATE_NOTIFICATION,
};

export default notificationGql;
