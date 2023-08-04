import { useSelector } from "react-redux";
import Style from "./expenseList.module.css"
import ExpenseTable from "./ExpenseTable";
import Loading from "../UIComponents/Loader";
import Modal from "../UIComponents/Modal";

function ExpenseList() {

    const { Loader, MonthWiseData } = useSelector(state => state.ExpenseReducer)
    let TotalAmount = MonthWiseData.reduce((TotalAmt, item) => TotalAmt + parseInt(item.Amount), 0)

    return (
        <div className={Style.ListContainer}>
            <ExpenseTable />
            {Loader && <Modal> <Loading /></Modal>}
            <div className={Style.TotalContainer}><span>TotalExpense :</span><span>{TotalAmount} Rs</span></div>
        </div>
    )
}
export default ExpenseList;