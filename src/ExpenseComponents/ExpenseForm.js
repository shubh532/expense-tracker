import { useContext,useRef } from "react";
import ExpenseCtx from "../ContextAPI/createExpenseCtx";
import Style from "./ExpenseForm.module.css"

function ExpenseForm() {
    const ExpenseData=useContext(ExpenseCtx)
    const getAmount=useRef()
    const getDiscription=useRef()
    const getCategory=useRef()
    const getDate=useRef()

    const currentDate = new Date().toJSON().slice(0, 10);

    function AddExpenseHandler(e){
        e.preventDefault()
        const data={
            Amount:getAmount.current.value,
            Discription:getDiscription.current.value,
            Category:getCategory.current.value,
            Date:getDate.current.value
        }
        ExpenseData.AddExpenseData(data)
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
                        <input type="date" defaultValue={`${currentDate}`} min="2018-07-22" ref={getDate}></input>
                    </div>
                    <div className={Style.InputContainer}>
                        <label>Category</label>
                        <select name="Category" ref={getCategory}>
                            <option value="Food">Food</option>
                            <option value="Medical">Petrol</option>
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