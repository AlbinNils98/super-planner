import Text from '@/common/Text'
import PlanBox from '@/components/PlanBox'
import PlanBoxItem from '@/components/PlanBoxItem'
import { GetTodoListsQuery } from '@/generated/graphql'
import { GET_TODO_LISTS_QUERY } from '@/graphql/query/todo'
import { useQuery } from '@apollo/client/react'

const TodoBox = () => {

  const { data } = useQuery<GetTodoListsQuery>(GET_TODO_LISTS_QUERY);

  const sortedLists = data?.getTodoLists
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <PlanBox title="Todo lists" onAddPress={() => { }}>
      {!data?.getTodoLists.length && <Text>No todo lists yet</Text>}
      {sortedLists?.map((list) => (
        <PlanBoxItem key={list.id} title={list.name} />
      ))}
    </PlanBox>
  )
}

export default TodoBox