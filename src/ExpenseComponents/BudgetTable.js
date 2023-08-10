import Style from "./SideSecCompo.module.css"
import Card from "../UIComponents/Card"

export default function BudgetTable() {
    const budgetData = [{
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }, {
        category: "Grocery",
        amount: "10,000",
        saving: "2450"
    }]
    return (
    <Card>
        <table className={Style.budgetTbl}>
            <tr>
                <th>Category</th>
                <th>Budget</th>
                <th>Saving</th>
            </tr>
            {budgetData.map((item, index) => (
                <tr key={index}>
                    <td>{item.category}</td>
                    <td>{item.amount}</td>
                    <td>{item.saving}</td>
                </tr>
            ))}
        </table>
    </Card>
    );
}



