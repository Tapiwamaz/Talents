// react
import React, { useContext, useState } from "react";
// css
import "./Budgets.css";
// components
import CreateBudget from "../../Components/BudgetCards/CreateBudget";
// context
import { AppContext } from "../../context/AppContext";
import AddExpense from "../../Components/BudgetCards/AddExpense";
import { ExpenseTable } from "../../Components/ExpenseTable/ExpenseTable";
import { mockExpenses } from "../../Helpers/MockData";
import BudgetCard from "../../Components/BudgetCards/BudgetCard";

const budgetDict = {};

const Budgets = () => {
  // const [newBudget, setNewBudget] = useState({
  //   budget_id: 8,
  //   name: "Drip too hard",
  //   category: "Leisure",
  //   total_amount: 1000,
  // });
  const [newBudget, setNewBudget] = useState({})
  const [created, setCreated] = useState(false);
  // const [created, setCreated] = useState(true);

  const { user, allBudgets, setAllBudgets } = useContext(AppContext);

  allBudgets.forEach((b) => (budgetDict[b.budget_id] = b.name));

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
        />
      </section>

      <h3 className="budgets-main-h3">Your budgets</h3>
      <section className="budgets-show-budgets">
        {allBudgets.slice(0, 4).map((b) => (
          <BudgetCard budget={b} />
        ))}
      </section>
      <section className="recent-expenses-table">
        <h3>Recent Expenses</h3>
        <ExpenseTable expenses={mockExpenses} budgetDict={budgetDict} />
      </section>
    </main>
  );
};

export default Budgets;
