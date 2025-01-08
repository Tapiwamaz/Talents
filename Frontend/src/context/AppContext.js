import React, { createContext, useEffect, useState } from "react";
import {
  add_dates,
  create_summary_data,
} from "../Helpers/TransactionArrayFormatters";
import toast from "react-hot-toast";

export const AppContext = createContext();

const fetch_transactions = async (
  user,
  setAllTransactions,
  setFetchedTransactions,
  setLoaded,
  setTransactions,
  setSummaryData
) => {
  toast(`Hi, ${user.name}`, {
    icon: '👋',
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

const AppContextProvider = (props) => {
  const [user, setUser] = useState({
    name: "Tapiwa",
    surname: "Mazarura",
    picture: "https://picsum.photos/200",
    email: "mazarura@gmail.com",
    sub: "117604033210378294446",
  });
  // const [user,setUser] = useState({});

  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [allTransactions, setAllTransactions] = useState([]);
  const [fetchedTransactions, setFetchedTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [uploadedTrans, setUploadedTrans] = useState([]);
  const [summaryData, setSummaryData] = useState({});


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
      }
    },
    [loggedIn,user]
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
    setUser,
    setLoggedIn,
    setAllTransactions,
    setTransactions,
    setUploadedTrans,
    setLoaded,
    setSummaryData,
    setFetchedTransactions
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
