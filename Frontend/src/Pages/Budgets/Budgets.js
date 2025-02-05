// react
import React, { useContext, useState } from "react";
// css
import "./Budgets.css";
// components
import CreateBudget from "../../Components/BudgetCards/CreateBudget";
import ExpenseTable from "../../Components/ExpenseTable/ExpenseTable";
import BudgetCard from "../../Components/BudgetCards/BudgetCard";
// context
import { AppContext } from "../../context/AppContext";
// uuid
import { v4 } from "uuid";

const Budgets = () => {
  const [newBudget, setNewBudget] = useState({budget_id: v4()});
  const [created, setCreated] = useState(false);

  const {
    user,
    allBudgets,
    dark,
    loadingBooleans,
    budgetDict,
    allExpenses,
    setAllBudgets,
    setBudgetDict,
  } = useContext(AppContext);

  const keys = Object.keys(allBudgets);

  return (
    <main className="budgets-main">
      <section className="budgets-create-section">
        <CreateBudget
          user={user}
          newBudget={newBudget}
          setNewBudget={setNewBudget}
          createdB={created}
          setCreatedB={setCreated}
          setAllBudgets={setAllBudgets}
          setBudgetDict={setBudgetDict}
          dark={dark}
        />
      </section>

      <h1 className="budgets-main-h1 left-margin">Your budgets</h1>
      {loadingBooleans.budgets && keys.length === 0 && <h2 className="budgets-main-h3">No budgets</h2>}

      <section className="budgets-show-budgets">
        {loadingBooleans.budgets &&
          keys.length > 0 &&
          keys
            .map((key) => (
              <BudgetCard key={key} budget={allBudgets[key]} />
            ))}{" "}
        {!loadingBooleans.budgets &&
          [1, 2, 3].map((item) => (
            <div key={item} className="loader-container">
              <span className="loader" />
            </div>
          ))}
      </section>
      <section className="recent-expenses-table">
        <h1 className="budgets-main-h1">Recent Expenses</h1>
        {loadingBooleans.expenses && allExpenses && (
          <ExpenseTable expenses={allExpenses} budgetDict={budgetDict} />
        )}
        {!loadingBooleans.expenses && (
          <div className="loader-table-container">
            <span className="loader" />
          </div>
        )}
      </section>
    </main>
  );
};

export default Budgets;
