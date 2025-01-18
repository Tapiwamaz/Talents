const toInputFormat = (fullDate) => {
  let date = fullDate.getDate().toString();
  let month = (fullDate.getMonth() + 1).toString();
  let year = fullDate.getFullYear().toString();
  if (date.length < 2) {
    date = "0" + date;
  }
  if (month.length < 2) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + date;
};

const toCuteFormat = (fullDate) => {
  let months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  let date = fullDate.getDate().toString();
  let month = months[fullDate.getMonth()];
  let year = fullDate.getFullYear().toString();
  return date + " " + month + " " + year 
};

export { toInputFormat,toCuteFormat };
