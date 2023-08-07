import Style from "./Editform.module.css"
import { useRef } from "react"
import { disableDatesAfterToday } from "../HelperFunc/getDates"
import { GreenButton, BlueButton } from "./btns"
import { useDispatch, useSelector } from "react-redux"
import Card from "./Card"
import { ExpenseData, UpdateExpense } from "../ReduxStore/ExpenseStore"
function EditForm() {
    const email = useSelector(state => state.Authecation.email)
    const id=useSelector(state=>state.ExpenseReducer.Editing.id)
    const getAmount = useRef()
    const getCategory = useRef()
    const getDate = useRef()
    const getPlace = useRef()
    const getDescription = useRef()


    const Dispatch = useDispatch()

    const UpdateExpenseHandler = (event) => {
        event.preventDefault()
        const EditedExpense = {
            Amount: getAmount.current.value,
            Description: getDescription.current.value,
            Category: getCategory.current.value,
            Date: getDate.current.value,
            Place: getPlace.current.value,
            email: email,
            id:id
        }
        Dispatch(UpdateExpense(EditedExpense))
        console.log(EditedExpense,"Edi")
    }

    const CancelHandler = () => {
        Dispatch(ExpenseData.EditingHandler(null))
    }

    return (
        <Card>
            <form className={Style.FormContainer}>
                <div className={Style.AmountContainer}>
                    <label>Amount</label>
                    <input type="number" placeholder="Amount you spent" ref={getAmount}></input>
                </div>
                <div className={Style.CategoryAndDate}>
                    <div className={Style.category}>
                        <label>Category</label>
                        <select name="Category" ref={getCategory}>
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Medical">Medical</option>
                            <option value="Salary">Salary</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className={Style.date}>
                        <label>Date</label>
                        <input type="Date" max={disableDatesAfterToday()} ref={getDate}></input>
                    </div>
                </div>
                <div className={Style.PlaceContainer}>
                    <label>Place</label>
                    <input type="text" placeholder="Where you spent" ref={getPlace}></input>
                </div>
                <div className={Style.DecrpContainer}>
                    <label>Description</label>
                    <textarea rows={5} cols={100} placeholder="Something you want to add...?" maxLength={50} ref={getDescription}></textarea>
                </div>
                <div className={Style.Btns}>
                    <GreenButton onClickHandler={(event)=>UpdateExpenseHandler(event)}>Update Expense</GreenButton>
                    <BlueButton onClickHandler={() => CancelHandler()}>Cancel</BlueButton>
                </div>
            </form>
        </Card>

    )
}
export default EditForm;