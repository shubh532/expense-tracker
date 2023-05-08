import Style from "./NavBar.module.css"

function NavBar() {
    return (
        <nav className={Style.NavContainer}>
            <div className={Style.HeadContaner}>
                <h1>
                    Expense Tracker
                </h1>
            </div>
            <div className={Style.NavTab} >
                <span>Home</span>
                <span>Products</span>
                <span>About Us</span>
            </div>
        </nav>
    )
}

export default NavBar;