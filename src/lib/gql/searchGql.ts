import gql from 'graphql-tag';

const GET_SEARCH_TEAM = gql`
  query totalSearchTeam($searchWord: String!, $page: Float!) {
    totalSearchTeam(searchWord: $searchWord, page: $page) {
      teams {
        _id
        title
        desc
        location
        category
      }
      lastPage
    }
  }
`;

const GET_SEARCH_USER = gql`
  query totalSearchUser($searchWord: String!, $page: Float!) {
    totalSearchUser(searchWord: $searchWord, page: $page) {
      users {
        _id
        name
        email
        image_url
        ableSkillSet
        ableLocation
        level
      }
      lastPage
    }
  }
`;

const GET_SEARCH_BLOG = gql`
  query totalSearchPost($searchWord: String!, $page: Float!) {
    totalSearchPost(searchWord: $searchWord, page: $page) {
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
      lastPage
    }
  }
`;

const searchGql = { GET_SEARCH_TEAM, GET_SEARCH_BLOG, GET_SEARCH_USER };

export default searchGql;
