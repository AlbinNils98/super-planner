import gql from 'graphql-tag';

export const DELETE_TODO_LIST_MUTATION = gql`
mutation DeleteTodoList($listId: Int!){
  deleteTodoList(listId: $listId)
}
`;

export const CREATE_TODO_LIST_MUTATION = gql`
mutation CreateTodoList($name: String!){
  createTodoList(name: $name) {
    id
  }
}
`;