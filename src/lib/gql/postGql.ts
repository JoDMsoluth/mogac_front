import gql from 'graphql-tag';

const Add_Post = gql`
  mutation createPost($data: AddPostRequestType!) {
    createPost(data: $data) {
      title
    }
  }
`;

const postGql = {
  Add_Post,
};

export default postGql;
