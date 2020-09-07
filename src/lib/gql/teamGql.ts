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

const INVITE_USER_TO_TEAM = gql`
  mutation inviteUserToTeam($userId: String!, $teamId: String!) {
    inviteUserToTeam(userId: $userId, teamId: $teamId) {
      users
    }
  }
`;

const GET_ALL_TEAM_BY_USER = gql`
  query getAllTeamsByUser {
    getAllTeamsByUser {
      _id
      adminId
      title
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
        users
        adminId
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
        users
        adminId
      }
      lastPage
    }
  }
`;

const teamGql = {
  ADD_TEAM,
  GET_ALL_TEAM,
  GET_FILTER_TEAM,
  GET_ALL_TEAM_BY_USER,
  INVITE_USER_TO_TEAM,
};

export default teamGql;
