import gql from 'graphql-tag';

const GET_ALL_NOTIFICATIONS = gql`
  query getAllNotifications($page: Int!) {
    getAllNotifications(page: $page) {
      docs {
        _id
        createdAt
        updatedAt
        userId
        isView
        title
        contents
        url
      }
      totalIsView
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
      isView
      contents
      url
    }
  }
`;


const UPDATE_NOTIFICATION_ISVIEW = gql`
  mutation updateNotificationIsView($id: String!) {
    updateNotificationIsView(id: $id) {
        _id
        createdAt
        updatedAt
        userId
        isView
        title
        contents
        url
    }
    
  }
`;

const notificationGql = {
  GET_ALL_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  UPDATE_NOTIFICATION_ISVIEW
};

export default notificationGql;
