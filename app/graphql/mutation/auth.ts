import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`;