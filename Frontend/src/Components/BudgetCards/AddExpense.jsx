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
  setBudget,
}) => {
  const formData = {
    budget_id: budget.budget_id,
    description: newExpense.description,
    amount: newExpense.amount,
  };
  try {
    const response = await fetch("http://localhost:5000/api/expenses/create", {
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
    console.log(data);
    formData.expense_id = data.expense.expense_id;
    formData.expense_date = toInputFormat(new Date());
    setNewExpense({});
    setAllExpenses((prev) => [formData, ...prev]);

    // add to the budgets total_expense
    // console.log(budget);
    setBudget((prev) => {
      let temp = prev;
      temp.total_expenses =
        parseFloat(temp.total_expenses) + parseFloat(formData.amount);
      return temp;
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
  setBudget,
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
    setBudget: setBudget,
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

const AddExpense = ({ budget, setBudget }) => {
  const [expense, setExpense] = useState({});

  const { setAllExpenses } = useContext(AppContext);
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
                setBudget: setBudget,
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
