import { act, renderHook } from '@testing-library/react-hooks';
import { createQueryClientWrapper } from '../../../test-utils';

// import { createWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentDateMap } from '../types';

// a helper function to get the total number of appointments from an AppointmentDateMap object
const getAppointmentCount = (appointments: AppointmentDateMap) =>
  Object.values(appointments).reduce(
    (runningCount, appointmentsOnDate) =>
      runningCount + appointmentsOnDate.length,
    0,
  );

test('filter appointments by availability', async () => {
  // test goes here
  const { result, waitFor } = renderHook(useAppointments, {
    wrapper: createQueryClientWrapper(),
  });

  // 훅이 실행되면 서버의 응답을 기다려야 한다.
  // wait for the appointments to populate
  await waitFor(() => getAppointmentCount(result.current.appointments) > 0);

  const filteredAppointmentLength = getAppointmentCount(
    result.current.appointments,
  );
  // set to show all appointments
  act(() => result.current.setShowAll(true));

  // wait for the appointments to show more than when
  await waitFor(() => {
    return (
      getAppointmentCount(result.current.appointments) >
      filteredAppointmentLength
    );
  });
});
