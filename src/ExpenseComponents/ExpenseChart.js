import { useSelector } from 'react-redux';
import Style from "./ExpenseChart.module.css"
import Button from "../UIComponents/btns";
import Months from './Months';
import Chart from '../UIComponents/Chart';
import Card from '../UIComponents/Card';



function ExpenseChart() {
    const { Loader, ChartTitle } = useSelector(state => state.ExpenseReducer)
    return (
        <Card>
            {!Loader &&
                <>
                    <div className={Style.ChartHeader} >
                        <Months />
                        <Button />
                    </div>
                    <h4 className={Style.ChartHeading}>{ChartTitle}</h4>
                    <div className={Style.ResponsiveContainer}>
                        <Chart />
                    </div>
                </>}
        </Card>
    )
}

export default ExpenseChart;