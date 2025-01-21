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
  DocumentPlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// context
import { AppContext } from "../../context/AppContext";
import {
  add_dates,
  ammend_summary_data,
  create_summary_data,
  join_summary_data,
  reorder_merged_transactions,
} from "../../Helpers/TransactionArrayFormatters";
// toasts
import toast from "react-hot-toast";


// Functions
const clearFiles = (
  inputRef,
  uploadedTrans,
  fetchedTransactions,
  setFile,
  setError,
  setLoaded,
  setTransactions,
  setUploadedTrans,
  setAllTransactions,
  setSummaryData
) => {
  // ? Should this remove all processed transactions
  inputRef.current.value = "";
  setFile(null);
  setError("");
  setLoaded(false);
  setTransactions((prev) => {
    let temp = prev.filter((t) => !uploadedTrans.includes(t));
    return temp;
  });
  setAllTransactions(fetchedTransactions);
  setSummaryData(create_summary_data(fetchedTransactions));
  setUploadedTrans([]);
};

const saveTransactions = async (
  filename,
  sub,
  transactions,
  setUploadedTrans
) => {
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
    console.log("Transactions saved",data);
    setUploadedTrans([]);
    toast.success("Statement saved")

  } catch (e) {
    console.error("Error", e);
  }
};

const saveStatement = async (
  file,
  summaryData,
  subToken,
  transactions,
  setUploadedTrans
) => {
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

    saveTransactions(file.name, subToken, transactions, setUploadedTrans);
  } catch (e) {
    console.error("Error", e);
  }
};

const Summaries = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [searchBool, setSearchBoolean] = useState(false);

  const {
    user,
    loggedIn,
    loaded,
    summaryData,
    transactions,
    fetchedTransactions,
    allTransactions,
    uploadedTrans,
    setUploadedTrans,
    setAllTransactions,
    setTransactions,
    setLoaded,
    setSummaryData,
  } = useContext(AppContext);

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
        start_date,
        end_date,
      } = data;

      const newSummary = ammend_summary_data({
        number_of_transactions: number_of_transactions,
        running_balance: running_balance,
        running_credits: running_credits,
        running_debits: running_debits,
        running_charges: running_charges,
        initial_balance: initial_balance,
        start_date: start_date,
        end_date: end_date,
        statements: [file.name],
      });
      console.log(newSummary);

      let temp = add_dates(data.transactions);
      if (summaryData.statements.length > 0) {
        setSummaryData(join_summary_data(summaryData, newSummary));
      } else {
        setSummaryData(newSummary);
      }

      setTransactions((prev) => reorder_merged_transactions(prev, temp));
      setAllTransactions((prev) => [...prev, ...temp.reverse()]);
      setUploadedTrans(temp);
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
          <div className="summaries-label-holder">
            <label
              htmlFor="pdf-input"
              className={loaded ? "pdf-input-doc" : "pdf-input-label"}
            >
              {loaded && file && summaryData.statements && (
                <p>{summaryData.statements.join(",\n")}</p>
              )}
              {loaded && !file && summaryData.statements && (
                <p>{summaryData.statements.join(",\n")}</p>
              )}
              {!loaded && file && <p>{file.name}</p>}

              {!loaded && !file && (
                <>
                  <DocumentCurrencyDollarIcon width={35} />
                  <p className="label-p-please">
                    (Please upload your bank statements)
                  </p>
                </>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </label>
            <div className="files-display">
              {!loaded && summaryData.statements && (
                <p>{summaryData.statements.join(",\n")}</p>
              )}
            </div>

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
          </div>
          <div className="upload-section-button-holder">
            {!loaded && (
              <ArrowUpTrayIcon
                className="summaries-upload-btn"
                onClick={handleUpload}
              />
            )}
            {!loaded && summaryData.statements && (
              <XMarkIcon
                className="summaries-upload-btn"
                onClick={() => {
                  setLoaded(true);
                }}
              />
            )}
            {loaded && (
              <DocumentPlusIcon
                className="summaries-upload-btn"
                onClick={() => {
                  setLoaded(false);
                }}
              />
            )}
            {loaded && loggedIn && uploadedTrans.length > 0 && (
              <DocumentArrowDownIcon
                className="summaries-upload-btn"
                onClick={() =>
                  saveStatement(
                    file,
                    summaryData,
                    user.sub,
                    uploadedTrans,
                    setUploadedTrans
                  )
                }
              />
            )}
            {uploadedTrans.length > 0 && (
              <TrashIcon
                className="summaries-upload-btn"
                onClick={() => {
                  clearFiles(
                    uploadInput,
                    uploadedTrans,
                    fetchedTransactions,
                    setFile,
                    setError,
                    setLoaded,
                    setTransactions,
                    setUploadedTrans,
                    setAllTransactions,
                    setSummaryData
                  );
                }}
              />
            )}
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
