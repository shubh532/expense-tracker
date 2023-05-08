import React, { useState, useRef } from "react"
import axios from "axios"
import Style from "./LogSignInForm.module.css"

function LogSignInForm() {
    const [isLogin, SetisLogin] = useState(true)
    const [Loading, SetLoading] = useState(false)

    const getEmail = useRef()
    const getPassWord = useRef()
    const getConfirmPassWord = useRef()

    function DontHaveAcHandler(e) {
        e.preventDefault()
        SetisLogin(prevStae => !prevStae)
    }
    function LoginHandler() {
        console.log("Hie")
    }

    async function SignUpHandler(e) {
        e.preventDefault()
        SetLoading(true)
        console.log("Chalo API")
        const Response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDylzGVLX-rmTUX0T1v6RbDkssgdhg-ciI", {
            email: getEmail.current.value,
            password: getPassWord.current.value,
            confirmPassword: getConfirmPassWord.current.value,
            returnSecreToken: true
        },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        const Data = Response
        console.log(Data)
        SetLoading(false)
    }

    return (
        <div className={Style.FormContainer}>
            <h1>Sign Up</h1>
            {!Loading ? <form >
                <div className={Style.inputContainer}>
                    <label>Email</label>
                    <input type="email" required ref={getEmail}></input>
                </div>
                <div className={Style.inputContainer}>
                    <label>Password</label>
                    <input type="password" required ref={getPassWord}></input>
                </div>
                {!isLogin && <div className={Style.inputContainer}>
                    <label>Coonfirm Password</label>
                    <input type="password" required ref={getConfirmPassWord}></input>
                </div>}
                <div className={Style.Btns } >
                    <button className={Style.logSignBtn} onClick={!isLogin ? SignUpHandler : LoginHandler} >{isLogin ? "LogIn" : "Sign Up"}</button>
                    <button className={Style.SwitchBtn} onClick={DontHaveAcHandler}>{isLogin ? "Don't Have Account" : "Have an account..? LogIn"}</button>
                </div>

            </form> : <h1>Authentication...</h1>}

        </div>

    )
}

export default LogSignInForm;