import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Authentication"
import ExpenseReducer from "./ExpenseStore";
import ThemeReducer from "./ThemeReducer";

const Store=configureStore({
    reducer:{
        Authecation:AuthReducer,
        ExpenseReducer:ExpenseReducer,
        ThemeReducer:ThemeReducer
    }
})
export default Store;