import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_ALL_POSTS = gql`
  query getAllPosts($page: Int!) {
    getAllPosts(page: $page) {
      posts {
        _id
        createdAt
        title
        desc
        contents
        views
        category
        tags
        postedBy {
          name
          image_url
        }
      }
    }
  }
`;

const ADD_POST = gql`
  mutation createPost($data: AddPostRequestType!) {
    createPost(data: $data) {
      title
    }
  }
`;

const getAllPosts = (page: number) => {
  console.log('gql page', typeof page);
  const { data, error } = useQuery(GET_ALL_POSTS, {
    variables: { page },
  });

  if (error) {
    console.log('get posts error', error);
  }

  if (data) {
    console.log('data', data);
    return data.getAllPosts.posts;
  }
};

const postGql = {
  ADD_POST,
  getAllPosts,
};

export default postGql;
