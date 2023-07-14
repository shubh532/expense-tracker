import { createSlice } from "@reduxjs/toolkit";
const Month=new Date().toLocaleString('default', { month: 'long' })
const initialState={Expense:[],Loader:false,TotalAmt:0,Month:Month, MonthWiseData:[]}

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
        },
        TotalAmt(state,action){
            state.TotalAmt=action.payload
        },
        setMonthHandler(state,action){
            state.Month=action.payload
        },
        GetMonthWiseData(state,action){
            
            if(action.payload==="All"){
                console.log(action,"form st")
                state.MonthWiseData=state.Expense
            }else{
                console.log("in Else COndition")
                state.MonthWiseData=state.Expense.filter(item=>{
                    const month = new Date(item.Date).toLocaleDateString('default', { month: 'long' })
                    return month===action.payload
                    
                })
               

            }
        }
    }
})

export const ExpenseData=ExpenseSclice.actions
export default ExpenseSclice.reducer