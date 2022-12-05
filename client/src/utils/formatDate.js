export const formatDate = (date) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.substring(0, 4);
  const num = Number(date.substring(5, 7));
  return `${month[num - 1]}  ${year}`;
};
