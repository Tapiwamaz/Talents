import React, { useState } from "react";
import "./BudgetCards.css";

const handleChange = (change, type, setExpense) => {
  setExpense((prev) => {
    let temp = { ...prev };
    temp[type] = change;
    return temp;
  });
};

const AddExpense = ({ budget }) => {
  const [expense, setExpense] = useState({});
  return (
    <main className="expense-create-main">
      <h2>
        Add new <strong className="budget-name">{budget.name}</strong> expense
      </h2>
      
      <text className="subtitle">Flesh out you budget by making a list of expenses.</text>
      <section className="expense-create-holder">
        <div className="expense-create-div">
          <label className="expense-create-label">Description</label>
          <input
            value={expense.description || ""}
            placeholder="Bread"
            className="budget-create-input"
            onChange={(e) =>
              handleChange(e.target.value, "description", setExpense)
            }
          />
        </div>
        <div className="budget-create-separator" />
        <div className="expense-create-div">
          <label className="expense-create-label">Amount</label>
          <input
            type="number"
            placeholder="100"
            min={1}
            max={100000}
            value={expense.amount || ""}
            onChange={(e) => handleChange(e.target.value, "amount", setExpense)}
            className="budget-create-input"
          />
        </div>
      </section>
      <div className="budget-create-separator-horiz" />
      <section className="budget-create-btn-holder">
        <button className="budget-create-btn">Clear</button>
        <button className="budget-create-btn">Add</button>
      </section>
    </main>
  );
};

export default AddExpense;
