import './App.css';
import MemRegForm from './YatraMemRegForm/yatraRegForm';
import { useContext, useEffect, useState } from 'react';
import Home from './home/Home';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
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
import Admin from './admin/Admin';


function App() {

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
              <Timesup/>
               // <MemRegForm/>
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
          <Route
            path="/admin"
            element={
              <Admin />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );


  return <div className="App">{ template()}</div>;

}

export default App;
