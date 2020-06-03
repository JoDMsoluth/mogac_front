import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useWrite } from '../../utils/write/WriteProvide';

const GET_ALL_COMMENT_IN_POST = gql`
  query getAllCommentInPost($postId: String!) {
    getAllCommentInPost(postId: $postId) {
      _id
      contents
      reComments
      commentBy {
        image_url
        name
        _id
      }
    }
  }
`;

const GET_ALL_RECOMMENT_IN_POSTS = gql`
  query getAllReCommentInComment($commentId: String!) {
    getAllReCommentInComment(commentId: $commentId) {
      contents
      commentBy {
        image_url
        name
        _id
      }
    }
  }
`;

const CREATE_COMMET_IN_POST = gql`
  mutation createComment($data: AddCommentRequestType!) {
    createComment(data: $data) {
      contents
      reComments
      commentBy {
        _id
        name
        image_url
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

//data:{parentComment:"5ed4757bd38c986d647d2ef8", contents:"첫 대댓글", secret:false}
const CREATE_RECOMMENT_IN_POST = gql`
  mutation createReComment($data: AddReCommentRequestType!) {
    createReComment(data: $data) {
      contents
      commentBy {
        _id
        name
        image_url
      }
    }
  }
`;

const DELETE_RECOMMENT_IN_POST = gql`
  mutation deleteComment($reCommentId: String!) {
    deleteComment(reCommentId: $reCommentId) {
      _id
    }
  }
`;

const UPDATE_COMMENT_IN_POST = gql`
  mutation updateComment($data: UpdateCommentRequestType!) {
    updateComment(data: $data) {
      _id
      contents
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

const getAllReCommentInComment = (commentId: string) => {
  const { data, error } = useQuery(GET_ALL_RECOMMENT_IN_POSTS, {
    variables: { commentId },
  });

  if (error) {
    console.log('get posts error', error);
  }

  if (data) {
    console.log('data', data);
    return data.getAllReCommentInComment;
  }
};

const CommentGql = {
  getAllCommentInPost,
  getAllReCommentInComment,
  CREATE_COMMET_IN_POST,
  CREATE_RECOMMENT_IN_POST,
  DELETE_COMMENT_IN_POST,
  DELETE_RECOMMENT_IN_POST,
  UPDATE_COMMENT_IN_POST,
};

export default CommentGql;
