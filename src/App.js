import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MemRegForm from './YatraMemRegForm/yatraRegForm';
import { useContext, useEffect, useState } from 'react';
import axiosGetUserDetail from './axios/axiosGetUserDetail';
import axiosGetAllUserDetail from './axios/axiosGetAllUserDetail';
import Home from './home/Home';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import PleaseWait from './pleaseWait/PleaseWait';
import { PleaseWaitContext } from './context/PleaseWaitContextProvider.js';
import { GET_ALL_USER_DETAIL } from './constants/apiConstant';
import axios from 'axios';

function App() {

  const{gWaitOn,setGWaitOn} = useContext(PleaseWaitContext)
  const [dbUserData,setDBUserData]=useState([]) 

  useEffect( ()=>{
    const fun = async()=>{
      setGWaitOn(true)
      const res = await axios.post(GET_ALL_USER_DETAIL)
      setDBUserData(res.data)
      setGWaitOn(false)
    }
    fun()
    
  },[])

  const template = () => (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Home dbUserData={dbUserData}/>
            }
          />
          <Route
            path="/yatraMemReg"
            element={
              <MemRegForm />
            }
          />
      </Routes>
      </BrowserRouter>
    </>
  );


  return <div className="App">{gWaitOn ? <PleaseWait/> : template()}</div>;

}

export default App;
