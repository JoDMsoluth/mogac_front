import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const Add_Post = gql`
  query createPost {
    createPost {
      name
      skillset {
        skill
      }
    }
  }
`;

const postGql = {
  Add_Post,
};

export default postGql;
