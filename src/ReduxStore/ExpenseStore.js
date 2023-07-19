import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
            state.Expense = []
        })
    }
})

export const ExpenseData = ExpenseSclice.actions
export default ExpenseSclice.reducer

export const fetchExpenseData = createAsyncThunk("expenseData", async () => {
    let email = localStorage.getItem("Email")
    if (email) {
        email = email.replace(/[.]/g, "")
        email = email.replace(/[@]/g, "")
    }
    const Response = await axios.get(`https://mailboxauth-default-rtdb.firebaseio.com/${email}.json`)
    const Data = []
    for (const key in Response.data) {
        Data.push({
            id: key,
            Amount: Response.data[key].Amount,
            Discription: Response.data[key].Discription,
            Category: Response.data[key].Category,
            Date: Response.data[key].Date
        })
    }
    return Data
})
