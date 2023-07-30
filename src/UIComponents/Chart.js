import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ExpenseData } from '../ReduxStore/ExpenseStore';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Chart() {
  const { ChartData } = useSelector(state => state.ExpenseReducer)
  const Dispatch = useDispatch()

  useEffect(() => {
    Dispatch(ExpenseData.getWeekChartData())
  }, [Dispatch])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={730} height={250} data={ChartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }} tex>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#283B5D" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#283B5D" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="Date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}


export default Chart;
