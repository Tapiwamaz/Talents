import React from "react";
import { toCurrency } from "../../Helpers/TextAndNumberFomats";

import {NavLink} from "react-router"

const BudgetCard = ({ budget }) => {
  // console.log(budget)
  return (
    <main className="budgetCard-main">
      <div className="description-line">
        <h3>{budget.name}</h3>
        <text>{toCurrency(budget.total_amount)}</text>
      </div>

      <progress className="budget-progress" value={0.5*budget.total_amount} max={budget.total_amount}/>
      <div className="description-line">
        <p>{toCurrency(0.5*budget.total_amount)}... spent</p>
        <p>{toCurrency(budget.total_amount-0.5*budget.total_amount)}... remaining</p>
      </div>
      <NavLink to={`/budgets/${budget.budget_id}`}  className="budgetCard-btn">Details</NavLink>
    </main>
  );
};

export default BudgetCard;
