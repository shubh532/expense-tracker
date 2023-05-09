import Style from "./HomePage.module.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function HomePage() {
    return (
        <div className={Style.mainContainer}>
            <h1>WelCome To Expense Tracker</h1>
            <div className={Style.ProfileMessage}>
                <p>Your Profile is Incomplete</p>
                <Link to="/profile"><button>Complete Now</button></Link>
            </div>
        </div>
    )
}

export default HomePage;