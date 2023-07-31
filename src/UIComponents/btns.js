import Style from "./button.module.css"
import { useDispatch } from "react-redux";
import { ExpenseData } from "../ReduxStore/ExpenseStore";

function Button(props) {
    const Dispatch = useDispatch()

    const getData = (dayTitle) => {
        Dispatch(ExpenseData.getWeekChartData({day:dayTitle.day, title:dayTitle.title}))
    }

    return (
        <div className={Style.BtnContainer} >
            <button className={Style.customButton} onClick={()=>getData({day:7,title:"7 Days Data Track"})}>7D</button>
            <button className={Style.customButton} onClick={()=>getData({day:15, title:"15 Days Data Track"})}>15D</button>
            <button className={Style.customButton} onClick={()=>getData({day:30, title:"1 Months Data Track"})}>1M</button>
            <button className={Style.customButton} onClick={()=>getData({day:180, title:"6 Months Data Track"})}>6M</button>
            <button className={Style.customButton} onClick={()=>getData({day:365, title:"1 Years Data Track"})}>1Y</button>

        </div>

    )
}

export default Button;