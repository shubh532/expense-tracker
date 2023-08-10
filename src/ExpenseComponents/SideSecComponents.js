import Card from "../UIComponents/Card";
import Style from "./SideSecCompo.module.css"
import { GreenButton } from "../UIComponents/btns";

export function Salary() {
    const Amount = 50000
    const Salary = Amount.toLocaleString("en-IN")
    return (
        <Card>
            <div className={Style.Salary}>
                <div>
                    <h5>Toatal Monthly Income</h5>
                    <h2>{Salary} Rs</h2>
                </div>
                <GreenButton>+ Add Income</GreenButton>
            </div>
        </Card>
    )
}


export function MonthlyHomeBudget() {
    const Amount = 35000
    const Budget = Amount.toLocaleString("en-IN")
    return (
        <Card>
            <div className={Style.Salary}>
                <div>
                    <h5>Toatal Monthly Budget</h5>
                    <h2>{Budget} Rs</h2>
                </div>
                <GreenButton>Plan Budget</GreenButton>
            </div>
        </Card>
    )
}

export function Saving() {
    const Amount = 35000
    const Saving = Amount.toLocaleString("en-IN")
    return (
        <Card>
            <div className={Style.Saving}>
                <h4>Toatal Monthly Saving :</h4>
                <h2>{Saving} Rs</h2>
            </div>
        </Card>
    )
}




