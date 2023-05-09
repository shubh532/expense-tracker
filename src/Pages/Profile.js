import { useRef, useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Style from "./Profile.module.css"
import ProfilePic from "../Media/ProfilePicImg.png"
import NameImg from "../Media/NameImg.png"
import SundarPichai from "../Media/Sundar-Pichai.png"
import TokenAPI from "../ContextAPI/TokenAPI"
import axios from "axios"

function Profile() {
    const [Loader, SetLoading] = useState(false)
    const [Name, SetName] = useState("")
    const [PhotoUrl, SetPhotoUrl] = useState("")

    const idToken = useContext(TokenAPI)

    const getName = useRef()
    const getProfileImg = useRef()
    useEffect(() => {
        async function GetDataFireBase() {
            SetLoading(true)
            try {
                const Response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDylzGVLX-rmTUX0T1v6RbDkssgdhg-ciI", {
                    idToken: idToken.TokenId
                })
                if (Response.status === 200) {
                    SetName(Response.data.users[0].displayName)
                    SetPhotoUrl(Response.data.users[0].photoUrl)
                    SetLoading(false)
                }
            } catch (err) {
                console.log(err)
                SetLoading(false)
                alert("some Error Occure")
            }
        }
        GetDataFireBase()
    }, [])

    async function verifyMail(e) {
        e.preventDefault()
        SetLoading(true)
        try {
            console.log("i am going to run")
            const Response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key= AIzaSyDylzGVLX-rmTUX0T1v6RbDkssgdhg-ciI", {
                requestType: "VERIFY_EMAIL",
                idToken: idToken.TokenId
            }, {
                headers: { "Content-Type": "application/json" }
            })
            if (Response.status===200){
                console.log(Response)
                SetLoading(false)
                alert("Email is Verified")
            }

        } catch (err) {
            console.log(err)
            alert("USER NOT Found SignUp Again")
        }
    }

    async function UpdatProfile(e) {
        e.preventDefault()
        SetLoading(true)
        try {

            const Response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key= AIzaSyDylzGVLX-rmTUX0T1v6RbDkssgdhg-ciI", {
                idToken: idToken.TokenId,
                displayName: getName.current.value,
                photoUrl: getProfileImg.current.value,
                returnSecureToken: true
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("i run ")
            if (Response.status === 200) {
                console.log(Response, "Succed")
                SetLoading(false)
                alert("successFully Updated")
            }
        } catch (err) {
            console.log(err)
            SetLoading(false)
            alert("some Error Occure")

        }


    }
    return (
        <div className={Style.ProfileContainer} >
            <Link to="/"><button className={Style.CancleBtn}>X</button></Link>
            <div className={Style.ProfilePic}>
                <img src={SundarPichai} alt="profile pic"></img>
            </div>
            <h1>Contact Deatails</h1>
            <form>
                <div className={Style.InpContainer}>
                    <div className={Style.ImgContainer}><img src={NameImg} alt="img"></img></div>
                    <div className={Style.Inp}>
                        <label>Full Name</label>
                        <input type="text" value={Name} onChange={(e) => SetName(e.target.value)} ref={getName} required></input>
                    </div>

                </div>
                <div className={Style.InpContainer}>
                    <div className={Style.ImgContainer}><img src={ProfilePic} alt="img"></img></div>
                    <div className={Style.Inp}>
                        <label>Profile Photo URl</label>
                        <input type="url" value={PhotoUrl} onChange={(e) => SetPhotoUrl(e.target.value)} ref={getProfileImg} required></input>
                    </div>

                </div>
            </form>
            {Loader ? <h2>Please Wait...</h2> : <button onClick={UpdatProfile}>Update</button>}

            <div className={Style.verifyMail}>
                <h3>{idToken.Email}</h3>
                {Loader?<h4>Verifying Email...</h4>:<button onClick={verifyMail}>Verify</button>}
            </div>
        </div>
    )
}

export default Profile