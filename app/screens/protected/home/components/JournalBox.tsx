import Text from '@/common/Text';
import PlanBox from '@/components/PlanBox';
import PlanBoxItem from '@/components/PlanBoxItem';
import { DeleteJournalMutation, DeleteJournalMutationVariables, GetJournalsQuery } from '@/generated/graphql';
import { DELETE_JOURNAL_MUTATION } from '@/graphql/mutation/journal';
import { GET_JOURNALS_QUERY } from '@/graphql/query/journal';
import { useMutation, useQuery } from '@apollo/client/react';
import Toast from 'react-native-toast-message';

const JournalBox = () => {

  const { data } = useQuery<GetJournalsQuery>(GET_JOURNALS_QUERY);

  const [deleteJournalMutation] = useMutation<DeleteJournalMutation, DeleteJournalMutationVariables>(DELETE_JOURNAL_MUTATION, {
    refetchQueries: [GET_JOURNALS_QUERY],
    onError: (error) => Toast.show({ text1: error.message, type: 'error' }),
  })

  const sortedLists = data?.getJournals
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleSelection = (id: number) => {
    //router.push({ pathname: "/journal/[id]", params: { id: id } })
  }

  const handleAdd = () => {
    // Handle adding todo list
  }

  const handleDelete = (journalId: number) => {
    deleteJournalMutation({ variables: { journalId } })
  }

  return (
    <PlanBox title="Journals" onAddPress={() => { }}>
      {!data?.getJournals.length && <Text>No journals yet</Text>}
      {sortedLists?.map((journal) => (
        <PlanBoxItem
          key={journal.id}
          title={journal.name}
          onPress={() => handleSelection(journal.id)}
          onDelete={() => handleDelete(journal.id)}
        />
      ))}
    </PlanBox>
  )
}

export default JournalBox;