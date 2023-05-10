import React from "react"
import ExpenseForm from "../ExpenseComponents/ExpenseForm";
import ExpenseList from "../ExpenseComponents/ExpenseList";

function Product(){
    return(
        <React.Fragment>
            <ExpenseForm/>
            <ExpenseList/>
        </React.Fragment>
    )
}

export default Product;