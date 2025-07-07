import './App.css';
import MemRegForm from './YatraMemRegForm/yatraRegForm';
import { useEffect } from 'react';
import Home from './home/Home';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import Success from './paymentResponse/Success';
import ManageMembers from './members/ManageMembers';
import PaymentForm from './manualPG/PaymentForm';
import Accomodation from './accomodation/Accomodation';
import ManualPaymentReview from './payment/ManualPaymentReview';
import AccomodataionPaymentFrom from './manualPG/AccomodataionPaymentFrom';
import ManageBookings from './accomodation/ManageBookings';
import Timesup from './timesup/Timesup';
import Admin from './admin/Admin';
import { useAuth } from './context/AuthContext';
import Layout from './nav/Layout';


function App() {

  const {user}=useAuth();
  useEffect(()=>{

  },[user])

  const template = () => (
    <>
      <BrowserRouter>
        {!user ?
         <Routes>
          <Route
            index
            path='*'
            element={
              <Home/>
            }
           />
           </Routes>
          :
          <>
          <Layout>
          <Routes>
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
          {user.roles?.filter((e) => e.name === "ROLE_ADMIN")?
          <Route
            path="/admin"
            element={
              <Admin />
            }
          />:<></>}
        </Routes>
        </Layout>
        </>
    }
      </BrowserRouter>
    </>
  );


  return <div className="App">{ template()}</div>;

}

export default App;
