import { useState } from "react";
import { toInputFormat } from "../../Helpers/DateTimeFormatters";
import "./BudgetCards.css";
import toast from "react-hot-toast";

const handleChange = (change, type, setNewBudget) => {
  setNewBudget((prev) => {
    let temp = { ...prev };
    temp[type] = change;
    console.log(temp);
    return temp;
  });
};

const sendBudget = async ({ sub, newBudget }) => {
  const formData = {
    sub: sub,
    name: newBudget.name,
    total: newBudget.total,
    category: newBudget.category,
    start_date: newBudget.start_date,
    end_date: newBudget.end_date,
  };
  try {
    const response = await fetch("http://localhost:5000/api/budgets/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Error creating budget");
    }
    
    return response;
  } catch (e) {
    throw new Error("Error creating budget", e);
  }
};
const handleSubmit = async ({ sub, newBudget }) => {
  if (
    !sub ||
    !newBudget ||
    !newBudget.name ||
    !newBudget.start_date ||
    !newBudget.end_date ||
    !newBudget.category ||
    !newBudget.total
  ) {
    toast.error("Please fill in all the fields");
    return;
  }

  const myPromise = sendBudget({ sub: sub, newBudget: newBudget });

  toast.promise(myPromise, {
    loading: "Saving budget",
    success: "Budget saved!",
    error: "Budget could not be saved",
  });
//   toast saying check internet
};

const categories = [
  "Groceries",
  "Housing",
  "Insurance",
  "Transportation",
  "Utitlies",
  "Leisure",
];

const CreateBudget = ({ user, newBudget, setNewBudget }) => {
  const [activeCategory, setActiveCategory] = useState(-1);
  return (
    <main className="budget-create-main">
      <h2 className="title">Create Budget</h2>
      <h4 className="subtitle">
        Make a budget and take control of your financial decisions.
      </h4>
      <div className="budget-create-holder">
        <section className="budget-create-section">
          <label className="budget-create-label" htmlFor="budget-create-name">
            Name
          </label>
          <input
            id="budget-create-name"
            className="budget-create-input"
            placeholder="e.g Groceries"
            value={newBudget.name || ""}
            maxLength={40}
            onChange={(e) => handleChange(e.target.value, "name", setNewBudget)}
          />
          <label
            htmlFor="budget-create-start-date"
            className="budget-create-label"
          >
            Start Date
          </label>
          <input
            id="budget-create-start-date"
            type="date"
            className="budget-create-input"
            value={newBudget.start_date || ""}
            min={toInputFormat(new Date())}
            onChange={(e) =>
              handleChange(e.target.value, "start_date", setNewBudget)
            }
          />
          <label
            htmlFor="budget-create-end-date"
            className="budget-create-label"
          >
            End Date
          </label>
          <input
            id="budget-create-end-date"
            type="date"
            className="budget-create-input"
            value={newBudget.end_date || ""}
            min={toInputFormat(new Date())}
            onChange={(e) =>
              handleChange(e.target.value, "end_date", setNewBudget)
            }
          />
          <label htmlFor="budget-create-total" className="budget-create-label">
            Total
          </label>
          <input
            id="budget-create-total"
            type="number"
            className="budget-create-input"
            placeholder="e.g 1000"
            min={10}
            max={1000000}
            value={newBudget.total || ""}
            onChange={(e) =>
              handleChange(e.target.value, "total", setNewBudget)
            }
          />
        </section>

        <div className="budget-create-separator" />

        <section className="budget-create-section">
          <label className="budget-create-label">
            Select the budget category
          </label>
          <div className="budget-create-categories">
            {categories.map((category, index) => (
              <button
                key={index}
                className={
                  activeCategory === index
                    ? "budget-create-category-btn active-btn"
                    : "budget-create-category-btn"
                }
                onClick={() => {
                  setActiveCategory(index);
                  handleChange(category, "category", setNewBudget);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      </div>
      <div className="budget-create-separator-horiz" />
      <section className="budget-create-btn-holder">
        <button className="budget-create-btn" onClick={() => setNewBudget({})}>
          Clear
        </button>
        <button
          className="budget-create-btn"
          onClick={() => {
            handleSubmit({sub:user.sub, newBudget:newBudget});
          }}
        >
          Done
        </button>
      </section>
    </main>
  );
};

export default CreateBudget;
