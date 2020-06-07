import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useWrite } from '../../utils/write/WriteProvide';

const GET_ALL_COMMENT_IN_POST = gql`
  query getAllCommentInPost($postId: String!) {
    getAllCommentInPost(postId: $postId) {
      _id
      contents
      commentBy {
        image_url
        name
        ableSkillSet
        _id
      }
    }
  }
`;

const CREATE_COMMET_IN_POST = gql`
  mutation createComment($data: AddCommentRequestType!) {
    createComment(data: $data) {
      _id
      contents
      commentBy {
        _id
        name
        image_url
        ableSkillSet
      }
    }
  }
`;

const DELETE_COMMENT_IN_POST = gql`
  mutation deleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      _id
    }
  }
`;

const UPDATE_COMMENT_IN_POST = gql`
  mutation updateComment($data: UpdateCommentRequestType!) {
    updateComment(data: $data) {
      _id
      contents
      commentBy {
        _id
        ableSkillSet
        name
        image_url
      }
    }
  }
`;

const getAllCommentInPost = (postId: string) => {
  const { data, error, loading } = useQuery(GET_ALL_COMMENT_IN_POST, {
    variables: { postId },
  });

  if (error) {
    console.log('get posts error', error);
  }

  if (data) {
    console.log('data', data);
    return data.getAllCommentInPost;
  }
};

const CommentGql = {
  getAllCommentInPost,
  CREATE_COMMET_IN_POST,
  DELETE_COMMENT_IN_POST,
  UPDATE_COMMENT_IN_POST,
};

export default CommentGql;
