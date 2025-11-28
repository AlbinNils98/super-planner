import Text from '@/common/Text'
import PlanBox from '@/components/PlanBox'
import PlanBoxItem from '@/components/PlanBoxItem'
import { DeleteTodoListMutation, DeleteTodoListMutationVariables, GetTodoListsQuery } from '@/generated/graphql'
import { DELETE_TODO_LIST_MUTATION } from '@/graphql/mutation/todo'
import { GET_TODO_LISTS_QUERY } from '@/graphql/query/todo'
import { useMutation, useQuery } from '@apollo/client/react'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'

const TodoBox = () => {
  const router = useRouter();
  const { data } = useQuery<GetTodoListsQuery>(GET_TODO_LISTS_QUERY);

  const [deleteTodoListMutation] = useMutation<DeleteTodoListMutation, DeleteTodoListMutationVariables>(DELETE_TODO_LIST_MUTATION, {
    refetchQueries: [GET_TODO_LISTS_QUERY],
    onError: (error) => Toast.show({ text1: error.message, type: 'error' }),
  });

  const sortedLists = data?.getTodoLists
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleSelection = (id: number) => {
    router.push({ pathname: '/(protected)/todoList/[id]', params: { id: id } })
  }

  const handleAdd = () => {
    // Handle adding todo list
    router.push({
      pathname: '/(protected)/createItem/[type]',
      params: { type: 'todo' }
    })
  }

  const handleDelete = (listId: number) => {
    deleteTodoListMutation({ variables: { listId } })
  }

  return (
    <PlanBox title="Todo lists" onAddPress={handleAdd}>
      {!data?.getTodoLists.length && <Text>No todo lists yet</Text>}
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

export default TodoBox