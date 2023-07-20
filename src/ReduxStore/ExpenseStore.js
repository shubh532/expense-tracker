import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DeleteFunction from "./ReduxHelpers/DeleteExpenseData";
import FetchData from "./ReduxHelpers/FetchData";
import UpdateExpenseHandler from "./ReduxHelpers/UpdateExpense";
import { getNumericYearAndMonth } from "../HelperFunc/getDates";

const initialState = { Expense: [], Loader: false, MonthWiseData: [],EditID:null }

const ExpenseSclice = createSlice({
    name: "ExpenseManger",
    initialState: initialState,
    reducers: {
        AddExpenseFunction(state, action) {
            state.Expense.push(action.payload)
        },
        EditingHandler(state,action){
            state.EditID=action.payload
        },
        Loader(state, action) {
            state.Loader = action.payload
        },
        GetMonthWiseData(state, action) {
            if (action.payload === "") {
                state.MonthWiseData = state.Expense
            } else {
                state.MonthWiseData = state.Expense.filter(item => {
                    const month = getNumericYearAndMonth(item.Date)
                    return month === action.payload
                })

            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExpenseData.pending, (state) => {
            state.Loader = true
        })
        builder.addCase(fetchExpenseData.fulfilled, (state, action) => {
            state.Loader = false
            state.Expense = action.payload
        })
        builder.addCase(fetchExpenseData.rejected, (state) => {
            state.Loader = false
        })
        builder.addCase(DeleteExpenseFunction.pending, (state) => {
            state.Loader = true
        })
        builder.addCase(DeleteExpenseFunction.fulfilled, (state, action) => {
            state.Loader = false
            const id = action.payload
            const Data = state.Expense.filter(item => item.id !== id)
            state.Expense = Data
        })
        builder.addCase(DeleteExpenseFunction.rejected, (state) => {
            state.Loader = false
        })
        builder.addCase(UpdateExpense.pending, (state) => {
            console.log("up pen")
            state.Loader = true
        })
        builder.addCase(UpdateExpense.fulfilled, (state, action) => {
            state.Loader = false
            const UpdatedData=action.payload
            const Data=state.Expense.map((item)=>item.id===UpdatedData.id?{...UpdatedData}:item)
            state.Expense=Data
            state.EditID=null
        })
        builder.addCase(UpdateExpense.rejected, (state) => {
            state.Loader = false
        })
    }
})

export const ExpenseData = ExpenseSclice.actions
export default ExpenseSclice.reducer

export const fetchExpenseData = createAsyncThunk("expenseData", FetchData)

export const UpdateExpense =createAsyncThunk("updateExpese",UpdateExpenseHandler)

export const DeleteExpenseFunction = createAsyncThunk("DeleteExpense", DeleteFunction)