const toInputFormat = (fullDate) => {
  let date = fullDate.getDate().toString();
  let month = (fullDate.getMonth()+1).toString();
  let year = fullDate.getFullYear().toString();
  if (date.length < 2) {
    date = "0" + date;
  }
  if (month.length < 2) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + date;
};

export {toInputFormat}