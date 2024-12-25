import React, { useState } from "react";
import "./Summaries.css";
import { Table } from "../../Components/Table";

const Summaries = () => {
  const [file, setFile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
      setTransactions(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="summaries-page">
      <h1 className="summaries-page-title">Summaries</h1>

      <section className="summaries-searchbar">
        <label>Search for a transaction</label>
        <input></input>
      </section>

      <section className="summaries-upload-section">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="summaries-upload-input"
        />
        <button className="summaries-upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </section>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Transactions</h2>
      {transactions.length > 0 && <Table transactions={transactions} />}
    </div>
  );
};

export default Summaries;
