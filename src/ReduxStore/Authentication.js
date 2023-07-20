import { createSlice } from "@reduxjs/toolkit"

let email = localStorage.getItem("Email")
if (email) {
    email = email.replace(/[.]/g, "")
    email = email.replace(/[@]/g, "")
}
const id=localStorage.getItem("TokenID")
const initialAuthState = { IsAuthenticate:id ,email:email, isLogin:localStorage.getItem("TokenID")?true:false}

const IsAuthenticateSlice = createSlice({
    name: "Authencation",
    initialState: initialAuthState,
    reducers: {
        Login(state, action) {
            state.IsAuthenticate = action.payload
            state.isLogin = !!state.IsAuthenticate
        },
        LogOut(state) {
            state.IsAuthenticate = null
            state.isLogin = !!state.IsAuthenticate
        }
    }
})



export const AuthActions = IsAuthenticateSlice.actions
export default IsAuthenticateSlice.reducer;