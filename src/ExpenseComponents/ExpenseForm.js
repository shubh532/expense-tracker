import { useRef } from "react";
import Style from "./ExpenseForm.module.css"
import axios from "axios";
import { ExpenseData } from "../ReduxStore/ExpenseStore";
import { useDispatch } from "react-redux";
import { getDateInString,disableDatesAfterToday } from "../HelperFunc/getDates";

function ExpenseForm() {
    const getAmount = useRef()
    const getDiscription = useRef()
    const getCategory = useRef()
    const getDate = useRef()

    const Dispatch = useDispatch()

    const currentDate = new Date().toJSON().slice(0, 10);


    async function AddExpenseData(data) {
        Dispatch(ExpenseData.Loader(true))
        let email = localStorage.getItem("Email")
        if (email) {
            email = email.replace(/[.]/g, "")
            email = email.replace(/[@]/g, "")
        }
        try {
            const Response = await axios.post(`https://mailboxauth-default-rtdb.firebaseio.com/${email}.json`, { ...data })
            if (Response.status === 200) {
                Dispatch(ExpenseData.AddExpenseFunction({ ...data, id: Response.data.name }))
                Dispatch(ExpenseData.Loader(false))
            }
        } catch (err) {
            console.log(err)
            Dispatch(ExpenseData.Loader(false))
        }
    }


    function AddExpenseHandler(e) {
        e.preventDefault()
        const date=getDateInString(getDate.current.value)
        const data = {
            Amount: getAmount.current.value,
            Discription: getDiscription.current.value,
            Category: getCategory.current.value,
            Date:date
        }
        AddExpenseData(data)
    }

    return (
        <div className={Style.ExFormContainer}>
            <form>
                <div className={Style.InputContainer}>
                    <label>Amount</label>
                    <input type="number" ref={getAmount}></input>
                </div>
                <div className={Style.InputContainer}>
                    <label>Discrption</label>
                    <input type="text" ref={getDiscription}></input>
                </div>
                <div className={Style.InputContainer}>
                    <label>Date</label>
                    <input type="date" defaultValue={`${currentDate}`} min="2018-07-22" max={disableDatesAfterToday()} ref={getDate}></input>
                </div>
                <div className={Style.InputContainer}>
                    <label>Category</label>
                    <select name="Category" ref={getCategory}>
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Medical">Medical</option>
                        <option value="Salary">Salary</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button onClick={AddExpenseHandler}>Add Expense</button>
            </form>
        </div>
    )
}

export default ExpenseForm;