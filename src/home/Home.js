import { GoogleLogin } from "react-google-login";
import './googlelogin.css';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axiosGetAllUserDetail from "../axios/axiosGetLimitedUserDetail";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";

export default function Home(props) {

    const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate();

    setTimeout(() => {
        setErrMsg("")
    }, 4000)

    useEffect(() =>{
         if(sessionStorage.getItem("userEmail"))
            navigate("/dashboard")
    }, []);


    const googleFail = (e) => {
        console.log("google fial", e);
    };

    const responseGoogle = async (response) => {
        let { email, name, googleId } = response.profileObj;
        sessionStorage.setItem("userEmail",email)
        navigate("/dashboard")
    }
    return (
        <>
            <div className="row pt-5">
                <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-xs-6 offset-xs-3">
                    <div className="card text-center mx-auto" >
                        <div className="card-body login-card-body">
                            <h3>Welcome</h3>
                            <p className="mt-4">Login to your Account!!</p>
                            <GoogleLogin
                                className="signin-btn google-login-btn"
                                clientId="982316181452-h2um7ud51f9e70s6b3obb6bo003bugjs.apps.googleusercontent.com"
                                buttonText="Sign in with Google"
                                onSuccess={responseGoogle}
                                onFailure={googleFail}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>
                    </div>
                </div>
                <h6 hidden={errMsg.length != 0 ? false : true} style={{ color: "red" }}>{errMsg}</h6>
            </div>
        </>
    )
}
