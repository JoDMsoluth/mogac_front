import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

// email, password
const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(req: { email: $email, password: $password }) {
      jwt
      user {
        name
      }
    }
  }
`;

const CHECK_UNIQUE_EMAIL = gql`
  query checkUniqueEmail($email: String!) {
    checkUniqueEmail(email: $email)
  }
`;

const CHECK_UNIQUE_NAME = gql`
  query checkUniqueName($name: String!) {
    checkUniqueName(name: $name)
  }
`;

const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

/* {
        $email: String!,
        $password:String!,
        $name: String!,
        $phone: String!, 
        $address: String!,
        $birth: String!,
        $img_url: String!
    }
    */
const SIGNUP = gql`
  mutation signup($data: SignupRequestType!) {
    signup(data: $data) {
      name
    }
  }
`;

const UPLOAD_PROFILE_IMAGE = gql`
  mutation uploadProfileImage($file: Upload!) {
    uploadProfileImage(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

const UPDATE_USER_POSITION = gql`
  mutation updateUserPosition($position: [Float!]!) {
    updateUserPosition(position: $position) {
      _id
      name
      image_url
      x_pos
      y_pos
    }
  }
`;

// const UploadProfileImage = gql`
//   mutation uploadProfileImage() {
//     uploadProfileImage()
//   }
// `;

// TODO: Set-up your real user query here
const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      name
      image_url
      email
      _id
      ableSkillSet
    }
  }
`;

const GET_USER_BY_ID = gql`
  query getUserById {
    getUserById(id: "5e9937bba6e38b2a900d4886") {
      phone
    }
  }
`;

const GET_ALL_USER_BY_SEARCH = gql`
  query getAllUserBySearch(
    $ableSkillSet: [String!]!
    $ableLocation: [String!]!
  ) {
    getAllUserBySearch(
      ableSkillSet: $ableSkillSet
      ableLocation: $ableLocation
    ) {
      _id
      name
      email
      image_url
      ableSkillSet
      ableLocation
      level
    }
  }
`;

const GET_ALL_SERIES_BY_USER = gql`
  query getAllSeriesByUser {
    getAllSeriesByUser {
      series {
        title
        _id
      }
    }
  }
`;
const GET_NEAR_USERS_BY_MATCHING = gql`
  query getNearUsersByMatching(
    $ableSkillSet: [String!]!
    $ableLocation: [String!]!
    $x_pos: Float!
    $y_pos: Float!
  ) {
    getNearUsersByMatching(
      ableSkillSet: $ableSkillSet
      ableLocation: $ableLocation
      x_pos: $x_pos
      y_pos: $y_pos
    ) {
      _id
      name
      email
      image_url
      ableSkillSet
      ableLocation
      x_pos
      y_pos
    }
  }
`;
const IS_AUTH = gql`
  query isAuth {
    isAuth
  }
`;

const getAllUserBySearch = (ableLocation, ableSkillSet) => {
  if (ableSkillSet.length > 0 && ableLocation.length > 0) {
    const { data, error } = useQuery(GET_ALL_USER_BY_SEARCH, {
      variables: { ableSkillSet, ableLocation },
    });
    if (error) {
      console.log('get posts error', error);
    }
    if (data) {
      console.log('data', data);
      return data.getAllUserBySearch;
    }
  }
  return;
};

const checkUniqueEmail = (email: string) => {
  const { data, error } = useQuery(CHECK_UNIQUE_EMAIL, {
    variables: { email },
  });
  if (error) {
    console.log('check email error', error);
  }
  if (data) {
    console.log('data', data);
    return data;
  }
  return false;
};

const checkUniqueName = (name: string) => {
  const { data, error } = useQuery(CHECK_UNIQUE_NAME, {
    variables: { name },
  });
  if (error) {
    console.log('check email error', error);
  }
  if (data) {
    console.log('data', data);
    return data.checkUniqueName;
  }
  return false;
};

const UserGql = {
  LOGIN,
  LOGOUT,
  SIGNUP,
  UPLOAD_PROFILE_IMAGE,
  GET_ALL_SERIES_BY_USER,
  GET_CURRENT_USER,
  GET_USER_BY_ID,
  IS_AUTH,
  UPDATE_USER_POSITION,
  getAllUserBySearch,
  GET_NEAR_USERS_BY_MATCHING,
  CHECK_UNIQUE_EMAIL,
  CHECK_UNIQUE_NAME,
};

export default UserGql;
