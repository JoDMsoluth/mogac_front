import gql from 'graphql-tag';
const ADD_SERIES = gql`
  mutation createSeries($data: AddSeriesRequestType!) {
    createSeries(data: $data) {
      _id
      title
      description
    }
  }
`;

const seriesGql = {
  ADD_SERIES,
};

export default seriesGql;
