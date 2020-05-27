import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

const loadAllCategory = () => {
  const { data, error, loading } = useQuery(Get_All_Category);
  const categoryArray = [];
  const skillsetData = {};

  if (error) {
    console.log('get category error');
  }

  if (data) {
    data.getAllCategory.map((category) => {
      categoryArray.push(category['name']);
      if (category.skillset.length > 0)
        skillsetData[category['name']] = category.skillset;
    });
  }

  return { categoryArray, skillsetData, loading };
};

const CategoryGql = {
  loadAllCategory,
};

export default CategoryGql;
