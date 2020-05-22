import gql from 'graphql-tag';

const Get_All_Category = gql`
  query getAllCategory {
    getAllCategory {
      name
      skillset {
        skill
      }
    }
  }
`;

const CategoryGql = {
  Get_All_Category,
};

export default CategoryGql;
