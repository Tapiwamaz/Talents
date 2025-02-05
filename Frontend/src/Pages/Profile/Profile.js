import "./Profile.css";
// react
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
// auth
//context
import { AppContext } from "../../context/AppContext";
// icons
import {
  ArrowLeftStartOnRectangleIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import Modal from "../../Components/Modal/Modal";
import { toCuteFormat } from "../../Helpers/DateTimeFormatters";
import ModalStatements from "../../Components/Modal/ModalStatements";
import toast from "react-hot-toast";
import {
  add_banks,
  create_summary_data,
} from "../../Helpers/TransactionArrayFormatters";

// functions
const logoutClickHandler = (
  setUserInfo,
  setLoggedIn,
  setAllTransactions,
  setTransactions,
  setFetchedTransactions,
  setSummaryData,
  setLoaded,
  setLoadingBooleans,
  setBudgetDict,
  setAllExpenses,
  setUploadedTrans,
  setAllBudgets,
  nav
) => {
  setUserInfo({});
  setLoggedIn(false);
  setLoaded(false);
  setAllTransactions([]);
  setTransactions([]);
  setFetchedTransactions([]);
  setSummaryData({ statements: [], banks: [] });
  setAllBudgets([]);
  setAllExpenses([]);
  setBudgetDict({});
  setUploadedTrans([]);
  setLoadingBooleans({ budgets: false, expenses: false, transactions: false });
  return nav("/");
};

const handleDeleteStatement = async (
  sub,
  statement,
  statements,
  allTransactions,
  setStatements,
  setAllTransactions,
  setTransactions,
  setSummaryData,
  setDelete
) => {
  try {
    const response = await fetch(`https://talents-backend-27b727379837.herokuapp.com/api/statement`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sub: sub, statement_name: statement }),
    });

    if (response.ok) {
      console.log(statements.filter((s) => s.statement_name !== statement));
      console.log(
        allTransactions.filter((s) => s.statement_name !== statement)
      );
      console.log(
        add_banks(
          statements.filter((s) => s.statement_name !== statement),
          create_summary_data(
            allTransactions.filter((s) => s.statement_name !== statement)
          )
        )
      );
      setSummaryData(
        add_banks(
          statements.filter((s) => s.statement_name !== statement),
          create_summary_data(
            allTransactions.filter((s) => s.statement_name !== statement)
          )
        )
      );
      setAllTransactions((prev) =>
        prev.filter((trans) => trans.statement_name !== statement)
      );
      setTransactions((prev) =>
        prev.filter((trans) => trans.statement_name !== statement)
      );

      setStatements((prev) =>
        prev.filter((s) => s.statement_name !== statement)
      );
      setDelete("First");
      toast.success(`'${statement}' deleted successfully`);
    }
  } catch (e) {
    console.log("Error", e);
    toast.error("Could not delete statement");
  }
};

const handleClearData = async ({
  sub,
  setAllBudgets,
  setAllTransactions,
  setTransactions,
  setBudgetDict,
  setSummaryData,
  setFetchedTransactions,
  setAllExpenses,
  setUploadedTrans,
  setOpen,
  nav,
}) => {
  // clear budgets, transactions , statements and expenses of a user

  try {
    const response = await fetch(`https://talents-backend-27b727379837.herokuapp.com/api/clearall/${sub}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setAllTransactions([]);
      setTransactions([]);
      setFetchedTransactions([]);
      setSummaryData({ statements: [], banks: [] });
      setAllBudgets([]);
      setAllExpenses([]);
      setBudgetDict({});
      setUploadedTrans([]);
      setOpen(false);
      nav("/");
      toast.success("Data cleared successfully");
    }
  } catch (e) {
    console.error("Error", e);
    toast.error("Couldnt delete your data");
  }
};

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [deletedStatements, setDelete] = useState("First");
  const [targetStatement, setTargetStatement] = useState("");
  const navigate = useNavigate();

  const {
    user,
    setUser,
    summaryData,
    statements,
    setLoggedIn,
    setStatements,
    allTransactions,
    setAllTransactions,
    setFetchedTransactions,
    setSummaryData,
    setTransactions,
    setLoaded,
    setLoadingBooleans,
    setBudgetDict,
    setAllExpenses,
    setUploadedTrans,
    setAllBudgets,
  } = useContext(AppContext);
  console.log(allTransactions);

  return (
    <main className="profile-main">
      <section className="profile-top-section">
        {user.picture ? (
          <img
            alt="profile-picture"
            src={user.picture}
            className="profile-user-icon-default"
          />
        ) : (
          <UserIcon className="profile-user-icon" />
        )}
        <div>
          <h3 className="profile-name">{user.name + " " + user.surname}</h3>
          <h3 className="profile-email">{user.email}</h3>
          <ArrowLeftStartOnRectangleIcon
            onClick={() => {
              logoutClickHandler(
                setUser,
                setLoggedIn,
                setAllTransactions,
                setTransactions,
                setFetchedTransactions,
                setSummaryData,
                setLoaded,
                setLoadingBooleans,
                setBudgetDict,
                setAllExpenses,
                setUploadedTrans,
                setAllBudgets,
                navigate
              );
            }}
            className="profile-logout-button"
          />
        </div>
      </section>
      <div className="divider-line" />

      <section className="profile-mid-section">
        <div className="upload-summary-card">
          <h4>Uploads</h4>
          <div className="card-holder">
            <div className="summary-subcard">
              <p>Banks</p>
              <div className="icon-holder">
                {summaryData &&
                  summaryData.banks &&
                  summaryData.banks.map((s, index) => {
                    if (s === "Standard")
                      return (
                        <img
                          key={index}
                          src="/StandardLogo.png"
                          alt="fig1"
                          className="subcard-icon bank"
                        />
                      );
                    if (s === "FNB")
                      return (
                        <img
                          key={index}
                          src="/FNBLogo.webp"
                          alt="fig1"
                          className="subcard-icon bank"
                        />
                      );
                  })}
              </div>
              <p>Transactions</p>
              <text>{summaryData.number_of_transactions}</text>
            </div>

            <div className="summary-subcard">
              <p>Statements</p>
              <div className="icon-holder">
                {summaryData &&
                  summaryData.statements &&
                  summaryData.statements.map((s) => (
                    <DocumentCheckIcon key={s} className="subcard-icon" />
                  ))}
              </div>
              <p>Dates</p>{" "}
              {summaryData.start_date && summaryData.end_date && (
                <text>
                  {toCuteFormat(summaryData.start_date)} to{" "}
                  {toCuteFormat(summaryData.end_date)}
                </text>
              )}
            </div>
          </div>
        </div>

        <div className="upload-summary-card">
          <h4>Activity</h4>
          <div className="summary-subcard"></div>
        </div>
      </section>

      <section className="delete-section">
        <div className="button-holder">
          <div className="profile-text-section">
            <label>Delete any statement</label>
            <text>(Click and select any of your saved statements)</text>
          </div>
          <button className="btn-delete" onClick={() => setDelete("Second")}>
            Delete
          </button>
        </div>
        <div className="button-holder">
          <div className="profile-text-section">
            <label>Clear all data</label>
            <text>
              (Remove all saved data including your profile and all
              transactions)
            </text>
          </div>
          <button className="btn-delete" onClick={() => setOpen(true)}>
            Clear
          </button>
        </div>
      </section>

      {/* Delete evevrything modal */}
      <Modal onClose={() => setOpen(false)} open={open}>
        <ExclamationTriangleIcon className="modal-icon" />
        <h3 className="modal-title">Clear All</h3>
        <text className="modal-subtitle">
          Once deleted, no information can be retrieved. Are you sure?
        </text>
        <div className="modal-button-holder">
          <button className="modal-btn" onClick={() => setOpen(false)}>
            No, Keep it!
          </button>
          <button
            className="modal-btn btn-yes"
            onClick={() => {
              handleClearData({
                setAllBudgets: setAllBudgets,
                setAllTransactions: setAllTransactions,
                setAllBudgets: setAllBudgets,
                setAllExpenses: setAllExpenses,
                setBudgetDict: setBudgetDict,
                setFetchedTransactions: setFetchedTransactions,
                setSummaryData: setSummaryData,
                setTransactions: setTransactions,
                setUploadedTrans: setUploadedTrans,
                setOpen: setOpen,
                sub: user.sub,
                nav: navigate,
              });
            }}
          >
            Yes, Delete!
          </button>
        </div>
      </Modal>

      {/*Delete statements*/}
      <ModalStatements open={deletedStatements}>
        <h1>Please select the statement you would like to delete</h1>
        <select
          className="statement-selectors"
          name="statement-selectors"
          defaultValue={""}
          onChange={(e) => {
            setTargetStatement(e.target.value);
          }}
        >
          <option value={-1} hidden>
            Please select a statement
          </option>

          {summaryData.statements.map((s, index) => (
            <option key={index} value={s}>
              {s}
            </option>
          ))}
        </select>
        <div className="modal-statements-holder">
          <button
            className="modal-state-btn"
            onClick={() => {
              setTargetStatement("");
              setDelete("First");
            }}
          >
            Cancel
          </button>
          <button
            className="modal-state-btn"
            disabled={!targetStatement}
            onClick={() => {
              handleDeleteStatement(
                user.sub,
                targetStatement,
                statements,
                allTransactions,
                setStatements,
                setAllTransactions,
                setTransactions,
                setSummaryData,
                setDelete
              );
            }}
          >
            Delete
          </button>
        </div>
      </ModalStatements>
    </main>
  );
};

export default Profile;
