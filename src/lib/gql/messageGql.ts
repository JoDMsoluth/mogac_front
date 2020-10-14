import gql from 'graphql-tag';

const GET_ALL_MESSAGES = gql`
  query getAllMessages($page: Int!) {
    getAllMessages(page: $page) {
      docs {
        _id
        userId
        createdAt
        updatedAt
        isView
        title
        contents
        sendUser
        sendUserName
        sendUserEmail
      }
      totalIsView
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation createMessage($data: AddMessageRequestType!) {
    createMessage(data: $data) {
        _id
        userId
        createdAt
        updatedAt
        isView
        title
        contents
        sendUser
        sendUserName
        sendUserEmail
    }
  }
`;


const UPDATE_MESSAGE_ISVIEW = gql`
  mutation updateMessageIsView($id: String!) {
    updateMessageIsView(id: $id) {
        _id
        userId
        createdAt
        updatedAt
        isView
        title
        contents
        sendUser
        sendUserName
        sendUserEmail
    }
  }
`;

const messageGql = {
  GET_ALL_MESSAGES,
  CREATE_MESSAGE,
  UPDATE_MESSAGE_ISVIEW
};

export default messageGql;
