import "./googlelogin.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  LOGIN_URL,
  CHECK_AUTHENTICATION_URL,
  PARENT_DOMAIN,
} from "../constants/Constants";
import Cookies from "js-cookie";
import { Box,Fab,CircularProgress } from "@mui/material";
import  {Google}  from '@emotion-icons/boxicons-logos/Google';
import  {Google3}  from '@emotion-icons/icomoon/Google3'
import { useAuth } from "../context/AuthContext";


export default function Home(props) {
  const [gWaitOn, setGWaitOn] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const {login,logout} = useAuth();

  setTimeout(() => {
    setErrMsg("");
  }, 4000);

  const handleClick = () => {
    setGWaitOn(true);
    Cookies.set("loginButton", "yatra", {
      expires: 1,
      domain: PARENT_DOMAIN,
      path: "/",
    });
  };

  const fetchData = async () => {
    Cookies.remove("loginButton", {
      path: "/",
      domain: "gaurangavedic.org.in",
    });
    setGWaitOn(true);
    const response = await fetch(CHECK_AUTHENTICATION_URL, {
      method: "GET",
      credentials: "include",
    }).catch((e) => {
      setErrMsg("please sign In...");
      setGWaitOn(false);
      logout();
    });

    const userData = await response.json();
    let { userEmail, roles, userName } = userData;
    login(userData);
    sessionStorage.setItem("userEmail", userEmail);
    sessionStorage.setItem("userName", userName);
    setGWaitOn(false);
    navigate("/dashboard");
  };

  useEffect(() => {
    fetchData().catch((e) => {
    });
  }, []);

  const template = (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-900 p-4 relative overflow-hidden" >

      {/* Glass Blur Background */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>

  
      <div className="relative w-full max-w-md bg-white/30 backdrop-blur-xl shadow-2xl border border-white/30 rounded-2xl p-8 text-center transform scale-105">
  
        {/* Logo + Name */}
        <div className="mb-6 p-4 bg-white/70 rounded-xl shadow-lg flex flex-col items-center">
          <img
            src="../images/HaldiaT4.png"
            alt="Gauranga Vedic Society"
            className="h-35 mb-4 drop-shadow-md"
            style={{ filter: 'brightness(0) saturate(100%) invert(36%) sepia(79%) saturate(630%) hue-rotate(180deg) brightness(60%) contrast(90%) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))'}}
          />
          <h2 className="text-2xl font-extrabold text-gray-900 drop-shadow">
            Gauranga Vedic Society
          </h2>
        </div>
  
  
        <p className="text-sm text-gray-800 mb-6">
          Login with your Google Account to continue
        </p>
  
        {gWaitOn ? (
          <div className="relative flex justify-center items-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow">
              <Google size={28} />
            </div>
            <div className="absolute">
              <CircularProgress size={68} sx={{ color: "white" }} />
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              setGWaitOn(true);
              handleClick();
              window.location.href = LOGIN_URL;
            }}
            className="w-full flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-gray-800 border border-gray-300 shadow-md rounded-lg px-4 py-2 font-semibold"
          >
            <Google3 size={20} />
            Sign in with Google
          </button>
        )}
  
      </div>
    </div>
  );
  return <>{template}</>;
}
