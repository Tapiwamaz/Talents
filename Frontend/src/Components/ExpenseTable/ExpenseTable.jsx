import { useNavigate } from "react-router";
import { toCurrency } from "../../Helpers/TextAndNumberFomats";
import "./ExpenseTable.css";

export const ExpenseTable = ({ expenses,budgetDict }) => {
  const navigate = useNavigate();
  return (
    <table className="expense-table">
      <thead>
        <th>Description</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Budget</th>
      </thead>
      <tbody>
        {expenses.slice(0,10).map((expense) => (
          <tr>
            <td>{expense.description}</td>
            <td>{toCurrency( expense.amount)}</td>
            <td>{expense.expense_date}</td>
            <td className="td-button"> <div onClick={() => navigate(`/budgets/${expense.budget_id}`)} className="expense-table-button">{budgetDict[expense.budget_id]}</div></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
