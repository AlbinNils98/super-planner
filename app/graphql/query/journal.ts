import gql from 'graphql-tag';

export const GET_JOURNALS_QUERY = gql`
query GetJournals{
  getJournals{
  id
  name
  createdAt
  updatedAt
  }
}
`;