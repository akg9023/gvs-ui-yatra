import './googlelogin.css';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axiosGetAllUserDetail from "../axios/axiosGetLimitedUserDetail";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";
import { LOGIN_URL,CHECK_AUTHENTICATION_URL } from '../constants/Constants';

export default function Home(props) {

    const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate();

    setTimeout(() => {
        setErrMsg("")
    }, 4000)

    const fetchData = async()=>{
        setGWaitOn(true);
        const response = await fetch(CHECK_AUTHENTICATION_URL,{
          method: 'GET',
          credentials: 'include',
        }).catch((e)=>{setErrMsg("An Error Occured")});
        
        const userData= await response.json();
        console.log("Auth response to json data ",userData);

        let { userEmail,roles } = userData;   
        sessionStorage.setItem("userEmail", userEmail);
        setGWaitOn(false)
        navigate("/dashboard")
        
    }

    useEffect(() =>{
         fetchData();
    }, []);

    return (
        <>
            <div className="row pt-5">
                <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-xs-6 offset-xs-3">
                    <div className="card text-center mx-auto" >
                        <div className="card-body login-card-body">
                            <h3>Welcome</h3>
                            <p className="mt-4">Login to your Account!!</p>
                            <button className="google-login-button" type='button' text='Login'><a style={{color:"white"}}href={LOGIN_URL}>Login with Google</a></button>
                        </div>
                    </div>
                </div>
                <h6 hidden={errMsg.length != 0 ? false : true} style={{ color: "red" }}>{errMsg}</h6>
            </div>
        </>
    )
}
