import React from "react"
import Style from "./Product.module.css"
import ExpenseForm from "../ExpenseComponents/ExpenseForm";
import ExpenseList from "../ExpenseComponents/ExpenseList";
import ExpenseChart from "../ExpenseComponents/ExpenseChart";
import ExpDetails from "../ExpenseComponents/ExpDetails";
import { useSelector } from "react-redux";
import SideSection from "../ExpenseComponents/SideSection";


function Product() {
    const ShowExpDetails = useSelector(state => state.ExpenseReducer.ShowDetails)
    console.log(ShowExpDetails, "from product")
    return (
        <div className={Style.Container}>
            <div className={Style.dashboard}><ExpenseForm /></div>
            <div className={Style.table}><ExpenseList /></div>
            <div className={Style.chart}><ExpenseChart /></div>
            <div className={Style.side_section}><SideSection/></div>
            {ShowExpDetails && <ExpDetails />}
        </div>
    )
}

export default Product;