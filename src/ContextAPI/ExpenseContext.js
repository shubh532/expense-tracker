import ExpenseCtx from "./createExpenseCtx";
import { useState } from "react";

function ExpenseCtxPrivider(props){
    const[expense, AddExpense]=useState([])

    function AddExpenseData(data){
        AddExpense([...expense,data])
    }
    console.log(expense)

    const DefultValues={
        expenseData:expense,
        AddExpenseData:AddExpenseData,
        mess:"work"
    }
    return(
        <ExpenseCtx.Provider value={DefultValues}>
            {props.children}
        </ExpenseCtx.Provider>
    )

}

export default ExpenseCtxPrivider