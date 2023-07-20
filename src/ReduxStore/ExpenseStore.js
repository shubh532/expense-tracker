import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DeleteFunction from "./ReduxHelpers/DeleteExpenseData";
import FetchData from "./ReduxHelpers/FetchData";
import { getNumericYearAndMonth } from "../HelperFunc/getDates";

const initialState = { Expense: [], Loader: false, TotalAmt: 0, MonthWiseData: [] }

const ExpenseSclice = createSlice({
    name: "ExpenseManger",
    initialState: initialState,
    reducers: {
        AddExpenseFunction(state, action) {
            state.Expense.push(action.payload)
        },
        DeleteFunction(state, action) {
            state.Expense = action.payload
        },
        UpdateFunction(state, action) {
            state.Expense = action.payload
        },
        Loader(state, action) {
            state.Loader = action.payload
        },
        TotalAmt(state, action) {
            state.TotalAmt = action.payload
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
    }
})

export const ExpenseData = ExpenseSclice.actions
export default ExpenseSclice.reducer

export const fetchExpenseData = createAsyncThunk("expenseData", FetchData)


export const DeleteExpenseFunction = createAsyncThunk("DeleteExpense", DeleteFunction)