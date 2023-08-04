import Style from "./Loader.module.css"
function Loading() {
    return (
        <div className={Style.LoaderContainer}>
            <h2> Adding Expense</h2>
            <div className={Style.ldspinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    )
}


export default Loading;