/**
 * @param {{ start: Date, end: Date }[]} reservations - list of reservations
 *
 * @returns true if any 2 reservations conflict
 *   - reservations conflict if their times overlap in any way
 *   - reservations DO NOT conflict if they are just touching each other (reservation1.end === reservation2.start)
 */

export const isScheduleConflict = (reservations) => {
  if (!reservations || !reservations?.length) return false;

  const sortedReservations = reservations?.sort((a, b) =>
    a.start > b.start ? 1 : -1
  );

  let reservationsWithConflicts = [];

  for (let i = 0; i < sortedReservations.length; i++) {
    if (sortedReservations[i - 1]?.end > sortedReservations[i]?.start) {
      reservationsWithConflicts.push(sortedReservations[i]);
    }
  }

  return reservationsWithConflicts?.length ? true : false;
};

/**
 * @param {Date} date - selected date
 * @param {Date} startDate - start date of reservation
 * @param {Date} endDate - end date of reservation
 *
 * @returns true if date === startDate or date == endDate without time comparing
 */

export const isDateBetween = (date, startDate, endDate) => {
  const compareDate = new Date(date);
  const compareStartDate = new Date(startDate);
  const compareEndDate = new Date(endDate);

  const dateWithoutTime = new Date(compareDate.getTime());
  const startDateWithoutTime = new Date(compareStartDate.getTime());
  const endDateWithoutTime = new Date(compareEndDate.getTime());

  dateWithoutTime.setUTCHours(0, 0, 0, 0);
  startDateWithoutTime.setUTCHours(0, 0, 0, 0);
  endDateWithoutTime.setUTCHours(0, 0, 0, 0);

  if (
    dateWithoutTime.getTime() === startDateWithoutTime.getTime() ||
    dateWithoutTime.getTime() === endDateWithoutTime.getTime()
  ) {
    return true;
  }

  return false;
};
