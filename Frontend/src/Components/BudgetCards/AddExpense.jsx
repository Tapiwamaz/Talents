import React, { useContext, useState } from "react";
import "./BudgetCards.css";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { toInputFormat } from "../../Helpers/DateTimeFormatters";

const sendExpense = async ({
  budget,
  newExpense,
  setNewExpense,
  setAllExpenses,
  setAllBudgets,
}) => {
  const formData = {
    budget_id: budget.budget_id,
    description: newExpense.description,
    amount: newExpense.amount,
  };
  try {
    const response = await fetch("https://talents-backend-27b727379837.herokuapp.com/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Error creating expense");
    }

    const data = await response.json();
    if (!data.expense) {
      throw new Error("Something went wrong creating expense");
    }
    // console.log(data);
    formData.expense_id = data.expense.expense_id;
    formData.expense_date = toInputFormat(new Date());
    setNewExpense({});
    setAllExpenses((prev) => [formData, ...prev]);

    // add to the budgets total_expense

    setAllBudgets((prev) => {
      prev[budget.budget_id].total_expenses =
        parseFloat(prev[budget.budget_id].total_expenses) +
        parseFloat(formData.amount) / 2;

      return prev;
    });
  

    return response;
  } catch (e) {
    console.log(e);
    throw new Error("Error creating budget", e);
  }
};

const handleSubmit = async ({
  budget,
  newExpense,
  setAllExpenses,
  setNewExpense,
  setAllBudgets,
}) => {
  if (
    !budget ||
    !budget.budget_id ||
    !newExpense ||
    !newExpense.amount ||
    !newExpense.description
  ) {
    toast.error("Please fill in all the fields");
    return;
  }

  const myPromise = sendExpense({
    budget: budget,
    newExpense: newExpense,
    setAllExpenses: setAllExpenses,
    setNewExpense: setNewExpense,
    setAllBudgets: setAllBudgets,
  });

  toast.promise(myPromise, {
    loading: "Saving expense",
    success: "Expense saved!",
    error: "Expense could not be saved",
  });
};

const handleChange = (change, type, setExpense) => {
  setExpense((prev) => {
    let temp = { ...prev };
    temp[type] = change;
    return temp;
  });
};

const AddExpense = ({ budget }) => {
  const [expense, setExpense] = useState({});

  const { setAllExpenses, setAllBudgets } = useContext(AppContext);
  if (budget) {
    return (
      <main className="expense-create-main">
        <h2>
          Add <strong className="budget-name">{budget.name}</strong> expense
        </h2>

        <text className="subtitle">
          Flesh out you budget by making a list of expenses.
        </text>
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
              onChange={(e) =>
                handleChange(e.target.value, "amount", setExpense)
              }
              className="budget-create-input"
            />
          </div>
        </section>
        <div className="budget-create-separator-horiz" />
        <section className="budget-create-btn-holder">
          <button className="budget-create-btn" onClick={() => setExpense({})}>
            Clear
          </button>
          <button
            className="budget-create-btn"
            onClick={() =>
              handleSubmit({
                budget: budget,
                newExpense: expense,
                setAllExpenses: setAllExpenses,
                setNewExpense: setExpense,
                setAllBudgets: setAllBudgets,
              })
            }
          >
            Add
          </button>
        </section>
      </main>
    );
  } else {
    return <div>Loader</div>;
  }
};

export default AddExpense;
