import { Button } from '@/common/Button';
import ScreenTitle from '@/common/ScreenTitle';
import { TextInput } from '@/common/TextInput';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { CreateTodoListMutation, CreateTodoListMutationVariables } from '@/generated/graphql';
import { CREATE_TODO_LIST_MUTATION } from '@/graphql/mutation/todo';
import { GET_TODO_LISTS_QUERY } from '@/graphql/query/todo';
import { useMutation } from '@apollo/client/react';
import { useLocalSearchParams, useRouter } from 'expo-router/build/hooks';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

const CreateItemScreen = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();
  const [name, setName] = useState<string | null>();

  const typeMap: Record<string, string> = {
    todo: 'todo list',
    calendar: 'calendar',
    journal: 'journal',
    routine: 'routine list',
  };

  const typeName = typeMap[type] ?? '';

  const [createTodoListMutation] = useMutation<CreateTodoListMutation, CreateTodoListMutationVariables>(CREATE_TODO_LIST_MUTATION, {
    refetchQueries: [GET_TODO_LISTS_QUERY],
    onCompleted: (data) => router.replace({ pathname: '/(protected)/todoList/[id]', params: { id: data.createTodoList.id } }),
    onError: (error) => Toast.show({ text1: error.message, type: 'error' }),
  })

  type ItemType = keyof typeof typeMap;
  const mutationMap: Record<ItemType, (name: string) => void> = {
    todo: (name) => createTodoListMutation({ variables: { name } }),
    // later add:
    // calendar: (name) => createCalendarMutation({ variables: { name } }),
    // journal: (name) => createJournalMutation({ variables: { name } }),
    // routine: (name) => createRoutineListMutaiton({variables: {name} })
  };

  const handleCreate = async () => {
    if (!name) return;

    const mutationFn = mutationMap[type];
    if (mutationFn) {
      mutationFn(name);
    } else {
      console.warn(`No mutation defined for type ${type}`)
    }
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <View style={styles.form}>
          <View style={{ gap: 10 }}>
            <ScreenTitle title={`Name your ${typeName}`} style={{ marginBottom: 0 }} />
            <TextInput placeholder={`My awesome ${typeName}...`} onChangeText={setName} />
          </View>
        </View>
        {name && <Button title='Create' onPress={handleCreate} />}
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'space-between'
  }
});

export default CreateItemScreen;