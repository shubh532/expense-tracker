import { useContext } from "react";
import ExpenseCtx from "../ContextAPI/createExpenseCtx";
import Style from "./expenseList.module.css"

function ExpenseList() {
    const ExpenseData = useContext(ExpenseCtx)

    return (
        <div className={Style.ListContainer}>
            <table>
                <thead>
                    <tr className={Style.TableHeading}>
                        <th>Amount</th>
                        <th>Discription</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {ExpenseData.expenseData.map((item) => {
                        return (
                            <tr key={item.id} className={Style.tableList}>
                                <td>{item.Amount}</td>
                                <td>{item.Discription}</td>
                                <td>{item.Category}</td>
                                <td>{item.Date}</td>
                            </tr>)
                    })
                    }
                </tbody>
            </table>
            {ExpenseData.Loader && <div className={Style.LoadingTex}><h3>Adding Expense...</h3></div>}
        </div>
    )
}
export default ExpenseList;