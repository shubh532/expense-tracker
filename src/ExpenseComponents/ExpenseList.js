import { useContext, useRef, useState } from "react";
import ExpenseCtx from "../ContextAPI/createExpenseCtx";
import Style from "./expenseList.module.css"
import axios from "axios";

function ExpenseList() {
    const ExpenseData = useContext(ExpenseCtx)
    const [EditID, SetEditID] = useState(null)
    const getAmount = useRef()
    const getCategory = useRef()
    const getDiscription = useRef()
    const getDate = useRef()

    
    const EditFunction = (id) => {
        SetEditID(id)
    }
    const updateFunctionHandler = async (id) => {
        const EditedData = {
            Amount: getAmount.current.value,
            Discription: getDiscription.current.value,
            Category: getCategory.current.value,
            Date: getDate.current.value
        }
        SetEditID(null)
        ExpenseData.updateFunction(id,EditedData)
    }
    const DeleteExpense = (id) => {
        ExpenseData.DeleteFunction(id)

    }


    return (
        <div className={Style.ListContainer}>
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
                    {ExpenseData.expenseData.map((item) => {
                        return (
                            <tr key={item.id} className={Style.tableList}>
                                {EditID === item.id ? <td><input type="number" ref={getAmount} ></input></td> : <td>{item.Amount}</td>}
                                {EditID === item.id ? <td><input type="text" ref={getDiscription}></input></td> : <td>{item.Discription}</td>}
                                {EditID === item.id ? <td><input type="text" ref={getCategory}></input></td> : <td>{item.Category}</td>}
                                {EditID === item.id ? <td><input type="date" ref={getDate} defaultValue={item.Date}></input></td> : <td>{item.Date}</td>}
                                <td>{EditID === item.id ?
                                    <button onClick={() => updateFunctionHandler(item.id)} className={Style.UpdateBtn}>&#10003;</button>
                                    :
                                    <button onClick={() => EditFunction(item.id)} className={Style.EditBtn}>edit</button>}
                                    <button onClick={() => DeleteExpense(item.id)} className={Style.RemoveBtn}>X</button></td>
                            </tr>)
                    })
                    }
                </tbody>
            </table>
            {ExpenseData.Loader && <div className={Style.LoadingTex}><h3>Adding Expense...</h3></div>}
        </div>
    )
}
export default ExpenseList;