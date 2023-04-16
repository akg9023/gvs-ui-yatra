import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MemRegForm from './YatraMemRegForm/yatraRegForm';
import { useContext, useEffect, useState } from 'react';
import axiosGetUserDetail from './axios/axiosGetUserDetail';
import axiosGetAllUserDetail from './axios/axiosGetLimitedUserDetail';
import Home from './home/Home';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import PleaseWait from './pleaseWait/PleaseWait';
import { PleaseWaitContext } from './context/PleaseWaitContextProvider.js';
import {  GET_LIMITED_USER_DETAIL } from './constants/apiConstant';
import axios from 'axios';
import Dashboard from './dashboard/Dashboard';
import NavBar from './nav/NavBar';
import Success from './paymentResponse/Success';

function App() {

  const{gWaitOn,setGWaitOn} = useContext(PleaseWaitContext)
  const [dbUserData,setDBUserData]=useState([]) 

  useEffect( ()=>{
    const fun = async()=>{
      setGWaitOn(true)
      const res = await axios.post(GET_LIMITED_USER_DETAIL)
      setDBUserData(res.data)
      setGWaitOn(false)
    }
    fun()
    
  },[])

  const template = () => (
    <>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route
            index
            element={
              <Home/>
            }
          />
          <Route
            path="/yatraMemReg"
            element={
              <MemRegForm dbUserData={dbUserData}/>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard/>
            }
          />
          <Route
            path="/paymentDetails/:clientTxnId"
            element={
              <Success/>
            }
          />
      </Routes>
      </BrowserRouter>
    </>
  );


  return <div className="App">{gWaitOn ? <PleaseWait/> : template()}</div>;

}

export default App;
