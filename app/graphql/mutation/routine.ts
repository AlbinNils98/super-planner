import gql from 'graphql-tag';

export const DELETE_ROUTINE_LIST_MUTATION = gql`
mutation DeleteRoutineList($listId: Int!){
  deleteRoutineList(listId: $listId)
}
`;