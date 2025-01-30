import React, { useContext } from "react";
import { toCurrency } from "../../Helpers/TextAndNumberFomats";

import { NavLink, useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const handleDeleteBudget = async ({
  budget,
  setAllBudgets,
  setAllExpenses,
  nav,
}) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/budgets/${budget.budget_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      setAllBudgets((prev) => {
        let temp = prev;
        delete temp[budget.budget_id];
        return temp;
      });
      setAllExpenses((prev) =>
        prev.filter((exp) => exp.budget_id !== budget.budget_id)
      );
      nav("/budgets");
      toast.success(`${budget.name} has been deleted`);
    }
  } catch (e) {
    console.error("Error", e);
    toast.error("Could not delete budget");
  }
};

const BudgetCard = ({ budget, specificBudget }) => {
  const { setAllBudgets, setAllExpenses } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(budget)

  if (budget) {
    return (
      <main
        className="budgetCard-main"
        style={{ "--progress-colour": budget.colour }}
      >
        <div className="description-line">
          <h3 className="budget-name">{budget.name}</h3>
          <p>{toCurrency(budget.total_amount)}</p>
        </div>

        <progress
          className="budget-progress"
          value={budget.total_expenses}
          max={budget.total_amount}
        />
        <div className="description-line">
          <p>{toCurrency(budget.total_expenses)}... spent</p>
          <p>
            {toCurrency(budget.total_amount - budget.total_expenses)}...
            remaining
          </p>
        </div>
        {specificBudget ? (
          <button
            className="budgetCard-btn"
            onClick={() =>
              handleDeleteBudget({
                budget: budget,
                setAllBudgets: setAllBudgets,
                nav: navigate,
                setAllExpenses: setAllExpenses,
              })
            }
          >
            Delete
          </button>
        ) : (
          <NavLink
            to={`/budgets/${budget.budget_id}`}
            className="budgetCard-btn"
          >
            Details
          </NavLink>
        )}
      </main>
    );
  } else {
    return <div>Loader</div>;
  }
};

export default BudgetCard;
