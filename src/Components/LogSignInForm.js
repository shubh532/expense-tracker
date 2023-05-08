import React, { useState, useRef, useContext } from "react"
import axios from "axios"
import Style from "./LogSignInForm.module.css"
import TokenAPI from "../ContextAPI/TokenAPI"

function LogSignInForm() {
    const [isLogin, SetisLogin] = useState(true)
    const [Loading, SetLoading] = useState(false)
    const [inpAlert, SetInpAlert] = useState(false)

    const getEmail = useRef()
    const getPassWord = useRef()
    const getConfirmPassWord = useRef()

    const TokenManager = useContext(TokenAPI)

    function DontHaveAcHandler(e) {
        e.preventDefault()
        SetisLogin(prevStae => !prevStae)
    }
    async function LoginHandler(e) {
        e.preventDefault()
        try{
        SetLoading(true)
        const Response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDylzGVLX-rmTUX0T1v6RbDkssgdhg-ciI", {
            email: getEmail.current.value,
            password: getPassWord.current.value,
            returnSecreToken: true
        },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        if (Response.status === 200) {
            console.log(Response)
            localStorage.setItem("Email", Response.data.email)
            TokenManager.LogIn(Response.data.idToken)
            alert("Successfully LogIn")
            SetLoading(false)
        }
    }catch(error){
        alert("Invalid Credentials")
        SetLoading(false)
    }

    }

    async function SignUpHandler(e) {
        e.preventDefault()
        if (getEmail.current.value === "" || getPassWord.current.value === "" || getConfirmPassWord.current.value === "") {
            console.log("Chalo API")
            SetInpAlert(true)
            return
        }
        try {
            SetLoading(true)
            SetInpAlert(false)
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
        } catch (error) {
            SetLoading(false)
            console.log(error)
        }
    }

    return (
        <div className={Style.FormContainer}>
            <h1>{isLogin ? "LogIn" : "Sign Up"}</h1>
            {inpAlert && <p>Please Enter Creadentials</p>}
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
                    <label>Confirm Password</label>
                    <input type="password" required ref={getConfirmPassWord}></input>
                </div>}
                <div className={Style.Btns} >
                    <button className={Style.logSignBtn} onClick={!isLogin ? SignUpHandler : LoginHandler} >{isLogin ? "LogIn" : "Sign Up"}</button>
                    <button className={Style.SwitchBtn} onClick={DontHaveAcHandler}>{isLogin ? "Don't Have Account" : "Have an account..? LogIn"}</button>
                </div>

            </form> : <h1>Authentication...</h1>}

        </div>

    )
}

export default LogSignInForm;