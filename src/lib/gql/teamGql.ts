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
  mutation inviteUserToTeam($userId: ObjectId!, $teamId: ObjectId!) {
    inviteUserToTeam(userId: $userId, teamId: $teamId) {
      users
    }
  }
`;

const GET_ALL_TEAM_BY_USER = gql`
  query getAllTeamsByUser($userId: String!, $page: Int!) {
    getAllTeamsByUser(userId: $userId, page: $page) {
      teams {
        _id
        title
        desc
        location
        category
        users
        adminId
        adminName
        adminEmail
      }
    }
  }
`;

const GET_ALL_TEAM_BY_ME = gql`
  query getAllTeamsByMe {
    getAllTeamsByMe {
      _id
      adminId
      adminName
      adminEmail
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
        adminName
        adminEmail
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
        adminName
        adminEmail
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
  GET_ALL_TEAM_BY_ME,
  INVITE_USER_TO_TEAM,
};

export default teamGql;
