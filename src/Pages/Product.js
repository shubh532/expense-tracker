import React,{ useEffect } from "react"
import { useSelector,useDispatch } from "react-redux";
import ExpenseForm from "../ExpenseComponents/ExpenseForm";
import ExpenseList from "../ExpenseComponents/ExpenseList";
import Container from "../UIComponents/Container";
import Chart from "../UIComponents/Chart";
import { fetchExpenseData } from "../ReduxStore/ExpenseStore";

function Product() {
    const email = useSelector(state => state.Authecation.email)
    const Dispatch=useDispatch()

    useEffect(() => {
        Dispatch(fetchExpenseData(email))
    }, [Dispatch, email])

    return (
        <React.Fragment>
            <ExpenseForm />
            <Container>
                <ExpenseList />
                <Chart />
            </Container>
        </React.Fragment>
    )
}

export default Product;