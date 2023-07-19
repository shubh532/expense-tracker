import React, { useCallback, useEffect } from "react";
import Style from "./Months.module.css"
import { useRef } from "react";
import { ExpenseData } from "../ReduxStore/ExpenseStore";
import { useDispatch} from "react-redux";
import { getCurrentYearAndMonth } from "../HelperFunc/getDates";
function Months() {
    const GetMonth = useRef()
    const Dispatch=useDispatch()

    const yearAndMonth = getCurrentYearAndMonth();

    const GetMonthHandler=useCallback(()=>{
        Dispatch(ExpenseData.GetMonthWiseData(GetMonth.current.value))
    },[Dispatch])
    useEffect(()=>{
        GetMonthHandler()
    },[GetMonthHandler])

    return (
        <input type="month" defaultValue={yearAndMonth} name="Months" ref={GetMonth} onChange={GetMonthHandler} className={Style.SelectMonths} />)
}
export default Months;