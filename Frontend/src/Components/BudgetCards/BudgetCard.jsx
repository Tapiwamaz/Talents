import React from "react";
import { toCurrency } from "../../Helpers/TextAndNumberFomats";

import { NavLink } from "react-router";

const BudgetCard = ({ budget }) => {
  if (budget) {
    return (
      <main className="budgetCard-main"  style={{"--progress-colour": budget.colour}}>
        <div className="description-line">
          <h3
            className="budget-name"
          >
            {budget.name}
          </h3>
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
        <NavLink to={`/budgets/${budget.budget_id}`} className="budgetCard-btn">
          Details
        </NavLink>
      </main>
    );
  } else {
    return <div>Loader</div>;
  }
};

export default BudgetCard;
