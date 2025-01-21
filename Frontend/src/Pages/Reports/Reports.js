import React, { useContext, useEffect, useState } from "react";
import "./Reports.css";
import { AppContext } from "../../context/AppContext";
import SummaryCard from "../../Components/ReportsComponents/SummaryCard";
import BarGraph from "../../Components/ReportsComponents/BarGraph";
import PieGraph from "../../Components/ReportsComponents/PieGraph";
import toast from "react-hot-toast";


const getBarGraphData = async (sub, setArr) => {
  if (!sub) {
    toast.error("Couldnt load bar graph");
    return;
  }

  try {
    const response = await fetch(`http://10.0.0.6:5000/api/summaries/${sub}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Couldnt fetch graph data");
      setArr([]);
      return;
    }
    let arr = data.WeeksArray;

    arr.forEach((element) => {
      let dateArr = element["Start of Week"]
        .split(",")[1]
        .trim()
        .split(" ")
        .slice(0, 3)
        .join(" ");

      element["Start of Week"] = dateArr;
    });
    setArr(arr);
  } catch (e) {
    console.error("Couldnt fetch graph data", e);
  }
};

const Reports = () => {
  const { user, summaryData,dark } = useContext(AppContext);
  const [weekArray, setWeekArray] = useState([]);

  useEffect(() => {
    getBarGraphData(user.sub, setWeekArray);
  }, );
  let categoryArray = [
    { name: "Income", value: summaryData.running_credits },
    { name: "Expenses", value: summaryData.running_debits - summaryData.running_charges },
    { name: "Charges", value: summaryData.running_charges },
  ];

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

      <section className="reports-section mid-section">
      <BarGraph weekArray={weekArray} dark={dark} />
        <PieGraph categoryArray={categoryArray} />
      </section>
      <section className="reports-section low-section"></section>
    </main>
  );
};

export default Reports;
