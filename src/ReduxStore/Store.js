import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Authentication"
import ExpenseReducer from "./ExpenseStore";

const Store=configureStore({
    reducer:{
        Authecation:AuthReducer,
        ExpenseReducer:ExpenseReducer
    }
})
export default Store;