// react
import { useNavigate } from "react-router";
// helpers
import { toCurrency } from "../../Helpers/TextAndNumberFomats";
// icons
import { TrashIcon } from "@heroicons/react/24/outline";
// css
import "./ExpenseTable.css";
// toast
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const deleteExpense = async ({
  expense,
  setAllExpenses,
  setAllBudgets,
  setDeleting,
}) => {
  // console.log(expense);
  setDeleting(true);
  try {
    const response = await fetch(
      `http://localhost:5000/api/expenses/${expense.expense_id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      toast.error("Couldn't delete expense");
      setDeleting(false);
      throw new Error("Couldn't delete expense");
    }
    if (response.ok) {
      setAllExpenses((prev) =>
        prev.filter((e) => e.expense_id !== expense.expense_id)
      );
      setAllBudgets((prev) => {
        prev[expense.budget_id].total_expenses =
          parseFloat(prev[expense.budget_id].total_expenses) -
          parseFloat(expense.amount) / 2;

        return prev;
      });
      setDeleting(false);
      return response;
    }
  } catch (e) {
    console.error("Error", e);
    setDeleting(false);
  }
};

const handleDelete = ({
  expense,
  setAllExpenses,
  setAllBudgets,
  setDeleting,
}) => {
  if (!expense || !expense.budget_id || expense.expenses_id) {
    toast.error("Not enough information to delete");
    return;
  }
  setDeleting(true);

  const myPromise = deleteExpense({
    expense: expense,
    setAllBudgets: setAllBudgets,
    setAllExpenses: setAllExpenses,
    setDeleting: setDeleting,
  });
  toast.promise(myPromise, {
    loading: "Deleting expense...",
    success: "Expense deleted",
    error: "Expense could not be deleted",
  });
  setDeleting(false);
};

const ExpenseTable = ({ expenses, budgetDict, specificBudget }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const { setAllBudgets, setAllExpenses } = useContext(AppContext);

  if (
    expenses &&
    budgetDict &&
    Object.keys(budgetDict).length > 0 &&
    expenses.length > 0
  ) {
    return (
      <table className="expense-table">
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Budget</th>
          {specificBudget && <th>Delete</th>}
        </tr>

        <tbody>
          {expenses.slice(0, 10).map((expense) => (
            <tr key={expense.expense_id}>
              <td>{expense.description}</td>
              <td>{toCurrency(expense.amount)}</td>
              <td>{expense.expense_date}</td>
              <td className="td-button">
                {" "}
                <div
                  onClick={() => navigate(`/budgets/${expense.budget_id}`)}
                  className="expense-table-button"
                  style={{
                    "--budget-colour": budgetDict[expense.budget_id].colour,
                  }}
                >
                  {budgetDict[expense.budget_id]["name"]}
                </div>
              </td>
              {specificBudget && (
                <td>
                  <button className="expense-table-trash" disabled={deleting}>
                    <TrashIcon
                      className="expense-table-trash-btn"
                      width={25}
                      onClick={() =>
                        handleDelete({
                          expense: expense,
                          setAllBudgets: setAllBudgets,
                          setAllExpenses: setAllExpenses,
                          setDeleting: setDeleting,
                        })
                      }
                    />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <h1>No Expenses</h1>;
  }
};
export default ExpenseTable;
