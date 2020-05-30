import gql from 'graphql-tag';

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
      _id
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

const IS_AUTH = gql`
  query isAuth {
    isAuth
  }
`;

const UserGql = {
  LOGIN,
  LOGOUT,
  SIGNUP,
  UPLOAD_PROFILE_IMAGE,
  GET_ALL_SERIES_BY_USER,
  GET_CURRENT_USER,
  GET_USER_BY_ID,
  IS_AUTH,
};

export default UserGql;
