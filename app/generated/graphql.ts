import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: string; output: string; }
};

export type CalendarBasicDto = {
  __typename?: 'CalendarBasicDto';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CalendarDto = {
  __typename?: 'CalendarDto';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  items: Array<CalendarItemDto>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CalendarItemDto = {
  __typename?: 'CalendarItemDto';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['Date']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type JournalBasicDto = {
  __typename?: 'JournalBasicDto';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type JournalDto = {
  __typename?: 'JournalDto';
  createdAt: Scalars['DateTime']['output'];
  entries: Array<JournalEntryDto>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type JournalEntryDto = {
  __typename?: 'JournalEntryDto';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCalendar: CalendarDto;
  addCalendarItem: CalendarItemDto;
  addJournal: JournalDto;
  addJournalEntry: JournalEntryDto;
  addRoutineListItem: RoutineListItemDto;
  addTodoListItem: TodoListItemDto;
  createRoutineList: RoutineListDto;
  createTodoList: TodoListDto;
  deleteCalendar: Scalars['Boolean']['output'];
  deleteCalendarItem: Scalars['Boolean']['output'];
  deleteJournal: Scalars['Boolean']['output'];
  deleteJournalEntry: Scalars['Boolean']['output'];
  deleteRoutineList: Scalars['Boolean']['output'];
  deleteRoutineListItem: Scalars['Boolean']['output'];
  deleteTodoList: Scalars['Boolean']['output'];
  deleteTodoListItem: Scalars['Boolean']['output'];
  signIn: Scalars['String']['output'];
  signUp: Scalars['Boolean']['output'];
  testMutation: Scalars['String']['output'];
  updateCalendar: CalendarDto;
  updateCalendarItem: CalendarItemDto;
  updateJournal: JournalDto;
  updateJournalEntry: JournalEntryDto;
  updateRoutineList: RoutineListDto;
  updateTodoList: TodoListDto;
  updateTodoListItem: TodoListItemDto;
};


export type MutationAddCalendarArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddCalendarItemArgs = {
  calendarId: Scalars['Int']['input'];
  date: Scalars['Date']['input'];
  text: Scalars['String']['input'];
};


export type MutationAddJournalArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddJournalEntryArgs = {
  journalId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};


export type MutationAddRoutineListItemArgs = {
  listId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
  timeOfDay: Scalars['String']['input'];
};


export type MutationAddTodoListItemArgs = {
  listId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};


export type MutationCreateRoutineListArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateTodoListArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteCalendarArgs = {
  calendarId: Scalars['Int']['input'];
};


export type MutationDeleteCalendarItemArgs = {
  itemId: Scalars['Int']['input'];
};


export type MutationDeleteJournalArgs = {
  journalId: Scalars['Int']['input'];
};


export type MutationDeleteJournalEntryArgs = {
  entryId: Scalars['Int']['input'];
};


export type MutationDeleteRoutineListArgs = {
  listId: Scalars['Int']['input'];
};


export type MutationDeleteRoutineListItemArgs = {
  itemId: Scalars['Int']['input'];
};


export type MutationDeleteTodoListArgs = {
  listId: Scalars['Int']['input'];
};


export type MutationDeleteTodoListItemArgs = {
  itemId: Scalars['Int']['input'];
};


export type MutationSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateCalendarArgs = {
  calendarId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCalendarItemArgs = {
  itemId: Scalars['Int']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateJournalArgs = {
  journalId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateJournalEntryArgs = {
  entryId: Scalars['Int']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateRoutineListArgs = {
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  listId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTodoListArgs = {
  listId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTodoListItemArgs = {
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  itemId: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getCalendar: CalendarDto;
  getCalendars: Array<CalendarBasicDto>;
  getJournal: JournalDto;
  getJournals: Array<JournalBasicDto>;
  getRoutineList: RoutineListDto;
  getRoutineLists: Array<RoutineListBasicDto>;
  getTodoList: TodoListDto;
  getTodoLists: Array<TodoListBasicDto>;
  me?: Maybe<UserDto>;
  testQuery: Scalars['String']['output'];
};


export type QueryGetCalendarArgs = {
  calendarId: Scalars['Int']['input'];
};


export type QueryGetJournalArgs = {
  journalId: Scalars['Int']['input'];
};


export type QueryGetRoutineListArgs = {
  listId: Scalars['Int']['input'];
};


export type QueryGetTodoListArgs = {
  listId: Scalars['Int']['input'];
};

export type RoutineListBasicDto = {
  __typename?: 'RoutineListBasicDto';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RoutineListDto = {
  __typename?: 'RoutineListDto';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  items: Array<RoutineListItemDto>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RoutineListItemDto = {
  __typename?: 'RoutineListItemDto';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  timeOfDay: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TodoListBasicDto = {
  __typename?: 'TodoListBasicDto';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TodoListDto = {
  __typename?: 'TodoListDto';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  items: Array<TodoListItemDto>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TodoListItemDto = {
  __typename?: 'TodoListItemDto';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  username?: Maybe<Scalars['String']['output']>;
};

export type SignInMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: string };

export type SignUpMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: boolean };

export type DeleteCalendarMutationVariables = Exact<{
  calendarId: Scalars['Int']['input'];
}>;


export type DeleteCalendarMutation = { __typename?: 'Mutation', deleteCalendar: boolean };

export type DeleteJournalMutationVariables = Exact<{
  journalId: Scalars['Int']['input'];
}>;


export type DeleteJournalMutation = { __typename?: 'Mutation', deleteJournal: boolean };

export type DeleteRoutineListMutationVariables = Exact<{
  listId: Scalars['Int']['input'];
}>;


export type DeleteRoutineListMutation = { __typename?: 'Mutation', deleteRoutineList: boolean };

export type DeleteTodoListMutationVariables = Exact<{
  listId: Scalars['Int']['input'];
}>;


export type DeleteTodoListMutation = { __typename?: 'Mutation', deleteTodoList: boolean };

export type GetCalendarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCalendarsQuery = { __typename?: 'Query', getCalendars: Array<{ __typename?: 'CalendarBasicDto', id: number, name: string, createdAt: string, updatedAt: string }> };

export type GetJournalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJournalsQuery = { __typename?: 'Query', getJournals: Array<{ __typename?: 'JournalBasicDto', id: number, name: string, createdAt: string, updatedAt: string }> };

export type GetRoutineListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoutineListsQuery = { __typename?: 'Query', getRoutineLists: Array<{ __typename?: 'RoutineListBasicDto', id: number, name: string, completed: boolean, createdAt: string, updatedAt: string }> };

export type GetTodoListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodoListsQuery = { __typename?: 'Query', getTodoLists: Array<{ __typename?: 'TodoListBasicDto', id: number, name: string, createdAt: string, updatedAt: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserDto', username?: string | null } | null };


export const SignInDocument = gql`
    mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password)
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!) {
  signUp(username: $username, email: $email, password: $password)
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const DeleteCalendarDocument = gql`
    mutation DeleteCalendar($calendarId: Int!) {
  deleteCalendar(calendarId: $calendarId)
}
    `;
export type DeleteCalendarMutationFn = Apollo.MutationFunction<DeleteCalendarMutation, DeleteCalendarMutationVariables>;

/**
 * __useDeleteCalendarMutation__
 *
 * To run a mutation, you first call `useDeleteCalendarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCalendarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCalendarMutation, { data, loading, error }] = useDeleteCalendarMutation({
 *   variables: {
 *      calendarId: // value for 'calendarId'
 *   },
 * });
 */
export function useDeleteCalendarMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCalendarMutation, DeleteCalendarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCalendarMutation, DeleteCalendarMutationVariables>(DeleteCalendarDocument, options);
      }
export type DeleteCalendarMutationHookResult = ReturnType<typeof useDeleteCalendarMutation>;
export type DeleteCalendarMutationResult = Apollo.MutationResult<DeleteCalendarMutation>;
export type DeleteCalendarMutationOptions = Apollo.BaseMutationOptions<DeleteCalendarMutation, DeleteCalendarMutationVariables>;
export const DeleteJournalDocument = gql`
    mutation DeleteJournal($journalId: Int!) {
  deleteJournal(journalId: $journalId)
}
    `;
export type DeleteJournalMutationFn = Apollo.MutationFunction<DeleteJournalMutation, DeleteJournalMutationVariables>;

/**
 * __useDeleteJournalMutation__
 *
 * To run a mutation, you first call `useDeleteJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJournalMutation, { data, loading, error }] = useDeleteJournalMutation({
 *   variables: {
 *      journalId: // value for 'journalId'
 *   },
 * });
 */
export function useDeleteJournalMutation(baseOptions?: Apollo.MutationHookOptions<DeleteJournalMutation, DeleteJournalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteJournalMutation, DeleteJournalMutationVariables>(DeleteJournalDocument, options);
      }
export type DeleteJournalMutationHookResult = ReturnType<typeof useDeleteJournalMutation>;
export type DeleteJournalMutationResult = Apollo.MutationResult<DeleteJournalMutation>;
export type DeleteJournalMutationOptions = Apollo.BaseMutationOptions<DeleteJournalMutation, DeleteJournalMutationVariables>;
export const DeleteRoutineListDocument = gql`
    mutation DeleteRoutineList($listId: Int!) {
  deleteRoutineList(listId: $listId)
}
    `;
export type DeleteRoutineListMutationFn = Apollo.MutationFunction<DeleteRoutineListMutation, DeleteRoutineListMutationVariables>;

/**
 * __useDeleteRoutineListMutation__
 *
 * To run a mutation, you first call `useDeleteRoutineListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoutineListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoutineListMutation, { data, loading, error }] = useDeleteRoutineListMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useDeleteRoutineListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoutineListMutation, DeleteRoutineListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoutineListMutation, DeleteRoutineListMutationVariables>(DeleteRoutineListDocument, options);
      }
export type DeleteRoutineListMutationHookResult = ReturnType<typeof useDeleteRoutineListMutation>;
export type DeleteRoutineListMutationResult = Apollo.MutationResult<DeleteRoutineListMutation>;
export type DeleteRoutineListMutationOptions = Apollo.BaseMutationOptions<DeleteRoutineListMutation, DeleteRoutineListMutationVariables>;
export const DeleteTodoListDocument = gql`
    mutation DeleteTodoList($listId: Int!) {
  deleteTodoList(listId: $listId)
}
    `;
export type DeleteTodoListMutationFn = Apollo.MutationFunction<DeleteTodoListMutation, DeleteTodoListMutationVariables>;

/**
 * __useDeleteTodoListMutation__
 *
 * To run a mutation, you first call `useDeleteTodoListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoListMutation, { data, loading, error }] = useDeleteTodoListMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useDeleteTodoListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoListMutation, DeleteTodoListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoListMutation, DeleteTodoListMutationVariables>(DeleteTodoListDocument, options);
      }
export type DeleteTodoListMutationHookResult = ReturnType<typeof useDeleteTodoListMutation>;
export type DeleteTodoListMutationResult = Apollo.MutationResult<DeleteTodoListMutation>;
export type DeleteTodoListMutationOptions = Apollo.BaseMutationOptions<DeleteTodoListMutation, DeleteTodoListMutationVariables>;
export const GetCalendarsDocument = gql`
    query GetCalendars {
  getCalendars {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCalendarsQuery__
 *
 * To run a query within a React component, call `useGetCalendarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalendarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalendarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCalendarsQuery(baseOptions?: Apollo.QueryHookOptions<GetCalendarsQuery, GetCalendarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCalendarsQuery, GetCalendarsQueryVariables>(GetCalendarsDocument, options);
      }
export function useGetCalendarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCalendarsQuery, GetCalendarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCalendarsQuery, GetCalendarsQueryVariables>(GetCalendarsDocument, options);
        }
export function useGetCalendarsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCalendarsQuery, GetCalendarsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCalendarsQuery, GetCalendarsQueryVariables>(GetCalendarsDocument, options);
        }
export type GetCalendarsQueryHookResult = ReturnType<typeof useGetCalendarsQuery>;
export type GetCalendarsLazyQueryHookResult = ReturnType<typeof useGetCalendarsLazyQuery>;
export type GetCalendarsSuspenseQueryHookResult = ReturnType<typeof useGetCalendarsSuspenseQuery>;
export type GetCalendarsQueryResult = Apollo.QueryResult<GetCalendarsQuery, GetCalendarsQueryVariables>;
export const GetJournalsDocument = gql`
    query GetJournals {
  getJournals {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetJournalsQuery__
 *
 * To run a query within a React component, call `useGetJournalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJournalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJournalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetJournalsQuery(baseOptions?: Apollo.QueryHookOptions<GetJournalsQuery, GetJournalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJournalsQuery, GetJournalsQueryVariables>(GetJournalsDocument, options);
      }
export function useGetJournalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJournalsQuery, GetJournalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJournalsQuery, GetJournalsQueryVariables>(GetJournalsDocument, options);
        }
export function useGetJournalsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetJournalsQuery, GetJournalsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetJournalsQuery, GetJournalsQueryVariables>(GetJournalsDocument, options);
        }
export type GetJournalsQueryHookResult = ReturnType<typeof useGetJournalsQuery>;
export type GetJournalsLazyQueryHookResult = ReturnType<typeof useGetJournalsLazyQuery>;
export type GetJournalsSuspenseQueryHookResult = ReturnType<typeof useGetJournalsSuspenseQuery>;
export type GetJournalsQueryResult = Apollo.QueryResult<GetJournalsQuery, GetJournalsQueryVariables>;
export const GetRoutineListsDocument = gql`
    query GetRoutineLists {
  getRoutineLists {
    id
    name
    completed
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetRoutineListsQuery__
 *
 * To run a query within a React component, call `useGetRoutineListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoutineListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoutineListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRoutineListsQuery(baseOptions?: Apollo.QueryHookOptions<GetRoutineListsQuery, GetRoutineListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoutineListsQuery, GetRoutineListsQueryVariables>(GetRoutineListsDocument, options);
      }
export function useGetRoutineListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoutineListsQuery, GetRoutineListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoutineListsQuery, GetRoutineListsQueryVariables>(GetRoutineListsDocument, options);
        }
export function useGetRoutineListsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRoutineListsQuery, GetRoutineListsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoutineListsQuery, GetRoutineListsQueryVariables>(GetRoutineListsDocument, options);
        }
export type GetRoutineListsQueryHookResult = ReturnType<typeof useGetRoutineListsQuery>;
export type GetRoutineListsLazyQueryHookResult = ReturnType<typeof useGetRoutineListsLazyQuery>;
export type GetRoutineListsSuspenseQueryHookResult = ReturnType<typeof useGetRoutineListsSuspenseQuery>;
export type GetRoutineListsQueryResult = Apollo.QueryResult<GetRoutineListsQuery, GetRoutineListsQueryVariables>;
export const GetTodoListsDocument = gql`
    query GetTodoLists {
  getTodoLists {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTodoListsQuery__
 *
 * To run a query within a React component, call `useGetTodoListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodoListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodoListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodoListsQuery(baseOptions?: Apollo.QueryHookOptions<GetTodoListsQuery, GetTodoListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodoListsQuery, GetTodoListsQueryVariables>(GetTodoListsDocument, options);
      }
export function useGetTodoListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodoListsQuery, GetTodoListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodoListsQuery, GetTodoListsQueryVariables>(GetTodoListsDocument, options);
        }
export function useGetTodoListsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTodoListsQuery, GetTodoListsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTodoListsQuery, GetTodoListsQueryVariables>(GetTodoListsDocument, options);
        }
export type GetTodoListsQueryHookResult = ReturnType<typeof useGetTodoListsQuery>;
export type GetTodoListsLazyQueryHookResult = ReturnType<typeof useGetTodoListsLazyQuery>;
export type GetTodoListsSuspenseQueryHookResult = ReturnType<typeof useGetTodoListsSuspenseQuery>;
export type GetTodoListsQueryResult = Apollo.QueryResult<GetTodoListsQuery, GetTodoListsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;