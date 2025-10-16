import gql from 'graphql-tag';

export const GET_ROUTINES_QUERY = gql`
query GetRoutineLists{
  getRoutineLists{
  id
  name
  completed
  createdAt
  updatedAt
  }
}
`;