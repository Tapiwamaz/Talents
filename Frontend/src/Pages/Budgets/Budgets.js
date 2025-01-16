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

const Budgets = () => {
  const [newBudget, setNewBudget] = useState({});
  const [created, setCreated] = useState(false);

  const {
    user,
    allBudgets,
    loadingBooleans,
    budgetDict,
    allExpenses,
    setAllBudgets,
    setBudgetDict,
  } = useContext(AppContext);

  console.log(loadingBooleans)

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
        />
      </section>

      <h3 className="budgets-main-h3">Your budgets</h3>
      <section className="budgets-show-budgets">
        {loadingBooleans.budgets &&
          allBudgets &&
          allBudgets.slice(0, 4).map((b) => <BudgetCard budget={b} />)}{" "}
        {!loadingBooleans.budgets &&
          [1, 2, 3].map((item) => (
            <div key={item} className="loader-container">
              <span className="loader" />
            </div>
          ))}
      </section>
      <section className="recent-expenses-table">
        <h3>Recent Expenses</h3>
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
