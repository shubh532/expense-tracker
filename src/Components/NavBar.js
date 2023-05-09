import Style from "./NavBar.module.css"
import profilepic from "../Media/Sundar-Pichai.png"
import { useContext } from "react";
import { Link,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TokenAPI from "../ContextAPI/TokenAPI";

function NavBar() {
    const LogStatus = useContext(TokenAPI)
    const redirectPage =useHistory()
    function LogOutHandler() {
        LogStatus.LogOut()
        redirectPage.replace("/login")
        localStorage.removeItem("TOkenID")
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
            </div>
            <div className={Style.LogInOutBsns}>
                {LogStatus.isLogin && <button onClick={LogOutHandler} className={Style.LogOutBtn}>LogOut</button>}
                {!LogStatus.isLogin && <Link to="/login"><button className={Style.LogInBtn}>LogIn</button></Link>}
                {LogStatus.isLogin &&<div className={Style.Profile}>
                    <Link to="/profile"><img src={profilepic} alt="Profile"></img></Link>
                </div>}
            </div>
        </nav>
    )
}

export default NavBar;