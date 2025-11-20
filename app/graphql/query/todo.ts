import gql from 'graphql-tag';

export const GET_TODO_LISTS_QUERY = gql`
query GetTodoLists {
  getTodoLists {
    id
    name
    createdAt
    updatedAt
  }
}`;

export const GET_TODO_LIST_QUERY = gql`
  query GetTodoList($listId: Int!){
    getTodoList(listId: $listId){
      id
      name
      items {
        id
        text
        completed
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;