import axios from "axios";
import { getDateInString } from "../../HelperFunc/getDates";

const FetchData = async (email) => {
    const Response = await axios.get(`https://database-793d0-default-rtdb.firebaseio.com/${email}.json`)
    const Data = []
    for (const key in Response.data) {
        const Date = getDateInString(Response.data[key].Date)
        Data.unshift({
            id: key,
            Amount: Response.data[key].Amount,
            Discription: Response.data[key].Discription,
            Category: Response.data[key].Category,
            Date: Date
        })
    }
    return Data
}
export default FetchData;