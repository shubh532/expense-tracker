import { useSelector } from 'react-redux';
import Style from "./ExpenseChart.module.css"
import Button from "../UIComponents/btns";
import Months from './Months';
import Chart from '../UIComponents/Chart';



function ExpenseChart() {
    const { Loader } = useSelector(state => state.ExpenseReducer)
    return (
        <div className={Style.chartContainer}>
            {!Loader &&
                <>
                    <div className={Style.ChartHeader} >
                        <Months />
                        <Button />
                    </div>
                    <h4>week Data Track</h4>
                    <div className={Style.ResponsiveContainer}>
                        <Chart />
                    </div>
                </>}
        </div>
    )
}

export default ExpenseChart;