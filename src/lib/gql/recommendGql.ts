import gql from 'graphql-tag';

const CREATE_RECOMMEND = gql`
  mutation createRecommend($data: AddRecommendRequestType!) {
    createRecommend(data: $data) {
        _id
        userId
        level
        title
        contents
        skillName
    }
  }
`;

const GET_ALL_RECOMMENDS = gql`
   query getAllRecommends($page: Int!, $skillName: String!) {
    getAllRecommends(page: $page, skillName: $skillName) {
      docs {
        _id
        userId
        level
        title
        contents
        skillName
        recommendedBy {
            _id
            name
            email
            gender
            image_url
        }
      }
    }
  }
`;

const recommendGql = { 
    CREATE_RECOMMEND,
    GET_ALL_RECOMMENDS
 };

export default recommendGql;
