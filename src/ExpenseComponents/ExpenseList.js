import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Style from "./expenseList.module.css"
import Months from "./Months";
import Modal from "../UIComponents/Modal";
import { fetchExpenseData } from "../ReduxStore/ExpenseStore";
import ExpenseTable from "./ExpenseTable";



function ExpenseList() {
    const Dispatch = useDispatch()
    const { Loader, MonthWiseData } = useSelector(state => state.ExpenseReducer)
    const email = useSelector(state => state.Authecation.email)
    let TotalAmount = MonthWiseData.reduce((TotalAmt, item) => TotalAmt + parseInt(item.Amount), 0)

    useEffect(() => {
        Dispatch(fetchExpenseData(email))
    }, [Dispatch, email])

    return (
        <div className={Style.ListContainer}>
            {!Loader && <Months />}
            <ExpenseTable />
            {Loader && <Modal />}
            <div className={Style.TotalContainer}><span>TotalExpense :</span><span>{TotalAmount} Rs</span></div>
        </div>
    )
}
export default ExpenseList;