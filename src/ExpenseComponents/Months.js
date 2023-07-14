import React, { useCallback, useEffect } from "react";
import Style from "./Months.module.css"
import { useRef } from "react";
import { ExpenseData } from "../ReduxStore/ExpenseStore";
import { useSelector, useDispatch } from "react-redux";
function Months() {
    const GetMonth = useRef()
    // const defaultMonth = useSelector(state => state.ExpenseReducer.Month)
    const Month=new Date().toLocaleString('default', { month: 'long' })
    const Dispatch=useDispatch()


    const GetMonthHandler=useCallback(()=>{
        console.log(GetMonth.current.value,"GetMonth Handler")
        // Dispatch(ExpenseData.setMonthHandler(GetMonth.current.value))
        Dispatch(ExpenseData.GetMonthWiseData(GetMonth.current.value))
    },[])
    useEffect(()=>{
        GetMonthHandler()
    },[GetMonthHandler])

    console.log(Month)
    return (
        <select name="Months" ref={GetMonth} onChange={GetMonthHandler} className={Style.SelectMonths} >
            <option selected defaultValue={Month}>{Month}</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
            <option value="All">All</option>
        </select>)
}
export default Months;