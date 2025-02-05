import React, { useContext, useEffect, useState } from "react";
import "./Reports.css";
import { AppContext } from "../../context/AppContext";
import SummaryCard from "../../Components/ReportsComponents/SummaryCard";
import BarGraph from "../../Components/ReportsComponents/BarGraph";
import PieGraph from "../../Components/ReportsComponents/PieGraph";
import toast from "react-hot-toast";
// OPENAI
import OpenAI from "openai";

// console.log(process.env)

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = process.env.REACT_APP_OPENAI_KEY;

const api = new OpenAI({
  apiKey,
  baseURL,
  dangerouslyAllowBrowser: true,
});

const getBarGraphData = async (sub, setArr, setLoader) => {
  if (!sub) {
    toast.error("Couldnt load bar graph");
    return;
  }

  try {
    const response = await fetch(`https://talents-backend-27b727379837.herokuapp.com/api/summaries/${sub}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Couldnt fetch graph data");
      setArr([]);
      setLoader((prev) => {
        let temp = prev;
        temp.graph = true;
      });
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
    setLoader((prev) => {
      let temp = prev;
      temp.graph = true;
      return temp;
    });
  } catch (e) {
    console.error("Couldnt fetch graph data", e);
    setLoader((prev) => {
      let temp = prev;
      temp.graph = true;
      return temp;
    });
  }
};

const getPieData = async (transactions, setArr, setLoader) => {
  if (!transactions) {
    toast.error("Couldnt load bar graph");
    setLoader((prev) => {
      let temp = prev;
      temp.pie = true;
      return temp;
    });
    return;
  }

  try {
    const response = await fetch(`https://talents-backend-27b727379837.herokuapp.com/api/categorize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transactions: transactions }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Couldnt fetch pie data");
      setArr([]);
      setLoader((prev) => {
        let temp = prev;
        temp.pie = true;
        return temp;
      });
      return;
    }
    let arr = data.categories;
    let result = [];
    // convert to name value
    Object.keys(arr).forEach((cat) =>
      result.push({ name: cat, value: arr[cat] })
    );
    setArr(result);
    setLoader((prev) => {
      let temp = prev;
      temp.pie = true;
      return temp;
    });
  } catch (e) {
    console.error("Couldnt fetch graph data", e);
    setLoader((prev) => {
      let temp = prev;
      temp.pie = true;
      return temp;
    });
  }
};

const AIRequest = async ({ systemPrompt, userPrompt, setAnalysis }) => {
  const completion = await api.chat.completions.create({
    model: "deepseek/deepseek-r1",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
  });

  const response = completion.choices[0].message.content;

  console.log("Deepseak response", response, typeof response);
  setAnalysis(response?.split("\n"));
};

const Reports = () => {
  const { user, summaryData, dark, allTransactions } = useContext(AppContext);
  const [weekArray, setWeekArray] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [categoryArray, setCategoryArray] = useState([]);
  const [loader, setLoader] = useState({ pie: false, graph: false });
  console.log(JSON.stringify(categoryArray).length)

  useEffect(() => {
    getBarGraphData(user.sub, setWeekArray, setLoader);
    getPieData(allTransactions, setCategoryArray, setLoader)
    // try {
    //   AIRequest({
    //     systemPrompt:
    //       "Your'e a descriptive and helpful financial advisor. Be desctiptive and structured in your responses",
    //     userPrompt: `${JSON.stringify(categoryArray)} advise someone with this`,
    //     setAnalysis: setAnalysis,
    //   });
    // } catch (e) {
    //   console.log("Error", e);
    // }
  }, []);

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
        <BarGraph weekArray={weekArray} dark={dark} loader={loader.graph} />
        <PieGraph categoryArray={categoryArray} loader={loader.pie} />
      </section>
      <section className="reports-section low-section">
        <h1>AI Analysis</h1>
        <p>{analysis}</p>
      </section>
    </main>
  );
};

export default Reports;
