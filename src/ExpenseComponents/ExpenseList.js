import { useRef, useState, useEffect } from "react";
import { ExpenseData } from "../ReduxStore/ExpenseStore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Style from "./expenseList.module.css"
import Loader from "../UIComponents/Loader";

function ExpenseList() {
    const [EditID, SetEditID] = useState(null)
    const getAmount = useRef()
    const getCategory = useRef()
    const getDiscription = useRef()
    const getDate = useRef()

    const SendingData = useSelector(state => state.ExpenseReducer.Loader)
    const Expensedata = useSelector(state => state.ExpenseReducer.Expense)

    const Dispatch = useDispatch()

    const EditFunction = (id) => {
        SetEditID(id)
    }
    useEffect(() => {
        async function FetchData() {
            const Response = await axios.get("https://expensetracker-data-default-rtdb.firebaseio.com/ExpenseData.json")

            const Data = []
            for (const key in Response.data) {
                Data.push({
                    id: key,
                    Amount: Response.data[key].Amount,
                    Discription: Response.data[key].Discription,
                    Category: Response.data[key].Category,
                    Date: Response.data[key].Date
                })
            }
            Dispatch(ExpenseData.UpdateFunction(Data))
        }
        FetchData()
    }, [Dispatch])


    const updateFunction = async (id) => {
        const EditedData = {
            Amount: getAmount.current.value,
            Discription: getDiscription.current.value,
            Category: getCategory.current.value,
            Date: getDate.current.value
        }

        const Respons = await axios.put(`https://expensetracker-data-default-rtdb.firebaseio.com/ExpenseData/${id}.json`, EditedData)
        if (Respons.status === 200) {
            const UpdatedExpense = Expensedata.map((item) => item.id === id ? { ...Respons.data, id: id } : item)
            Dispatch(ExpenseData.UpdateFunction(UpdatedExpense))
            SetEditID(null)
        }

    }

    const DeleteFunction = async (id) => {

        const Response = await axios.delete(`https://expensetracker-data-default-rtdb.firebaseio.com/ExpenseData/${id}.json`)
        if (Response.status === 200) {
            const UpdateExpense = Expensedata.filter(item => id !== item.id)
            Dispatch(ExpenseData.DeleteFunction(UpdateExpense))
        }
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
                    {Expensedata.map((item) => {
                        return (
                            <tr key={item.id} className={Style.tableList}>
                                {EditID === item.id ? <td><input type="number" ref={getAmount} ></input></td> : <td>{item.Amount}</td>}
                                {EditID === item.id ? <td><input type="text" ref={getDiscription}></input></td> : <td>{item.Discription}</td>}
                                {EditID === item.id ? <td><input type="text" ref={getCategory}></input></td> : <td>{item.Category}</td>}
                                {EditID === item.id ? <td><input type="date" ref={getDate} defaultValue={item.Date}></input></td> : <td>{item.Date}</td>}
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
            {SendingData && <div className={Style.LoadingTex}><h3>Adding Expense</h3><Loader/></div>}
        </div>
    )
}
export default ExpenseList;