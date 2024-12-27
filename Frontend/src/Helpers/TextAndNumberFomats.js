const toCurrency = (number) => {
  return "R " + number.toLocaleString({ style: "currency" });
};

const toMonth = (number) => {
  if (number > 12 || number < 1) {
    throw new Error("Invalid number to cast to Month")
  }
  const months = [
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

  return months[number]
};

export { toCurrency ,toMonth};
