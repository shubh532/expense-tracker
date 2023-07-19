import { useRef, useState, useEffect } from "react";
import { ExpenseData } from "../ReduxStore/ExpenseStore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Style from "./expenseList.module.css"
import Months from "./Months";
import Modal from "../UIComponents/Modal";
import Input from "../UIComponents/Input";
import { fetchExpenseData } from "../ReduxStore/ExpenseStore";

function ExpenseList() {
    const [EditID, SetEditID] = useState(null)
    const getAmount = useRef()
    const getCategory = useRef()
    const getDiscription = useRef()
    const getDate = useRef()
    const Dispatch = useDispatch()
    const {Loader,MonthWiseData, TotalAmt } = useSelector(state => state.ExpenseReducer)
    useEffect(() => {
        const TotalAmt = () => {
            let TotalAmount = 0
            MonthWiseData.forEach((item) => {
                TotalAmount = parseInt(item.Amount) + TotalAmount
            })
            Dispatch(ExpenseData.TotalAmt(TotalAmount))
        }
        TotalAmt()
    }, [MonthWiseData, Dispatch])




    const EditFunction = (id) => {
        SetEditID(id)
    }

    useEffect(() => {
        Dispatch(fetchExpenseData())
    }, [Dispatch])


    const updateFunction = async (id) => {
        const EditedData = {
            Amount: getAmount.current.value,
            Discription: getDiscription.current.value,
            Category: getCategory.current.value,
            Date: getDate.current.value
        }

        const Respons = await axios.put(`https://mailboxauth-default-rtdb.firebaseio.com//ExpenseData/${id}.json`, EditedData)
        if (Respons.status === 200) {
            const UpdatedExpense = MonthWiseData.map((item) => item.id === id ? { ...Respons.data, id: id } : item)
            Dispatch(ExpenseData.UpdateFunction(UpdatedExpense))
            SetEditID(null)
        }

    }

    const DeleteFunction = async (id) => {
        const Response = await axios.delete(`https://mailboxauth-default-rtdb.firebaseio.com/ExpenseData/${id}.json`)
        if (Response.status === 200) {
            const UpdateExpense = MonthWiseData.filter(item => id !== item.id)
            Dispatch(ExpenseData.DeleteFunction(UpdateExpense))
        }
    }

    return (
        <div className={Style.ListContainer}>
            {!Loader&&<Months />}
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
                                {EditID === item.id ? <td><Input type={"number"} /></td> : <td>&#x20b9; {item.Amount}</td>}
                                {EditID === item.id ? <td><Input type={"text"} /></td> : <td>{item.Discription}</td>}
                                {EditID === item.id ? <td><Input type={"text"} /></td> : <td>{item.Category}</td>}
                                {EditID === item.id ? <td><Input type={"date"} /></td> : <td>{item.Date}</td>}
                                <td>{EditID === item.id ?
                                    <button onClick={() => updateFunction(item.id)} className={Style.UpdateBtn}>&#10003;</button>
                                    :
                                    <button onClick={() => EditFunction(item.id)} className={Style.EditBtn}>edit</button>}
                                    <button onClick={() => DeleteFunction(item.id)} className={Style.RemoveBtn}>X</button></td>
                            </tr>)

                    })
                    }
                </tbody>
            </table>
            {Loader && <Modal />}
            <div className={Style.TotalContainer}><span>TotalExpense :</span><span>{TotalAmt} Rs</span></div>
        </div>
    )
}
export default ExpenseList;