import Input from "../UIComponents/Input";
import Style from "./expenseList.module.css"
import { ExpenseData } from "../ReduxStore/ExpenseStore";
import {DeleteExpenseFunction, UpdateExpense } from "../ReduxStore/ExpenseStore";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function ExpenseTable() {
    const getAmount = useRef()
    const getCategory = useRef()
    const getDiscription = useRef()
    const getDate = useRef()
    const Dispatch = useDispatch()
    const {MonthWiseData, EditID } = useSelector(state => state.ExpenseReducer)
    const email = useSelector(state => state.Authecation.email)
    const EditFunction = (id) => {
        Dispatch(ExpenseData.EditingHandler(id))
    }

    const updateFunction = async (id) => {
        const EditedData = {
            Amount: getAmount.current.value,
            Discription: getDiscription.current.value,
            Category: getCategory.current.value,
            Date: getDate.current.value,
            email: email,
            id: id
        }
        Dispatch(UpdateExpense(EditedData))
    }

    const deleteFunction = (id) => {
        const emailId = { id: id, email: email }
        Dispatch(DeleteExpenseFunction(emailId))
    }

    return (
        <table>
            <thead>
                <tr className={Style.TableHeading}>
                    <th>Amount</th>
                    <th>Discription</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {MonthWiseData.map((item) => {
                    return (
                        <tr key={item.id} className={Style.tableList}>
                            {EditID === item.id ? <td><Input type={"number"} ref={getAmount} /></td> : <td>&#x20b9; {item.Amount}</td>}
                            {EditID === item.id ? <td><Input type={"text"} ref={getDiscription} /></td> : <td>{item.Discription}</td>}
                            {EditID === item.id ? <td><Input type={"text"} ref={getCategory} /></td> : <td>{item.Category}</td>}
                            {EditID === item.id ? <td><Input type={"date"} ref={getDate} /></td> : <td>{item.Date}</td>}
                            <td>{EditID === item.id ?
                                <button onClick={() => updateFunction(item.id)} className={Style.UpdateBtn}>&#10003;</button>
                                :
                                <button onClick={() => EditFunction(item.id)} className={Style.EditBtn}>edit</button>}
                                <button onClick={() => deleteFunction(item.id)} className={Style.RemoveBtn}>X</button></td>
                        </tr>)

                })
                }
            </tbody>
        </table>
    )
}
export default ExpenseTable