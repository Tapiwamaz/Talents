// react
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
// css
import "./SpecificBudget.css";
// context
import { AppContext } from "../../context/AppContext";
// components
import ExpenseTable from "../../Components/ExpenseTable/ExpenseTable";
import BudgetCard from "../../Components/BudgetCards/BudgetCard";
import AddExpense from "../../Components/BudgetCards/AddExpense";

const SpecificBudget = () => {
  const { budget_id } = useParams();

  const { budgetDict, allExpenses, loadingBooleans, allBudgets } =
    useContext(AppContext);
  


  if (!loadingBooleans.budgets) {
    return <Navigate to={"/budgets"} replace />;
  } else {
    return (
      <main
        className="specific-budget-main"
        style={{ "--budget-colour": budgetDict[budget_id].colour }}
      >
        <h1>
          <strong className="budget-name">{budgetDict[budget_id].name}</strong> overview
        </h1>
        <section className="specific-budget-details">
          <BudgetCard budget={allBudgets[budget_id]} />
          <AddExpense budget={allBudgets[budget_id]} />
        </section>
        <h1>Expenses</h1>
        <section className="recent-expenses-table">
          <ExpenseTable
          specificBudget={true}
            expenses={allExpenses.filter(
              (e) => e.budget_id === parseInt(budget_id)
            )}
            budgetDict={budgetDict}
          />
        </section>
      </main>
    );
  }
};

export default SpecificBudget;
