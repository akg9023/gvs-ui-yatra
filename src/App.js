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
import { GET_ALL_REG_MEM_ID, GET_LIMITED_USER_DETAIL } from './constants/Constants';
import axios from 'axios';
import Dashboard from './dashboard/Dashboard';
import NavBar from './nav/NavBar';
import Success from './paymentResponse/Success';
import ManageMembers from './members/ManageMembers';
import PaymentForm from './manualPG/PaymentForm';
import Accomodation from './accomodation/Accomodation';
import ManualPaymentReview from './payment/ManualPaymentReview';
import AccomodataionPaymentFrom from './manualPG/AccomodataionPaymentFrom';
import ManageBookings from './accomodation/ManageBookings';
import Timesup from './timesup/Timesup';

function App() {

  const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
  const [dbUserData, setDBUserData] = useState([])
  const [dbRegMemIdList, setDBRegMemIdList] = useState([])
  const [dbBookedMemIdList, setDbBookedMemIdList] = useState([])


  useEffect(() => {

    //search function is being used Now
    // setGWaitOn(true)
    // const res1 = axios.get(GET_LIMITED_USER_DETAIL,{withCredentials:true})
    // res1.then(data => setDBUserData(data.data))
    // setGWaitOn(false);

    // setGWaitOn(true);
    // const res2 = axios.get(GET_ALL_REG_MEM_ID,{withCredentials:true})
    // res2.then(data => setDBRegMemIdList(data.data))
    // setGWaitOn(false);
    //   setGWaitOn(true)
    //    const res = await axios.post(GET_ALL_REG_MEM_ID)
    //   setDbBookedMemIdList(res.data)
    //   setGWaitOn(false)

  }, [])

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
            path="/ySpy"
            element={
              <MemRegForm/>
            }
          />
          <Route
            path="/yatraMemReg"
            element={
              // <Timesup/>
               <MemRegForm/>
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
              // <Timesup />
              <Accomodation/>
            }
          />
           <Route
            path="/ySpyAcc"
            element={
              <Accomodation />
            }
          />
          <Route
            path="/yAdmin"
            element={
              <ManualPaymentReview />
            }
          />
          <Route
            path="/payAcc"
            element={
              <AccomodataionPaymentFrom />
            }
          />

          <Route
            path="/manageBookings"
            element={
              <ManageBookings />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );


  return <div className="App">{gWaitOn ? <PleaseWait /> : template()}</div>;

}

export default App;
