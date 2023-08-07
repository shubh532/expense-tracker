import Modal from "../UIComponents/Modal"
import Description from "./ExpenseDescrp"
import EditFrom from "../UIComponents/EditFrom"
import { useSelector } from "react-redux"
function ExpDetails() {
    const IsEdit = useSelector(state => state.ExpenseReducer.Editing.Edit)

    return (
        <Modal height={"75%"} width={"30%"}>
            {IsEdit ? <EditFrom /> : <Description />}
        </Modal>
    )
}


export default ExpDetails;