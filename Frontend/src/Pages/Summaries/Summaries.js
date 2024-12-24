import React, { useState } from 'react'
import "./Summaries.css"

const Summaries = () => {
  const [file, setFile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload the file');
      }

      const data = await response.json();
      setTransactions(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
  <div>
      <h1>Upload Bank Statement</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {transactions.length > 0 && (
        <div>
          <h2>Parsed Transactions</h2>
          <ul>
            {transactions.map((t, index) => (
              <li key={index}>
                {t.date}: {t.details} - {t.change} ({t.credit ? 'Credit' : 'Debit'})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>)
}



export default Summaries