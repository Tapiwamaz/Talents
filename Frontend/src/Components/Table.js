import React, { useEffect, useState } from "react";
// css
import "./Table.css";
// helpers
import { toCurrency, toMonth } from "../Helpers/TextAndNumberFomats";
// icons
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// Functions
const loadMore = (arraySize, setNewEnd) => {
  setNewEnd((prev) => {
    if (prev >= arraySize) {
      return prev;
    }
    return prev + 10;
  });
};

const loadLess = (setNewEnd) => {
  setNewEnd((prev) => {
    if (prev <= 10) {
      return prev;
    }
    return prev - 10;
  });
};

export const Table = ({ transactions, searchBool, summaryData }) => {
  const [endOfTransactions, setEndOfTransactions] = useState(10);
  let displayTransactions = [];
  displayTransactions = transactions.slice(
    endOfTransactions - 10,
    endOfTransactions
  );

  useEffect(() => {
    setEndOfTransactions(10);
  }, [searchBool]);

  return (
    <main className="table-main">
      <table className="table-transactions">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Credit/Debit</th>
            <th>Service fee</th>
          </tr>
        </thead>
        <tbody>
          {displayTransactions.map((t, index) => (
            <tr
              key={index}
              className={
                t.credit
                  ? "light-green"
                  : t.service_charge
                  ? "light-grey"
                  : "light-red"
              }
            >
              <td>
                {t.date + " " + toMonth(parseInt(t.month)) + " " + t.year}{" "}
              </td>
              <td>{t.details} </td>
              <td> {toCurrency(t.change)} </td>
              <td>{t.credit ? "Credit" : "Debit"}</td>
              <td>{t.service_charge ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <aside className="table-aside-main">
        <section className="table-aside">
          <div className="pagination">
            <button
              className="table-button"
              onClick={() => {
                loadLess(setEndOfTransactions);
              }}
            >
              <ArrowLeftIcon width={15} />
            </button>
            <button
              className="table-button"
              onClick={() => {
                loadMore(transactions.length, setEndOfTransactions);
              }}
            >
              <ArrowRightIcon width={15} />
            </button>
          </div>
          <h2>
            Key <p className="key-hint">(Hover over transaction to see)</p>
          </h2>
          <legend>
            <div className="key-block">
              <div className="rect" />
              <p>Money into account</p>
            </div>
            <div className="key-block">
              <div className="rect" />
              <p>Money out of account</p>
            </div>
            <div className="key-block">
              <div className="rect" />
              <p>Bank charge</p>
            </div>
          </legend>
        </section>

        <section className="table-aside">
          <h2>Key points</h2>
          <p>Initial Balance: {toCurrency(summaryData.initial_balance)}</p>
          <p>Money In: {toCurrency(summaryData.running_credits)}</p>
          <p>Money Out: {toCurrency(summaryData.running_debits)}</p>
          <p>Bank fees: {toCurrency(summaryData.running_charges)}</p>
          <p>Balance: {toCurrency(summaryData.running_balance)}</p>
          <br></br>
        </section>
      </aside>
    </main>
  );
};
