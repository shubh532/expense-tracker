import React from 'react';
import Style from "./Chart.module.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Months from '../ExpenseComponents/Months';
import { useSelector } from 'react-redux';
import Button from './btns';

const data = [
  {
    name: 'Week 1',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Week 2',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Week 3',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Week 4',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'week 5',
    uv: 1890,
    pv: 10800,
    amt: 2181,
  }
];

const CustomizedXAxisLabel = ({ x, y, stroke, value }) => (
  <text x={x} y={y} dy={-5} fill={stroke} fontSize={15} textAnchor="end">
    {value}
  </text>
);

// const CustomizedAxisTick = ({ x, y, stroke, payload }) => (
//   <g transform={`translate(${x},${y})`}>
//     <text x={100} y={0} dy={16} textAnchor="middle" fill="#668956">
//       {payload.value}
//     </text>
//   </g>
// );

function Chart() {
  const { Loader } = useSelector(state => state.ExpenseReducer)

  console.log(Loader, "isLoading")
  return (
    <div className={Style.chartContainer}>
      <div className={Style.ChartHeader}>
        {!Loader && <Months />}
        <Button />
      </div>
      <div className={Style.ResponsiveContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 18,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" height={60} interval={'preserveStartEnd'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#856726" label={<CustomizedXAxisLabel />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Chart;
