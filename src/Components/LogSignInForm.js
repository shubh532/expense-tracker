import React, { useState, useRef } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import axios from "axios"
import { useDispatch } from "react-redux"
import Style from "./LogSignInForm.module.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { AuthActions } from "../ReduxStore/Authentication"


function LogSignInForm() {
    const [isLogin, SetisLogin] = useState(true)
    const [Loading, SetLoading] = useState(false)
    const [inpAlert, SetInpAlert] = useState(false)

    const Dispatch = useDispatch()

    const redirectPage = useHistory()

    const getEmail = useRef()
    const getPassWord = useRef()
    const getConfirmPassWord = useRef()

    function DontHaveAcHandler(e) {
        e.preventDefault()
        SetisLogin(prevStae => !prevStae)
    }
    async function LoginHandler(e) {
        e.preventDefault()
        try {
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
                Dispatch(AuthActions.Login(Response.data.idToken))
                localStorage.setItem("Email", Response.data.email)
                localStorage.setItem("TokenID", Response.data.idToken)
                alert("Successfully LogIn")
                SetLoading(false)
                redirectPage.replace("/")
            }
        } catch (error) {
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
                    <Link to="/reset-password"><span>Forgot Password..?</span></Link>
                </form> : <h1>Authentication...</h1>}
            </div>
    )
}
export default LogSignInForm;