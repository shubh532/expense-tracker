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
    const getName = useRef()
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
            const Response = await axios.post("http://localhost:4000/expense-login", {
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
                Dispatch(AuthActions.Login(Response.data.tokenId))
                localStorage.setItem("Email", Response.data.user.email)
                localStorage.setItem("TokenID", Response.data.tokenId)
                localStorage.setItem("userId",Response.data.user._id)
                alert("Successfully LogIn")
                SetLoading(false)
                redirectPage.replace("/")
            }
        } catch (err) {
            if (err.response.status === 400 || err.response.status === 404) {
                alert(err.response.data.message)
            } else if (err.response.status === 500) {
                alert("Server Error")
            } else {
                console.log(err,"jhgjjhb")
            }
            SetLoading(false)
        }

    }

    async function SignUpHandler(e) {
        e.preventDefault()
        if (getEmail.current.value === "" || getPassWord.current.value === "" || getConfirmPassWord.current.value === "") {
            SetInpAlert(true)
            return
        }
        try {
            SetLoading(true)
            SetInpAlert(false)
            const Response = await axios.post("http://localhost:4000/expense-authencation", {
                name:getName.current.value,
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
            alert(error.response.data.message)
        }
    }

    return (
            <div className={Style.FormContainer}>
                <h1>{isLogin ? "LogIn" : "Sign Up"}</h1>
                {inpAlert && <p>Please Enter Creadentials</p>}
                {!Loading ? <form >
                    {!isLogin && <div className={Style.inputContainer}>
                        <label>Name</label>
                        <input type="text" required ref={getName}></input>
                    </div>}
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