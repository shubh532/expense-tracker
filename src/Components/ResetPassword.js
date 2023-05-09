import axios from "axios"
import Style from "./ResetPassWord.module.css"
import { useRef, useState } from "react"

function ResetPassword() {
    const[Loader,SetLoader]=useState(false)
    const getEmail=useRef()

    async function ResetPassWordHandler(e) {
        e.preventDefault()
        try{
            SetLoader(true)
            const Response=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDylzGVLX-rmTUX0T1v6RbDkssgdhg-ciI',{
                requestType:"PASSWORD_RESET",
                email:getEmail.current.value
            })
            if(Response.status===200){
                SetLoader(false)
                alert("Check your Mail Box")
            }
        }catch(err){
            console.log(err)
            SetLoader(false)
            alert("email not found")
        }
        
    }

    return (
        <div className={Style.FullScreen}>
            <div className={Style.FormContainer}>
                <form>
                    <h2>Reset Password</h2>
                    <div className={Style.inputContainer}>
                        <label>Email</label>
                        <input type="email" ref={getEmail} required></input>
                    </div>
                    <div className={Style.Btns} >
                        {Loader?<h2>Please Wait</h2>:<button onClick={ResetPassWordHandler}>Reset</button>}
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ResetPassword;