import axios from "axios"
const DeleteFunction = async (emailId) => {
    const { id, email } = emailId
    await axios.delete(`https://mailboxauth-default-rtdb.firebaseio.com/${email}/${id}.json`)
    return id
}

export default DeleteFunction;