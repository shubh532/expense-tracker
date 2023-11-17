import axios from "axios"
const DeleteFunction = async (emailId) => {
    const { id, email } = emailId
    const tokenId = localStorage.getItem("TokenID")
    await axios.delete(`http://localhost:4000/deleteExpense/${id}`,{ headers: { "Authorization": tokenId } })
    return id
}

export default DeleteFunction;