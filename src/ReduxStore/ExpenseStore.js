import { createSlice } from "@reduxjs/toolkit";

const initialState={Expense:[],Loader:false}

const ExpenseSclice=createSlice({
    name:"ExpenseManger",
    initialState:initialState,
    reducers:{
        AddExpenseFunction(state,action){
            state.Expense.push(action.payload)
        },
        DeleteFunction(state,action){
            state.Expense=action.payload
        },
        UpdateFunction(state,action){
            state.Expense=action.payload
        },
        Loader(state,action){
            state.Loader=action.payload
        }
    }
})

export const ExpenseData=ExpenseSclice.actions
export default ExpenseSclice.reducer