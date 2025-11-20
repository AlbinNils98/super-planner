import Text from '@/common/Text';
import PlanBox from '@/components/PlanBox';
import PlanBoxItem from '@/components/PlanBoxItem';
import { DeleteCalendarMutation, DeleteCalendarMutationVariables, GetCalendarsQuery } from '@/generated/graphql';
import { DELETE_CALENDAR_MUTATION } from '@/graphql/mutation/calendar';
import { GET_CALENDARS_QUERY } from '@/graphql/query/calendar';
import { useMutation, useQuery } from '@apollo/client/react';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

const CalendarBox = () => {
  const router = useRouter();
  const { data } = useQuery<GetCalendarsQuery>(GET_CALENDARS_QUERY);
  const [deleteCalendarMutation] = useMutation<DeleteCalendarMutation, DeleteCalendarMutationVariables>(DELETE_CALENDAR_MUTATION, {
    refetchQueries: [GET_CALENDARS_QUERY],
    onError: (error) => Toast.show({ text1: error.message, type: 'error' }),
  })

  const sortedLists = data?.getCalendars
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleSelection = (id: number) => {
    //router.push({ pathname: "/calendar/[id]", params: { id: id } })
  }

  const handleAdd = () => {
    router.push({
      pathname: '/(protected)/createItem/[type]',
      params: { type: 'calendar' }
    })
  }

  const handleDelete = (calendarId: number) => {
    deleteCalendarMutation({ variables: { calendarId } })
  }

  return (
    <PlanBox title="Calendars" onAddPress={handleAdd}>
      {!data?.getCalendars.length && <Text>No calendars yet</Text>}
      {sortedLists?.map((calendar) => (
        <PlanBoxItem
          key={calendar.id}
          title={calendar.name}
          onPress={() => handleSelection(calendar.id)}
          onDelete={() => handleDelete(calendar.id)}
        />
      ))}
    </PlanBox>
  )
}

export default CalendarBox;