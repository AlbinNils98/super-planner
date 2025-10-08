import gql from 'graphql-tag';

export const GET_TODO_LISTS_QUERY = gql`
  query GetTodoLists {
    getTodoLists {
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
    }`;