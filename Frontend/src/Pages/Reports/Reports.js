import React, { useContext } from "react";
import "./Reports.css";
import { AppContext } from "../../context/AppContext";
import SummaryCard from "../../Components/ReportsComponents/SummaryCard";

const Reports = () => {
  const { allTransctions, summaryData } = useContext(AppContext);

  return (
    <main className="reports-main">
      <section className="reports-section top-section">
        <SummaryCard
          title={"Opening balance"}
          value={summaryData.initial_balance}
          style={
            summaryData.initial_balance > 0
              ? { "--color-text": "green" }
              : { "--color-text": "red" }
          }
        />
        <SummaryCard title={"Income"} value={summaryData.running_credits} />
        <SummaryCard title={"Expenditure"} value={summaryData.running_debits} />
        <SummaryCard
          title={"Balance"}
          value={summaryData.running_balance}
          style={
            summaryData.initial_balance > 0
              ? { "--color-text": "green" }
              : { "--color-text": "red" }
          }
        />
      </section>

      <section className="reports-section mid-section"></section>
      <section className="reports-section low-section"></section>
    </main>
  );
};

export default Reports;
