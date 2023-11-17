import { useRef } from "react";
import Style from "./ExpenseForm.module.css"
import axios from "axios";
import { ExpenseData } from "../ReduxStore/ExpenseStore";
import { GreenButton } from "../UIComponents/btns";
import { useDispatch } from "react-redux";
import { disableDatesAfterToday, getDateInString } from "../HelperFunc/getDates";

function ExpenseForm() {
    const getAmount = useRef()
    const getDiscription = useRef()
    const getCategory = useRef()
    const getDate = useRef()
    const getPlace = useRef()

    const Dispatch = useDispatch()

    const currentDate = new Date().toJSON().slice(0, 10);


    async function AddExpenseData(data, tokenId) {
        Dispatch(ExpenseData.Loader(true))
        let email = localStorage.getItem("Email")
        try {
            const Response = await axios.post(`http://localhost:4000/postExpense`,
                { ...data },
                { headers: { "Authorization": tokenId } }
            )
            if (Response.status === 201) {
                console.log(Response)
                const Data = Response.data.dataValues
                console.log(Data)
                Dispatch(ExpenseData.AddExpenseFunction({ ...Data, Date: getDateInString(Data.Date), id: Data._id }))
                Dispatch(ExpenseData.Loader(false))
            }
        } catch (err) {
            console.log(err)
            Dispatch(ExpenseData.Loader(false))
        }
    }


    function AddExpenseHandler(e) {
        const userId = localStorage.getItem("userId")
        const tokenId = localStorage.getItem("TokenID")
        e.preventDefault()
        const data = {
            Amount: getAmount.current.value,
            Place: getPlace.current.value,
            Discription: getDiscription.current.value,
            Category: getCategory.current.value,
            date: getDate.current.value,
            userId: userId

        }
        AddExpenseData(data, tokenId)
    }

    return (
        <div className={Style.ExFormContainer}>
            <form>
                <div className={Style.InputContainer}>
                    <label>Amount</label>
                    <input type="number" ref={getAmount} placeholder="Amount you spent..?"></input>
                </div>
                <div className={Style.InputContainer}>
                    <label>Merchant</label>
                    <input type="text" ref={getPlace} placeholder="Where you spent..?"></input>
                </div>
                <div className={Style.InputContainer}>
                    <label>Discrption</label>
                    <input type="text" ref={getDiscription} placeholder="Add Note.."></input>
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
                <GreenButton onClickHandler={AddExpenseHandler}>Add Expense</GreenButton>
            </form>
        </div>
    )
}

export default ExpenseForm;