// react
import React, { createContext, useEffect, useState } from "react";
// helpers
import {
  add_banks,
  add_dates,
  create_summary_data,
} from "../Helpers/TransactionArrayFormatters";
import { chooseColour } from "../Helpers/Colours";
// toasts
import toast from "react-hot-toast";
import { toInputFormat } from "../Helpers/DateTimeFormatters";
// OPENAI
import OpenAI from 'openai';


export const AppContext = createContext();

// console.log(process.env)

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = process.env.REACT_APP_OPENAI_KEY;

const api = new OpenAI({
  apiKey,
  baseURL,
  dangerouslyAllowBrowser: true,
});



const fetch_transactions = async (
  user,
  setAllTransactions,
  setFetchedTransactions,
  setLoaded,
  setTransactions,
  setStatements,
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
    const response2 = await fetch(
      `http://localhost:5000/api/statements/${user.sub}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const data2 = await response2.json();
    if (!response.ok || !response2.ok) {
      console.error(data);
      throw new Error("Something went wrong fetching transactions or statements");
    }

    if (data.transactions.length > 0 && data2.statements) {
      let temp = add_dates(data.transactions);
      setFetchedTransactions(temp);
      console.log(temp)
      setAllTransactions(temp);
      setTransactions(temp);
      // there will be a need for a more complex calc here
      setStatements(data2.statements);
      console.log(data2.statements)
      setSummaryData(add_banks( data2.statements,create_summary_data(temp)));
      setLoaded(true);
      setLoadingBooleans((prev) => {
        let temp = prev;
        temp.transactions = true;
        return temp;
      });
    }
  } catch (e) {
    console.error("Couldn't fetch transactions", e);
    setLoadingBooleans((prev) => {
      let temp = prev;
      temp.transactions = true;
      return temp;
    });
    setSummaryData({statements: []})
    // throw new Error("Error ", e);
  }
};

const fetch_budgets = async (
  user,
  setBudgetDict,
  setLoadingBooleans,
  setAllBudgets
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
      setBudgetDict((p) => {
        let budgetDict = {};
        budgets.forEach((b) => {
          budgetDict[b.budget_id] = { name: b.name, colour: b.colour };
        });
        return budgetDict;
      });

      let budgets2 = {};
      budgets.forEach((b) => {
        budgets2[b.budget_id] = b;
      });
      setAllBudgets(budgets2);

      setLoadingBooleans((prev) => {
        let t = prev;
        t.budgets = true;
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

const fetch_expenses = async (user,  setAllExpenses, setLoadingBooleans) => {
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
    sub: "117604033210378294446",
  });

  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [allTransactions, setAllTransactions] = useState([]);
  const [fetchedTransactions, setFetchedTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [uploadedTrans, setUploadedTrans] = useState([]);
  const [summaryData, setSummaryData] = useState({statements:[], banks:[]});
  const [statements,setStatements] = useState([])

  const [allBudgets, setAllBudgets] = useState({});
  const [allExpenses, setAllExpenses] = useState({});
  const [budgetDict, setBudgetDict] = useState({});
  const [loadingBooleans, setLoadingBooleans] = useState({
    budgets: false,
    expenses: false,
    transactions: false,
  });

  const [dark,setDark] = useState(false)


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
          setStatements,
          setSummaryData,
          setLoadingBooleans
        );
        fetch_budgets(user, setBudgetDict, setLoadingBooleans, setAllBudgets);
        fetch_expenses(user, setAllExpenses , setLoadingBooleans);
      }

    },
    [loggedIn, user]
  );

 
  
  const AIRequest = async ({systemPrompt,userPrompt}) => {
    const completion = await api.chat.completions.create({
      model: 'deepseek/deepseek-r1',
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });
  
    const response = completion.choices[0].message.content;
    
    console.log("Deepseak response",response)
    return response
  };
  


  const contextValue = {
    user,
    loggedIn,
    allTransactions,
    transactions,
    loaded,
    summaryData,
    fetchedTransactions,
    uploadedTrans,
    budgetDict,
    allExpenses,
    loadingBooleans,
    allBudgets,
    dark,
    statements,
    setStatements,
    setDark,
    setAllBudgets,
    setLoadingBooleans,
    setUser,
    setLoggedIn,
    setAllTransactions,
    setTransactions,
    setUploadedTrans,
    setLoaded,
    setSummaryData,
    setFetchedTransactions,
    setAllExpenses,
    setBudgetDict,
    AIRequest
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
