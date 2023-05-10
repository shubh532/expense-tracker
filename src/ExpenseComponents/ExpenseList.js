import { useContext } from "react";
import ExpenseCtx from "../ContextAPI/createExpenseCtx";

function ExpenseList() {
    const ExpenseData = useContext(ExpenseCtx)
    console.log(ExpenseData.expenseData)
    return (
        <ol>
            {ExpenseData.expenseData.map((item) => {
                return (<li key={item.id}>
                    {item.Money}-{item.Discription}-{item.Category}
                </li>)
            })}
        </ol >
    )
}
export default ExpenseList;