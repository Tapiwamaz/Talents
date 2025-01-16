// react
import React, { createContext, useEffect, useState } from "react";
// helpers
import {
  add_dates,
  create_summary_data,
} from "../Helpers/TransactionArrayFormatters";
import { chooseColour } from "../Helpers/Colours";
// toasts
import toast from "react-hot-toast";
import { toInputFormat } from "../Helpers/DateTimeFormatters";

export const AppContext = createContext();

const fetch_transactions = async (
  user,
  setAllTransactions,
  setFetchedTransactions,
  setLoaded,
  setTransactions,
  setSummaryData,
  setLoadingBooleans
) => {
  toast(`Welcome back, ${user.name}`, {
    icon: "👋",
  });
  try {
    const response = await fetch(
      `http://localhost:5000/api/transactions/${user.sub}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      throw new Error("Something went wrong fetching transactions");
    }
    console.log("Successfully fetched transactions", data.transactions);
    if (data.transactions.length > 0) {
      let temp = add_dates(data.transactions);
      setFetchedTransactions(temp);
      setAllTransactions(temp);
      setTransactions(temp);
      // there will be a need for a more complex calc here
      setSummaryData(create_summary_data(temp));
      setLoaded(true);
    }
  } catch (e) {
    console.error("Couldn't fetch transactions", e);

    // throw new Error("Error ", e);
  }
};

const fetch_budgets = async (
  user,
  setAllBudgets,
  setBudgetDict,
  setLoadingBooleans
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/budgets/${user.sub}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      let budgets = data.Budgets;
      budgets.forEach((b, index) => (b.colour = chooseColour(index)));
      setAllBudgets(budgets);
      setBudgetDict((p) => {
        let budgetDict = {};
        budgets.forEach((b) => {
          budgetDict[b.budget_id] = { name: b.name, colour: b.colour };
        });
        return budgetDict;
      });

      setLoadingBooleans((prev) => {
        let t = prev;
        t.budgets = true;
        console.log(t)
        return t;
      });
      
    }
  } catch (e) {
    console.log("Error fetching budgets", e);
    setLoadingBooleans((prev) => {
      let t = prev;
      t.budgets = true;
     
      return t;
    });
  }
};

const fetch_expenses = async (user, setAllExpenses, setLoadingBooleans) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/expenses/${user.sub}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      let expenses = data.Expenses;

      let months = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };
      expenses.forEach((b) => {
        let dateArr = b.created_at.split(",")[1].trim().split(" ").slice(0, 3);
        b.expense_date = toInputFormat(
          new Date(dateArr[2], months[dateArr[1]], dateArr[0])
        );
      });
      console.log(expenses);
      setAllExpenses(expenses);
      setLoadingBooleans((prev) => {
        let t = prev;
        t.expenses = true;
        return t;
      });
    }
  } catch (e) {
    console.log("Error fetching budgets", e);
    setLoadingBooleans((prev) => {
      let t = prev;
      t.expenses = true;
      return t;
    });
  }
};

const AppContextProvider = (props) => {
  const [user, setUser] = useState({
    name: "Tapiwa",
    surname: "Mazarura",
    picture: "https://picsum.photos/200",
    email: "mazarura@gmail.com",
    sub: "103347596905743041374",
  });

  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [allTransactions, setAllTransactions] = useState([]);
  const [fetchedTransactions, setFetchedTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [uploadedTrans, setUploadedTrans] = useState([]);
  const [summaryData, setSummaryData] = useState({});

  const [allBudgets, setAllBudgets] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [budgetDict, setBudgetDict] = useState({});
  const [loadingBooleans, setLoadingBooleans] = useState({
    budgets: false,
    expenses: false,
    transactions: false,
  });

  useEffect(
    (e) => {
      // trigger for loading transactions on login

      if (loggedIn) {
        // fetch all transactions
        fetch_transactions(
          user,
          setAllTransactions,
          setFetchedTransactions,
          setLoaded,
          setTransactions,
          setSummaryData
        );
        fetch_budgets(user, setAllBudgets, setBudgetDict,setLoadingBooleans);
        fetch_expenses(user, setAllExpenses, setLoadingBooleans);
      }
    },
    [loggedIn, user]
  );

  const contextValue = {
    user,
    loggedIn,
    allTransactions,
    transactions,
    loaded,
    summaryData,
    fetchedTransactions,
    uploadedTrans,
    allBudgets,
    budgetDict,
    allExpenses,
    loadingBooleans,
    setLoadingBooleans,
    setUser,
    setLoggedIn,
    setAllTransactions,
    setTransactions,
    setUploadedTrans,
    setLoaded,
    setSummaryData,
    setFetchedTransactions,
    setAllBudgets,
    setAllExpenses,
    setBudgetDict,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
