import axios from "axios";
import { getDateInString } from "../../HelperFunc/getDates";

const FetchData = async (email) => {
    const tokenId = localStorage.getItem("TokenID")
    const Response = await axios.get(`http://localhost:4000/getExpense_data`, { headers: { "Authorization": tokenId } })
    const Data = Response.data.ExpenseData
    const extractData = []
    for (
        const key in Data
    ) {
        const Date = getDateInString(Data[key].Date)
        extractData.unshift({
            id:Data[key]._id,
            Amount: Data[key].Amount,
            Discription: Data[key].Discription,
            Category: Data[key].Category,
            Date: Date
        })
    }
    return extractData
}
export default FetchData;