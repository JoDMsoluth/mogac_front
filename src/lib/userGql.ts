import gql from 'graphql-tag';

// email, password
const LOGIN = gql`
  mutation login($req: loginReq!) {
    login(req: $req) {
      jwt
      user
    }
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
  mutation signup($req: signupReq!) {
    signup(req: $req) {
      user {
        email
      }
    }
  }
`;

// TODO: Set-up your real user query here
const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      name
    }
  }
`;

const UserGql = {
  LOGIN,
  LOGOUT,
  SIGNUP,
  GET_CURRENT_USER,
};

export default UserGql;
