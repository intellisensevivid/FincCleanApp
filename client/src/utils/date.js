export const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Format the date as needed, for example: "DD/MM/YYYY"
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};
export const formatTime = (timeString) => {
  const time = new Date(timeString);
  // Format the time as needed, for example: "HH:MM:SS"
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return formattedTime;
};
