import React, { useContext, useRef, useState } from "react";
// css
import "./Summaries.css";
//components
import { Table } from "../../Components/Table";
// icons
import {
  ArrowUpTrayIcon,
  DocumentArrowDownIcon,
  DocumentCurrencyDollarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
// context
import { AppContext } from "../../context/AppContext";

// Functions
const clearFiles = (inputRef, setFile, setError, setLoaded) => {
  // ? Should this remove all processed transactions
  inputRef.current.value = "";
  setFile(null);
  setError("");
  setLoaded(false);
};

const saveTransactions = async (filename, sub, transactions) => {
  const formData = { transactions: transactions, name: filename, sub: sub };

  try {
    const response = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      throw new Error("Something went wrong with the transaction");
    }
    console.log(data);
  } catch (e) {
    console.error("Error", e);
  }
};

const saveStatement = async (file, summaryData, subToken) => {
  const formData = { summary: summaryData, name: file.name, sub: subToken };

  try {
    const response = await fetch("http://localhost:5000/api/statement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Something went wrong with the statement");
    }
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error("Error", e);
  }
};

const Summaries = () => {
  const [file, setFile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [allTransactions, setAllTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [searchBool, setSearchBoolean] = useState(false);

  const { user, loggedIn } = useContext(AppContext);

  let uploadInput = useRef();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the file");
      }

      const data = await response.json();
      const {
        number_of_transactions,
        running_balance,
        running_credits,
        running_debits,
        running_charges,
        initial_balance,
      } = data;
      setSummaryData({
        number_of_transactions: number_of_transactions,
        running_balance: running_balance,
        running_credits: running_credits,
        running_debits: running_debits,
        running_charges: running_charges,
        initial_balance: initial_balance,
      });
      setTransactions(data.transactions);
      setAllTransactions(data.transactions);
      setError("");
      setLoaded(true);
    } catch (err) {
      setError(err.message);
      setLoaded(false);
    }
  };

  return (
    <div className="summaries-page">
      {/* <h1 className="summaries-page-title">Summaries</h1> */}

      <section className={"summaries-top-section "}>
        <input
          type="search"
          name="search"
          placeholder="Search for a transaction"
          className={!loaded ? "search-input exuent" : "search-input open"}
          onChange={(e) => {
            setTransactions(
              allTransactions.filter(
                (t) =>
                  t.details && t.details.includes(e.target.value.toUpperCase())
              )
            );
            if (e.target.value.length > 0) {
              setSearchBoolean(true);
            } else {
              setSearchBoolean(false);
            }
          }}
        ></input>

        <section className="summaries-upload-section">
          <label
            htmlFor="pdf-input"
            className={loaded ? "pdf-input-doc" : "pdf-input-label"}
          >
            {!file ? (
              <>
                <DocumentCurrencyDollarIcon width={35} />
                <p className="label-p-please">
                  (Please upload your bank statements)
                </p>
              </>
            ) : (
              <p>{file.name}</p>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </label>
          <input
            type="file"
            accept="application/pdf"
            ref={uploadInput}
            disabled={loaded}
            id="pdf-input"
            onChange={(e) => {
              handleFileChange(e);
            }}
            className="summaries-upload-input"
          />
          <div className="upload-section-button-holder">
            {!loaded && (
              <ArrowUpTrayIcon
                className="summaries-upload-btn"
                onClick={handleUpload}
              />
            )}
            {loaded && (
              <DocumentArrowDownIcon
                className="summaries-upload-btn"
                // onClick={() => saveStatement(file, summaryData, user.sub)}
                onClick={() =>
                  saveTransactions(file.name, user.sub, allTransactions)
                }
              />
            )}

            <TrashIcon
              className="summaries-upload-btn"
              onClick={() => {
                clearFiles(uploadInput, setFile, setError, setLoaded);
              }}
            />
          </div>
        </section>
      </section>

      {transactions && transactions.length > 0 && <h2>Transactions</h2>}
      {transactions && transactions.length > 0 && (
        <Table
          transactions={transactions}
          searchBool={searchBool}
          summaryData={summaryData}
        />
      )}
    </div>
  );
};

export default Summaries;
