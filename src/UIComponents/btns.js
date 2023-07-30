import Style from "./button.module.css"
import { useDispatch, useSelector } from "react-redux";
import { ExpenseData } from "../ReduxStore/ExpenseStore";

function Button(props) {
    const Dispatch = useDispatch()
    const weekData = useSelector(state => state.ExpenseReducer.ChartData)
    console.log(weekData, "week data")
    const getWeeekData = () => {
        Dispatch(ExpenseData.getWeekChartData())
    }

    return (
        <div className={Style.BtnContainer} >
            <button className={Style.customButton} defaultChecked onClick={getWeeekData}>1 Week</button>
            <button className={Style.customButton}>1 Months</button>
            <button className={Style.customButton}>1 Years</button>
        </div>

    )
}

export default Button;