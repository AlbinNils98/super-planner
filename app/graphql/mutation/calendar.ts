import gql from 'graphql-tag';

export const DELETE_CALENDAR_MUTATION = gql`
mutation DeleteCalendar($calendarId: Int!){
  deleteCalendar(calendarId: $calendarId)
}
`;