import { Fragment } from "react"
import ReactDOM from "react-dom"
import Style from "./Modal.module.css"

function BackDrop(props) {
    return (<div className={Style.BackDrop}></div>)
}
function ModalOverLay(props) {
    const style={
        height:props.height,
        width:props.width
    }
    return (
        <div style={style} className={Style.ModalOverLay}>{props.children}</div>)
}
const ParentElement = document.getElementById("OverLay")
console.log(ParentElement, "ParentElement")

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop />, ParentElement)}
            {ReactDOM.createPortal(<ModalOverLay height={props.height} width={props.width}
            >{props.children}</ModalOverLay>, ParentElement)}
        </Fragment>
    )
}
export default Modal;