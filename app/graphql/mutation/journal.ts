import gql from 'graphql-tag';

export const DELETE_JOURNAL_MUTATION = gql`
mutation DeleteJournal($journalId: Int!){
  deleteJournal(journalId: $journalId)
}
`;