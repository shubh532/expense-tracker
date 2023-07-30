//return current numeric month and year e.g 2023-05 
export function getCurrentYearAndMonth() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1 and pad with leading zero if necessary
  return `${year}-${month}`;
}

//return alpha numeric date e.g 19 july 2023, this function take whole date like "2023-05-12"

export function getDateInString(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  return `${day} ${month} ${year}`;
}
// this function use to convert full date into month and year eg.  19 july 2023 => 2023-07

export function getNumericYearAndMonth(date) {

  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1 and pad with leading zero if necessary

  return `${year}-${month}`;
}


export function disableDatesAfterToday() {
  const today = new Date().toISOString().split('T')[0];
  return today
}


export function getWeekDates() {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const currentDate = new Date();
  const lastSevenDays = [];


  for (let i = 0; i < 7; i++) {
    const dateOfLastSevenDays = new Date(currentDate);
    dateOfLastSevenDays.setDate(currentDate.getDate() - i);
    lastSevenDays.push(formatDate(dateOfLastSevenDays));
  }
  return lastSevenDays
}