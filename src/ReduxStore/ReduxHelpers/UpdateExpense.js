import axios from "axios";
import { getDateInString } from "../../HelperFunc/getDates";

async function UpdateExpenseHandler(data) {
    const tokenId = localStorage.getItem("TokenID")
    const id = data.id
    const Data = {
        Amount: data.Amount,
        Discription: data.Description,
        Category: data.Category,
        date: data.Date
    }
    console.log(Data, data)
    const Response = await axios.put(`http://localhost:4000/updateExpense/${id}`, {...Data}, { headers: { "Authorization": tokenId } })
    console.log(Response)
    const UpdatedData = Response.data.dataValues
    return { ...data, Date: getDateInString(data.Date), id:data.id }
}


export default UpdateExpenseHandler