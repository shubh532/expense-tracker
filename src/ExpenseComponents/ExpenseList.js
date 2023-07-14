import { useRef, useState, useEffect } from "react";
import { ExpenseData } from "../ReduxStore/ExpenseStore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Style from "./expenseList.module.css"
import Months from "./Months";
import Modal from "../UIComponents/Modal";
import Input from "../UIComponents/Input";

function ExpenseList() {
    const [EditID, SetEditID] = useState(null)
    const getAmount = useRef()
    const getCategory = useRef()
    const getDiscription = useRef()
    const getDate = useRef()
    const Dispatch = useDispatch()
    const isSendingData = useSelector(state => state.ExpenseReducer.Loader)
    const Expensedata = useSelector(state => state.ExpenseReducer.MonthWiseData)
    const TotalAmount = useSelector(state => state.ExpenseReducer.TotalAmt)


    useEffect(() => {
        const TotalAmt = () => {
            let TotalAmount = 0
            Expensedata.forEach((item) => {
                TotalAmount = parseInt(item.Amount) + TotalAmount
            })
            Dispatch(ExpenseData.TotalAmt(TotalAmount))
        }
        TotalAmt()
    }, [Expensedata, Dispatch])




    const EditFunction = (id) => {
        SetEditID(id)
    }
    useEffect(() => {
        async function FetchData() {
            let email = localStorage.getItem("Email")
            if (email) {
                email = email.replace(/[.]/g, "")
                email = email.replace(/[@]/g, "")
            }
            try {
                const Response = await axios.get(`https://mailboxauth-default-rtdb.firebaseio.com/${email}.json`)

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
            } catch (err) {
                console.log(err)
            }
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

        const Respons = await axios.put(`https://mailboxauth-default-rtdb.firebaseio.com//ExpenseData/${id}.json`, EditedData)
        if (Respons.status === 200) {
            const UpdatedExpense = Expensedata.map((item) => item.id === id ? { ...Respons.data, id: id } : item)
            Dispatch(ExpenseData.UpdateFunction(UpdatedExpense))
            SetEditID(null)
        }

    }

    const DeleteFunction = async (id) => {

        const Response = await axios.delete(`https://mailboxauth-default-rtdb.firebaseio.com/ExpenseData/${id}.json`)
        if (Response.status === 200) {
            const UpdateExpense = Expensedata.filter(item => id !== item.id)
            Dispatch(ExpenseData.DeleteFunction(UpdateExpense))
        }
    }

    // const MonthWiseData = Expensedata.filter(item => {
    //     const month = new Date(item.Date).toLocaleDateString('default', { month: 'long' })
    //     return month === selectedMonth
    // })



    return (
        <div className={Style.ListContainer}>
            <Months />
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
                                {EditID === item.id ? <td><Input type={"number"}/></td> : <td>&#x20b9; {item.Amount}</td>}
                                {EditID === item.id ? <td><Input type={"text"}/></td> : <td>{item.Discription}</td>}
                                {EditID === item.id ? <td><Input type={"text"}/></td> : <td>{item.Category}</td>}
                                {EditID === item.id ? <td><Input type={"date"}/></td> : <td>{item.Date}</td>}
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
            {isSendingData && <Modal />}
            <div className={Style.TotalContainer}><span>TotalExpense :</span><span>{TotalAmount} Rs</span></div>
        </div>
    )
}
export default ExpenseList;