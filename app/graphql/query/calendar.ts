import gql from 'graphql-tag';

export const GET_CALENDARS_QUERY = gql`
query GetCalendars{
  getCalendars{
  id
  name
  createdAt
  updatedAt
  }
}
`;