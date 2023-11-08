export const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
};
  
