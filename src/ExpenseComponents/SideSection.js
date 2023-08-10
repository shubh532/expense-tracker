import React from "react"
import Style from "./SideSection.module.css"
import BudgetTable from "./BudgetTable"
import { Salary, MonthlyHomeBudget,Saving } from "./SideSecComponents"

function SideSection() {
    return (
        <React.Fragment>
            <div className={Style.leftDiv}><Salary /></div>
            <div className={Style.rightDiv}><MonthlyHomeBudget /></div>
            <div className={Style.middleDiv}><BudgetTable /></div>
            <div className={Style.lowerDiv}><Saving/></div>
        </React.Fragment>
    )
}

export default SideSection