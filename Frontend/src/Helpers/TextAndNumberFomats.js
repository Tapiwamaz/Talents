const toCurrency = (number) => {
  return "R "+ number.toLocaleString({style:"currency"})
};

export { toCurrency };
