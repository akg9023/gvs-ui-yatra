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
import { GET_ALL_REG_MEM_ID, GET_LIMITED_USER_DETAIL } from './constants/apiConstant';
import axios from 'axios';
import Dashboard from './dashboard/Dashboard';
import NavBar from './nav/NavBar';
import Success from './paymentResponse/Success';
import ManageMembers from './members/ManageMembers';
import PaymentForm from './manualPG/PaymentForm';
import Accomodation from './accomodation/Accomodation';
import AccomodataionPaymentFrom from './manualPG/AccomodataionPaymentFrom';

function App() {

  const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
  const [dbUserData, setDBUserData] = useState([])
  const [dbRegMemIdList, setDBRegMemIdList] = useState([])
  const [dbBookedMemIdList, setDbBookedMemIdList] = useState([])


  useEffect(() => {

    const fun = async () => {
      setGWaitOn(true)
      const res = await axios.post(GET_LIMITED_USER_DETAIL)
      setDBUserData(res.data)
      setGWaitOn(false)
    }

    const fun2 = async () => {
      setGWaitOn(true)
      const res = await axios.post(GET_ALL_REG_MEM_ID)
      setDBRegMemIdList(res.data)
      setGWaitOn(false)
    }
    const fun3 = async () => {
      setGWaitOn(true)
      const res = await axios.post(GET_ALL_REG_MEM_ID)
      setDbBookedMemIdList(res.data)
      setGWaitOn(false)
    }

    fun()
    fun2()
    fun3()

  }, [])

  const template = () => (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            index
            element={
              <Home />
            }
          />
          <Route
            path="/yatraMemReg"
            element={
              <MemRegForm dbUserData={dbUserData} dbRegMemIdList={dbRegMemIdList} />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard />
            }
          />
          <Route
            path="/paymentDetails/:clientTxnId"
            element={
              <Success />
            }
          />
          <Route
            path="/manageMem"
            element={
              <ManageMembers />
            }
          />
          <Route
            path="/paymentForm"
            element={
              <PaymentForm />
            }
          />
          <Route
            path="/accomodation"
            element={
              <Accomodation dbUserData={dbUserData} dbRegMemIdList={dbBookedMemIdList} />
            }
          />
          <Route
            path="/payAcc"
            element={
              <AccomodataionPaymentFrom />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );


  return <div className="App">{gWaitOn ? <PleaseWait /> : template()}</div>;

}

export default App;
