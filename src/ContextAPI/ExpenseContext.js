import axios from "axios";
import ExpenseCtx from "./createExpenseCtx";
import { useState } from "react";

function ExpenseCtxPrivider(props) {
    const [expense, AddExpense] = useState([])

    async function AddExpenseData(data) {
        console.log(data)
        try {
            const Response = await axios.post("https://expensetracker-data-default-rtdb.firebaseio.com/ExpenseData.json", data)
            console.log(Response)
        } catch (err) {
            console.log(err)
        }

        // AddExpense([...expense,data])
    }
    console.log(expense)

    const DefultValues = {
        expenseData: expense,
        AddExpenseData: AddExpenseData,
        mess: "work"
    }
    return (
        <ExpenseCtx.Provider value={DefultValues}>
            {props.children}
        </ExpenseCtx.Provider>
    )

}

export default ExpenseCtxPrivider