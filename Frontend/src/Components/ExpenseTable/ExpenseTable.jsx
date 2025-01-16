import { useNavigate } from "react-router";
import { toCurrency } from "../../Helpers/TextAndNumberFomats";
import "./ExpenseTable.css";

const ExpenseTable = ({ expenses, budgetDict }) => {
  const navigate = useNavigate();

  if (expenses && budgetDict && Object.keys(budgetDict).length > 0 && expenses.length > 0) {
    return (
      <table className="expense-table">
        <thead>
          <th>Description</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Budget</th>
        </thead>
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
                  style={{"--budget-colour": budgetDict[expense.budget_id].colour}}
                >
                  {budgetDict[expense.budget_id]["name"]}
                </div>
              </td>
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
