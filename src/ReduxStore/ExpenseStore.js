import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DeleteFunction from "./ReduxHelpers/DeleteExpenseData";
import FetchData from "./ReduxHelpers/FetchData";
import UpdateExpenseHandler from "./ReduxHelpers/UpdateExpense";
import { getNumericYearAndMonth, getWeekDates } from "../HelperFunc/getDates";

const initialState = { Expense: [], Loader: false, MonthWiseData: [], EditID: null, ChartData: [],ChartTitle:"Not Define" }

const ExpenseSclice = createSlice({
    name: "ExpenseManger",
    initialState: initialState,
    reducers: {
        AddExpenseFunction(state, action) {
            state.Expense.unshift(action.payload)
        },
        EditingHandler(state, action) {
            state.EditID = action.payload
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
        },
        getWeekChartData(state, action) {
            const Days=action.payload.day
            state.ChartTitle= action.payload.title
            const week = getWeekDates(Days)
            state.ChartData = week.map(date => {
                const filterbyDate = state.Expense.filter(item => item.Date.slice(0, 6) === date)
                const SameDateSum = filterbyDate.reduce((sum, data) => sum + parseInt(data.Amount), 0)
                return {
                    Date: date,
                    amount: SameDateSum
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExpenseData.pending, (state) => {
            state.Loader = true
        })
        builder.addCase(fetchExpenseData.fulfilled, (state, action) => {
            state.Expense = action.payload
            state.Loader = false
        })
        builder.addCase(fetchExpenseData.rejected, (state) => {
            state.Loader = false
        })
        builder.addCase(DeleteExpenseFunction.pending, (state) => {
            state.Loader = true
        })
        builder.addCase(DeleteExpenseFunction.fulfilled, (state, action) => {
            const id = action.payload
            const Data = state.Expense.filter(item => item.id !== id)
            state.Expense = Data
            state.Loader = false
        })
        builder.addCase(DeleteExpenseFunction.rejected, (state) => {
            state.Loader = false
        })
        builder.addCase(UpdateExpense.pending, (state) => {
            state.Loader = true
        })
        builder.addCase(UpdateExpense.fulfilled, (state, action) => {
            const UpdatedData = action.payload
            const Data = state.Expense.map((item) => item.id === UpdatedData.id ? { ...UpdatedData } : item)
            state.Expense = Data
            state.EditID = null
            state.Loader = false
        })
        builder.addCase(UpdateExpense.rejected, (state) => {
            state.Loader = false
        })
    }
})

export const ExpenseData = ExpenseSclice.actions
export default ExpenseSclice.reducer

export const fetchExpenseData = createAsyncThunk("expenseData", FetchData)

export const UpdateExpense = createAsyncThunk("updateExpese", UpdateExpenseHandler)

export const DeleteExpenseFunction = createAsyncThunk("DeleteExpense", DeleteFunction)