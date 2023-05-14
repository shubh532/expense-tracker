import Style from "./NavBar.module.css"
import profilepic from "../Media/Sundar-Pichai.png"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthActions } from "../ReduxStore/Authentication";
function NavBar() {

    const isLogin = useSelector(state => state.Authecation.isLogin)
    const TotalAmt = useSelector(state => state.ExpenseReducer.TotalAmt)

    const Dispatch = useDispatch()

    const redirectPage = useHistory()
    function LogOutHandler() {
        Dispatch(AuthActions.LogOut())
        redirectPage.replace("/login")
        localStorage.removeItem("TokenID")
        localStorage.removeItem("Email")
    }
    return (
        <nav className={Style.NavContainer}>
            <div className={Style.HeadContaner}>
                <h1>
                    Expense Tracker
                </h1>
            </div>
            <div className={Style.NavTab} >
                <Link to="/"><span>Home</span></Link>
                <Link to="/product"><span>Product</span></Link>
                <Link to="/abutus"><span>About Us</span></Link>
                <span>{TotalAmt >= 10000 && <button className={Style.PremiumBtn}>Premium</button>}</span>
            </div>
            <div className={Style.LogInOutBsns}>
                {isLogin && <button onClick={LogOutHandler} className={Style.LogOutBtn}>LogOut</button>}
                {!isLogin && <Link to="/login"><button className={Style.LogInBtn}>LogIn</button></Link>}
                {isLogin && <div className={Style.Profile}>
                    <Link to="/profile"><img src={profilepic} alt="Profile"></img></Link>
                </div>}
            </div>
        </nav>
    )
}

export default NavBar;