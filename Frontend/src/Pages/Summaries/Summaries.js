import React, { useRef, useState } from "react";
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

// Functions
const clearFiles = (inputRef, setFile, setError, setLoaded) => {
  // ? Should this remove all processed transactions
  inputRef.current.value = "";
  setFile(null);
  setError("");
  setLoaded(false);
};

const Summaries = () => {
  const [file, setFile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [allTransactions, setAllTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [searchBool, setSearchBoolean] = useState(false);

  let uploadInput = useRef();

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
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
      const response = await fetch("http://localhost:5000/upload", {
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
        initial_balance
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
                <p>(Please upload your bank statements)</p>
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
