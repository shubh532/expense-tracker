import axios from "axios"
const DeleteFunction = async (emailId) => {
    const { id, email } = emailId
    await axios.delete(`https://database-793d0-default-rtdb.firebaseio.com/${email}/${id}.json`)
    return id
}

export default DeleteFunction;