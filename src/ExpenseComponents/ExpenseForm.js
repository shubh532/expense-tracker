import { useContext,useRef } from "react";
import ExpenseCtx from "../ContextAPI/createExpenseCtx";
import Style from "./ExpenseForm.module.css"

function ExpenseForm() {
    const ExpenseData=useContext(ExpenseCtx)
    const getMoney=useRef()
    const getDiscription=useRef()
    const getCategory=useRef()

    function AddExpenseHandler(e){
        e.preventDefault()
        const data={
            id:Math.random(),
            Money:getMoney.current.value,
            Discription:getDiscription.current.value,
            Category:getCategory.current.value
        }
        ExpenseData.AddExpenseData(data)
        console.log(ExpenseData)
    }

    return (
            <div className={Style.ExFormContainer}>
                <form>
                    <div className={Style.InputContainer}>
                        <label>Money</label>
                        <input type="number" ref={getMoney}></input>
                    </div>
                    <div className={Style.InputContainer}>
                        <label>Discrption</label>
                        <input type="text" ref={getDiscription}></input>
                    </div>
                    <div className={Style.InputContainer}>
                        <label>Category</label>
                        <select name="Category" ref={getCategory}>
                            <option value="Food">Food</option>
                            <option value="Medical">Petrol</option>
                            <option value="mercedes">Medical</option>
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