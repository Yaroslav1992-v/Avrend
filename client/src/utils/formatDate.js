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
export function transformDate(data) {
  const date = new Date(data);
  const dateNow = new Date();
  const yearDif = dateNow.getFullYear() - date.getFullYear();
  if (yearDif === 0) {
    const dayDif = dateNow.getDate() - date.getDate();
    if (dayDif === 0) {
      const hourDif = dateNow.getHours() - date.getHours();
      if (hourDif === 0) {
        const minutesDif = dateNow.getMinutes() - date.getMinutes();

        if (minutesDif >= 0 && minutesDif < 5) return "1 minute ago";
        if (minutesDif >= 5 && minutesDif < 10) return "5 minutes ago";
        if (minutesDif >= 10 && minutesDif < 30) {
          return "10 minutes ago";
        }
        return "30  minutes ago";
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }

    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })}`;
  }
  return (
    date.getFullYear() + "." + (date.getMonth() + 1) + "_" + date.getDate()
  );
}
