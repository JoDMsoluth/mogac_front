import gql from 'graphql-tag';
const ADD_TEAM = gql`
  mutation createTeam($data: AddTeamRequestType!) {
    createTeam(data: $data) {
      _id
      title
      desc
      location
      category
    }
  }
`;

const GET_ALL_TEAM = gql`
  query getAllTeam($data: PaginateArgType!) {
    getAllTeam(data: $data) {
      teams {
        _id
        title
        desc
        location
        category
      }
    }
  }
`;

const GET_FILTER_TEAM = gql`
  query getFilterTeam($data: FilterPaginateArgType!) {
    getFilterTeam(data: $data) {
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

const teamGql = {
  ADD_TEAM,
  GET_ALL_TEAM,
  GET_FILTER_TEAM,
};

export default teamGql;
