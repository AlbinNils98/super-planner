import gql from 'graphql-tag';

export const DELETE_TODO_LIST_MUTATION = gql`
mutation DeleteTodoList($listId: Int!){
  deleteTodoList(listId: $listId)
}
`;