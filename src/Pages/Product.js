import React from "react"
import ExpenseForm from "../ExpenseComponents/ExpenseForm";
import ExpenseList from "../ExpenseComponents/ExpenseList";
import Container from "../UIComponents/Container";
import ExpenseChart from "../ExpenseComponents/ExpenseChart";
import ExDescription from "../ExpenseComponents/ExpenseDescrp";
import { useSelector } from "react-redux";


function Product() {
    const ShowExpDetails=useSelector(state=>state.ExpenseReducer.ShowDetails)
    console.log(ShowExpDetails,"from product")
    return (
        <React.Fragment>
            <ExpenseForm />
            <Container>
                <ExpenseList />
                {ShowExpDetails&&<ExDescription/>}
                <ExpenseChart />
            </Container>
        </React.Fragment>
    )
}

export default Product;