import Style from "./Input.module.css"
import { forwardRef } from "react"
import { disableDatesAfterToday } from "../HelperFunc/getDates"
function Input(props, ref) {
    return (
        <input 
        className={Style.Input} 
        type={props.type} 
        max={disableDatesAfterToday()}
        ref={ref}/>
    )
}
export default forwardRef(Input)