import React, { useState } from "react";
// css
import "./Table.css";
// helpers
import { toCurrency } from "../Helpers/TextAndNumberFomats";

// Functions
const loadMore = (arraySize, setNewEnd) => {
  setNewEnd((prev) => {
    if (prev >= arraySize) {
      return prev;
    }
    return prev + 20;
  });
};

const loadLess = (setNewEnd) => {
  setNewEnd((prev) => {
    if ( prev <= 20) {
      return prev;
    }
    return prev - 20;
  });
};

export const Table = ({ transactions }) => {
  const [endOfTransactions, setEndOfTransactions] = useState(20);
  return (
    <main className="table-main">
      
      <table className="table-transactions">
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Credit/Debit</th>
          <th>Service fee</th>
        </tr>
        {transactions
          .slice(endOfTransactions - 20, endOfTransactions)
          .map((t, index) => (
            <tr key={index} className={t.credit ? "light-green" : (t.service_charge ? "light-grey" : "light-red")}>
              <td>{t.id + 1}.</td>
              <td>{t.date + " " + t.month} </td>
              <td>{t.details} </td>
              <td> {toCurrency(t.change)} </td>
              <td>{t.credit ? "Credit" : "Debit"}</td>
              <td>{t.service_charge ? "Yes" : "No"}</td>
            </tr>
          ))}
      </table>


      <aside className="table-aside">
        <legend>
          This should be for the key for the table
        </legend>
        <button
        className="table-button"
          onClick={() => {
            loadLess( setEndOfTransactions);
          }}
        >
          Load previous 20
        </button>
        <button
        className="table-button"
          onClick={() => {
            loadMore(transactions.length, setEndOfTransactions);
          }}
        >
          Load next 20
        </button>
      </aside>
    </main>
  );
};
