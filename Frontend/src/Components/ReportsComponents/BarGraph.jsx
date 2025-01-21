import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const BarGraph = ({ weekArray, dark }) => {
  return (
    <ResponsiveContainer width="50%" className="bar-graph">
      <BarChart
        data={weekArray}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Start of Week">
          <Label value="Start of Week" offset={-15} position="insideBottom" />
        </XAxis>
        <YAxis />
        <Tooltip
          contentStyle={{
            background: "var(--background)",
            border: "none",
            borderRadius: "var(--xs)",
          }}
          cursor={
            dark
              ? { fill: "rgba(70,70,70,0.5)", borderRadius: "var(--xs)" }
              : { fill: "rgba(190,190,190,0.5)" ,borderRadius: "var(--xs)"}
          }
        />
        <Legend
          verticalAlign="top"
          align="right"
          layout="centric"
          iconType="square"
          iconSize={10}
        />
        <Bar dataKey="Income" stackId="a" fill="green" />
        <Bar dataKey="Expenses" stackId="b" fill="rgb(200,10,10)" />
        <Bar dataKey="Charges" stackId="b" fill="rgb(128,128,128)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
