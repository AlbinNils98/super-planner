import ScreenTitle from '@/common/ScreenTitle';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { GetTodoListQuery } from '@/generated/graphql';
import { GET_TODO_LIST_QUERY } from '@/graphql/query/todo';
import { useQuery } from '@apollo/client/react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';


const TodoListScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listId = Number(id);
  if (isNaN(listId)) {
    throw new Error('Invalid id param');
  }
  const { data, loading, error } = useQuery<GetTodoListQuery>(GET_TODO_LIST_QUERY, { variables: { listId } });
  if (loading) return <ScreenTitle title='Loading...' />
  if (error) {
    Toast.show({ text1: error.message, type: 'error' })
  }
  const list = data?.getTodoList;

  return (
    <SafeAreaWrapper>
      <ScrollView>
        <ScreenTitle title={list?.name ?? ''} />
        {list?.items.map((item, key) => (
          <h1 key={key}>{item.text}</h1>
        ))}
      </ScrollView>
    </SafeAreaWrapper>
  )
}

export default TodoListScreen;