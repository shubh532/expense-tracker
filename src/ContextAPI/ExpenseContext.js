import axios from "axios";
import ExpenseCtx from "./createExpenseCtx";
import { useEffect, useState } from "react";

function ExpenseCtxPrivider(props) {
    const [expense, AddExpense] = useState([])
    const [Loader, SetLoader] = useState(false)

    useEffect(() => {
        async function FetchData() {
            const Response = await axios.get("https://expensetracker-data-default-rtdb.firebaseio.com/ExpenseData.json")

            const Data=[]
            for (const key in Response.data){
                Data.push({
                    id:key,
                    Amount:Response.data[key].Amount,
                    Discription:Response.data[key].Discription,
                    Category:Response.data[key].Category,
                    Date:Response.data[key].Date
                })
            }
            AddExpense(Data)

        }
        FetchData()
    }, [])

    async function AddExpenseData(data) {
        SetLoader(true)
        try {
            const Response = await axios.post("https://expensetracker-data-default-rtdb.firebaseio.com/ExpenseData.json", { ...data })
            console.log(Response)
            if (Response.status === 200) {
                AddExpense([...expense, { ...data, id: Response.data.name }])
                console.log(expense)
                SetLoader(false)
            }
        } catch (err) {
            console.log(err)
            SetLoader(false)
        }
    }

    const DefultValues = {
        expenseData: expense,
        AddExpenseData: AddExpenseData,
        Loader: Loader,
        mess: "work"
    }
    return (
        <ExpenseCtx.Provider value={DefultValues}>
            {props.children}
        </ExpenseCtx.Provider>
    )

}

export default ExpenseCtxPrivider