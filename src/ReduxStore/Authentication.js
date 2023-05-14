import { createSlice } from "@reduxjs/toolkit"

const email=localStorage.getItem("Email")
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