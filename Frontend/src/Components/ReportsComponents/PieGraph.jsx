import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer,Cell,Legend } from "recharts";
// helpers
import { toCurrency } from "../../Helpers/TextAndNumberFomats";

const COLORS = [ "#00C49F","#FFBB28","#0088FE", "#FF8042"];
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="var(--main-text)"
      >{`${toCurrency(value)}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`Share ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const PieGraph = ({ categoryArray }) => {
  const [state, setState] = useState({
    activeIndex: 0,
  });

  const onPieEnter = (_, index) => {
    setState({
      activeIndex: index,
    });
  };

  return (
    <ResponsiveContainer width="50%" height="100%" className="bar-graph">
      <PieChart>
        <Pie
          activeIndex={state.activeIndex}
          activeShape={renderActiveShape}
          data={categoryArray}
          cx="50%"
          cy="50%"
          innerRadius={75}
          outerRadius={100}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
             {categoryArray.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieGraph;
