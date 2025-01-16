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

  const { budgetDict, allBudgets, allExpenses, loadingBooleans } =
    useContext(AppContext);
  const [budget, setBudget] = useState({});

  useEffect(() => {
    setBudget(allBudgets.filter((b) => b.budget_id === parseInt(budget_id))[0]);
  }, []);

  if (!loadingBooleans.budgets) {
    return <Navigate to={"/budgets"} replace/>;
  } else {
    return (
      <main
        className="specific-budget-main"
        style={{ "--budget-colour": budgetDict[budget_id].colour }}
      >
        <h1>
          <strong className="budget-name">{budgetDict[budget_id].name}</strong>{" "}
          Overview
        </h1>
        <section className="specific-budget-details">
          <BudgetCard budget={budget} />
          <AddExpense budget={budget} setBudget={setBudget} />
        </section>
        <h1>Expenses</h1>
        <section className="recent-expenses-table">
          <ExpenseTable
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
