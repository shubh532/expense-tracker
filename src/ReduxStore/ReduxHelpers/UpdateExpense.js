import axios from "axios";
import { getDateInString } from "../../HelperFunc/getDates";

async function UpdateExpenseHandler(data){
    const email=data.email
    const id=data.id
    const Data={
        Amount: data.Amount,
        Discription: data.Discription,
        Category: data.Category,
        Date: data.Date
    }
    console.log(Data)
    const Response=await axios.put(`https://database-793d0-default-rtdb.firebaseio.com/${email}/${id}.json`,Data)
    console.log(Response)
    return {...Response.data ,Date:getDateInString(Response.data.Date),id:id}
}


export default UpdateExpenseHandler