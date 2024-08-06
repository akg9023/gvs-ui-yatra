import "./googlelogin.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";
import {
  LOGIN_URL,
  CHECK_AUTHENTICATION_URL,
  PARENT_DOMAIN,
} from "../constants/Constants";
import Cookies from "js-cookie";
import LoadingSpinner from "../pleaseWait/loadingSpinner/LoadingSpinner";

export default function Home(props) {
  const [gWaitOn, setGWaitOn] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

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
    });

    const userData = await response.json();
    console.log("Auth response to json data ", userData);

    let { userEmail, roles, userName } = userData;
    sessionStorage.setItem("userEmail", userEmail);
    sessionStorage.setItem("userName", userName);
    setGWaitOn(false);
    navigate("/dashboard");
  };

  useEffect(() => {
    fetchData().catch((e) => {
      console.log("you are not loggedIn");
    });
  }, []);

  return (
    <>
      <div className="row pt-5">
        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-xs-6 offset-xs-3">
          <div className="card text-center mx-auto">
            <h5
              hidden={errMsg.length != 0 ? false : true}
              style={{ color: "red" }}
            >
              {errMsg}
            </h5>
            <div className="card-body login-card-body">
              <h3>Welcome</h3>
              <p className="mt-4">Login to your Account!!</p>
              {gWaitOn ? (
                <LoadingSpinner
                  style={{ position: "relative", textAlign: "left" }}
                />
              ) : (
                <button
                  className="google-login-button"
                  type="button"
                  text="Login"
                  onClick={() => {
                    handleClick();
                    setGWaitOn(true);
                  }}
                >
                  <a style={{ color: "white" }} href={LOGIN_URL}>
                    Login with Google
                  </a>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
