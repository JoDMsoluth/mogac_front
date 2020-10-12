import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_ALL_POSTS = gql`
  query getAllPosts($page: Int!) {
    getAllPosts(page: $page) {
      lastPage
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
          _id
          name
          image_url
        }
      }
    }
  }
`;
const GET_ALL_POSTS_BY_USER = gql`
  query getAllPostsByUser($userId: String!, $page: Int!) {
    getAllPostsByUser(userId: $userId, page: $page) {
      _id
      name
      image_url
      posts {
        _id
        createdAt
        title
        desc
        contents
        views
        category
        tags
      }
    }
  }
`;
const GET_POST_FOR_VIEW = gql`
  query getPostForView($postId: String!) {
    getPost(postId: $postId) {
      title
      desc
      contents
      createdAt
      followUser {
        _id
      }
      postedBy {
        _id
        name
        image_url
      }
      series {
        _id
        title
        description
      }
      tags
    }
  }
`;

// 따로 시리즈만 불러오는 gql 추가하자
/*const GET_POST_FOR_VIEW_NOT_SERIES = gql`
  query getPostForView($postId: String!) {
    getPost(postId: $postId) {
    
  }
`;*/

const ADD_POST = gql`
  mutation createPost($data: AddPostRequestType!) {
    createPost(data: $data) {
      title
    }
  }
`;

const GET_ALL_POSTS_BY_USER_FOR_POST_VIEW = gql`
  query getAllPostsForPostView($userId: String!) {
    getAllPostsForPostView(userId: $userId) {
      posts {
        _id
        title
        desc
        createdAt
      }
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
    return {
      lastPage: data.getAllPosts.lastPage,
      posts: data.getAllPosts.posts,
    };
  }
};

const getAllPostsByUserForPostView = (userId: string) => {
  console.log('userId', userId);
  const { data, error } = useQuery(GET_ALL_POSTS_BY_USER_FOR_POST_VIEW, {
    variables: { userId },
  });
  if (error) {
    console.log('get posts error', error);
  }
  if (data) {
    console.log('data', data);
    return data.getAllPostsForPostView.posts;
  }
};

const getPostForView = (postId: string) => {
  console.log('gql postId', typeof postId);
  const { data, error } = useQuery(GET_POST_FOR_VIEW, {
    variables: { postId },
  });

  if (error) {
    console.log('get posts error', error);
  }

  if (data) {
    console.log('data', data);
    return data.getPost;
  }
};

const postGql = {
  ADD_POST,
  GET_ALL_POSTS_BY_USER,
  getAllPosts,
  getPostForView,
  getAllPostsByUserForPostView,
};

export default postGql;
