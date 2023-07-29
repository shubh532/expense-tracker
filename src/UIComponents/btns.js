import Style from "./button.module.css"

function Button(props) {
    return (
        <div className={Style.BtnContainer} >
            <button className={Style.customButton}>1 Week</button>
            <button className={Style.customButton}>1 Months</button>
            <button className={Style.customButton}>1 Years</button>
        </div>

    )
}

export default Button;