import { useContext } from "react";
import ExpenseCtx from "../ContextAPI/createExpenseCtx";
import Style from "./expenseList.module.css"

function ExpenseList() {
    const ExpenseData = useContext(ExpenseCtx)
    console.log(ExpenseData)

    return (
        <div className={Style.ListContainer}>
            <table>
                <tr className={Style.TableHeading}>
                    <th>Amount</th>
                    <th>Discription</th>
                    <th>Category</th>
                    <th>Date</th>
                </tr>
                {ExpenseData.expenseData.map((item)=>{
                    return(
                        <tr className={Style.tableList}>
                            <td>{item.Amount}</td>
                            <td>{item.Discription}</td>
                            <td>{item.Category}</td>
                            <td>{item.Date}</td>
                        </tr>
                    )
                })

                }

            </table>
        </div>
    )
}
export default ExpenseList;