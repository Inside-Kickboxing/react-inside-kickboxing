export const formatDateTime = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);

  // Define months array
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Extract date components
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateTime.getDay()];
  const month = months[dateTime.getMonth()];
  const day = String(dateTime.getDate()).padStart(2, '0');
  const year = dateTime.getFullYear();

  // Extract time components
  let hours = dateTime.getHours();
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // Handle midnight

  // Format the time
  const formattedDateTime = `${dayOfWeek}, ${month} ${day} ${year} at ${hours}:${minutes} ${ampm}`;

  return formattedDateTime;
};
