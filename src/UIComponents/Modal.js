import Loader from "../UIComponents/Loader"
import Style from "./Modal.module.css"

function Modal(){
    return(<div className={Style.BackDrop}>
        <div className={Style.ModalOverLay}><h2>Adding Data</h2><Loader/></div>
    </div>)
}

export default Modal