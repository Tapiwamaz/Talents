const add_dates = (allTransactions) => {
  let temp = allTransactions.map((trans) => {
    return {
      ...trans,
      full_date: new Date(trans.year, trans.month - 1, trans.date),
    };
  });
  return temp;
};

const create_summary_data = (transactions) => {
  console.log(transactions);
  if (transactions.length === 0) return { statements: [], banks: [] };
  const summaryData = {
    statements: [],
    running_credits: 0.0,
    running_debits: 0.0,
    initial_balance: 0.0,
    running_charges: 0.0,
    running_balance: 0.0,
    number_of_transactions: transactions.length,
    start_date: transactions[transactions.length - 1].full_date,
    end_date: transactions[0].full_date,
    banks: [],
  };

  for (let i = transactions.length - 1; i >= 0; i--) {
    // statements
    if (!summaryData.statements.includes(transactions[i].statement_name)) {
      summaryData.statements.push(transactions[i].statement_name);
      if (transactions[i].credit) {
        summaryData.initial_balance =
          summaryData.initial_balance +
          transactions[i].balance -
          transactions[i].change;
      } else {
        summaryData.initial_balance =
          summaryData.initial_balance +
          transactions[i].balance +
          transactions[i].change;
      }
    }
    // credit
    if (transactions[i].credit) {
      summaryData.running_credits += transactions[i].change;
    }
    // debits and charges
    else {
      summaryData.running_debits += transactions[i].change;
      if (transactions[i].service_charge) {
        summaryData.running_charges += transactions[i].change;
      }
    }
  }
  summaryData.running_balance =
    summaryData.initial_balance +
    summaryData.running_credits -
    summaryData.running_debits;

  return summaryData;
};

const add_banks = (statements, summaryData) => {
  for (let i = 0; i < statements.length; i++) {
    if (!summaryData.banks.includes(statements[i].bank)) {
      summaryData.banks.push(statements[i].bank);
    }
  }
  return summaryData;
};

const ammend_summary_data = (summaryData) => {
  const months = {
    Januaury: "0",
    February: "1",
    March: "2",
    April: "3",
    May: "4",
    June: "5",
    July: "6",
    August: "7",
    September: "8",
    October: "9",
    November: "10",
    December: "11",
  };
  let tempDate = summaryData.start_date.split(" ");
  tempDate[1] = months[tempDate[1]];
  summaryData.start_date = new Date(tempDate[2], tempDate[1], tempDate[0]);

  tempDate = summaryData.end_date.split(" ");
  tempDate[1] = months[tempDate[1]];
  summaryData.end_date = new Date(tempDate[2], tempDate[1], tempDate[0]);
  return summaryData;
};
const join_summary_data = (arr1, arr2) => {
  // assuming arrays are two correct summaries of statements
  console.log(arr1, arr2);
  const summaryData = {
    statements: [...arr1.statements, ...arr2.statements],
    banks: [...arr1.banks, ...arr2.banks],
    running_credits: arr1.running_credits + arr2.running_credits,
    running_debits: arr1.running_debits + arr2.running_debits,
    initial_balance:
      arr1.start_date < arr2.start_date
        ? arr1.initial_balance
        : arr2.initial_balance,
    running_charges: arr1.running_charges + arr2.running_charges,
    running_balance: 0.0,
    number_of_transactions:
      arr1.number_of_transactions + arr2.number_of_transactions,
    start_date:
      arr1.start_date < arr2.start_date ? arr1.start_date : arr2.start_date,
    end_date: arr1.end_date > arr2.end_date ? arr1.end_date : arr2.end_date,
  };

  summaryData.running_balance =
    summaryData.initial_balance +
    summaryData.running_credits -
    summaryData.running_debits;

  console.log(summaryData);

  return summaryData;
};

const reorder_merged_transactions = (arr1, arr2) => {
  // arr1 and 2 are arrays of tranaction objects each with a date to be sorted by ascending order
  const result = [...arr1, ...arr2].sort((a, b) => b.full_date - a.full_date);
  return result;
};

export {
  create_summary_data,
  add_dates,
  join_summary_data,
  ammend_summary_data,
  reorder_merged_transactions,
  add_banks,
};
