import axios from "axios";

const FetchData = async (email) => {
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
    return Data
}
export default FetchData;