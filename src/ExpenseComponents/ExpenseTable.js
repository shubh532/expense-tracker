import Style from "./expenseList.module.css"
import { ExpenseData } from "../ReduxStore/ExpenseStore";
import { useDispatch, useSelector } from "react-redux";
import Message from "../UIComponents/Message";

function ExpenseTable() {
    const Dispatch = useDispatch()
    const { MonthWiseData } = useSelector(state => state.ExpenseReducer)

    const ShowExpDetailsHandler = (id) => {
        Dispatch(ExpenseData.ShowExpenseDetails())
        Dispatch(ExpenseData.getExpenseDetails(id))
    }
    return (
        <table>
            <thead>
                <tr className={Style.TableHeading}>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {MonthWiseData.length > 0 ? MonthWiseData.map((item) => {
                    return (
                        <tr onClick={() => ShowExpDetailsHandler(item.id)} key={item.id} className={Style.tableList}>
                            <td>&#x20b9; {item.Amount}</td>
                            <td>{item.Category}</td>
                            <td>{item.Date.slice(0, 6)}</td>
                        </tr>)
                }) :
                    <tr>
                        <td><Message message={"No expense found"} /></td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
export default ExpenseTable