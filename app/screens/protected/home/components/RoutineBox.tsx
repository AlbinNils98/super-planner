import Text from '@/common/Text';
import PlanBox from '@/components/PlanBox';
import PlanBoxItem from '@/components/PlanBoxItem';
import { DeleteRoutineListMutation, DeleteRoutineListMutationVariables, GetRoutineListsQuery } from '@/generated/graphql';
import { DELETE_ROUTINE_LIST_MUTATION } from '@/graphql/mutation/routine';
import { GET_ROUTINES_QUERY } from '@/graphql/query/routine';
import { useMutation, useQuery } from '@apollo/client/react';
import Toast from 'react-native-toast-message';

const RoutineBox = () => {

  const { data } = useQuery<GetRoutineListsQuery>(GET_ROUTINES_QUERY);

  const [deleteRoutineListMutation] = useMutation<DeleteRoutineListMutation, DeleteRoutineListMutationVariables>(DELETE_ROUTINE_LIST_MUTATION, {
    refetchQueries: [GET_ROUTINES_QUERY],
    onError: (error) => Toast.show({ text1: error.message, type: 'error' }),
  })

  const sortedLists = data?.getRoutineLists
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleAdd = () => {

  }

  const handleSelection = (id: number) => {
    //router.push({ pathname: "/routine/[id]", params: { id: id } })
  }

  const handleDelete = (listId: number) => {
    deleteRoutineListMutation({ variables: { listId } })
  }

  return (
    <PlanBox title="Routines" onAddPress={handleAdd}>
      {!data?.getRoutineLists.length && <Text>No routines yet</Text>}
      {sortedLists?.map((list) => (
        <PlanBoxItem
          key={list.id}
          title={list.name}
          onPress={() => handleSelection(list.id)}
          onDelete={() => handleDelete(list.id)} />
      ))}
    </PlanBox>
  )
}

export default RoutineBox;