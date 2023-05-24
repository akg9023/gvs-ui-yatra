import { useContext, useEffect, useState } from "react";
import "./yatraRegForm.css";
import axiosGetUserDetail from "../axios/axiosGetUserDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { upiGatewayPayment } from "../upipayment/UPIPayment";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";
import axios from "axios";
import { CALCULATE_MEM_REG_AMOUNT } from "../constants/apiConstant";

export default function MemRegForm({ dbUserData, dbRegMemIdList }) {
  const [memId, setMemId] = useState("");
  const [mem, setMem] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
  const extempedAge = 5
  const teenAge = 10

  useEffect(() => {
    if (!sessionStorage.getItem("userEmail")) navigate("/");
  }, []);

  const checkAlreadyReg = (memId) => {
    const found = dbRegMemIdList.filter((one) => one == memId)
    if (found.length == 0)
      return false;

    return true;
  }

  setTimeout(() => {
    setErrorMessage("")
  }, 10000)

  const handleSearch = (e) => {
    e.preventDefault();

    if (checkAlreadyReg(memId.toUpperCase())) {
      setErrorMessage("Member already registered.");
      return;
    }

    const found = dbUserData.filter(
      (one) => memId.toUpperCase() === one.id
    );
    if (found.length !== 0) {
      const existMem = mem.filter((one) => found[0].id === one.id);
      if (existMem.length === 0) {
        setMem([...mem, found[0]]);
      } else {
        setErrorMessage("Member already exists.");
      }
    } else {
      setErrorMessage("Member doesn't exist.");
    }
  };

  const handleRemove = (e, i) => {
    e.preventDefault();
    const seggMem = mem.filter((a, index) => index !== i);
    setMem(seggMem);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const childMem = mem.filter((one) => one.age <= extempedAge)
    if (childMem.length == mem.length)
      setErrorMessage("Please add atleast one adult member.")
    else {

      // upiGatewayPayment(mem, setGWaitOn);
      const req = {
        userEmail: sessionStorage.getItem("userEmail"),
        devoteeList: mem
      }
      setGWaitOn(true)
      const res = await axios.post(CALCULATE_MEM_REG_AMOUNT, req)
      setGWaitOn(false)

      //transforming data as per memReg
      let memList = [];
      mem.map((one) => {
        memList = [...memList
          , {
          dbDevId: one.id,
          dbDevName: one.fname,
          dbDevGender: one.gender,
          dbDevAge: one.age
        }]
      })
      navigate("/paymentForm", { state: { memberList: memList, amount: res.data } })
    }

  };

  const template = <>
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">ISKCON YATRA</h1>
              <p class="lead">Organized by Haldia VOICE</p>
              <hr />
              <p class="lead"><b>11th to 15th August 2023 - Vrindavan</b></p>
              <hr />
            </div>
          </div>
          <div className="card">
            <div class="container" style={{ display: "flex", "flex-direction": "column", "alignItems": "start" }}>
              <div class="row">
                <div class="col-sm">
                  <span class="badge text-bg-secondary">Adult (Above 10) : Rs.2000/-</span>
                </div>
                <div class="col-sm">
                  <span class="badge text-bg-secondary">Teens (Age less than or equal to 10) : Rs.1000/-</span>
                </div>
                <div class="col-sm">
                  <span class="badge text-bg-secondary">Child (Age less than or equal to 5) : FREE</span>
                </div>
              </div>


            </div>

            <br />

            <h2 className="text-center mb-4">Register Members</h2>
            <form className="form-card" onSubmit={(e) => e.preventDefault()}>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-10 flex-column d-flex">
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Enter your Registration ID"
                    onChange={(e) => setMemId(e.target.value)}
                  />
                </div>
                <div
                  className="form-group col-sm-2 flex-column d-flex "
                  onClick={handleSearch}
                >
                  <i className="bi bi-search search-icon"></i>
                </div>
              </div>
              <br />
              <h5 className="text " style={{ display: "flex" }}>
                Added Members
              </h5>
              <hr />
              <div className="accordion" id="accordionExample">
                {mem.map(({ id, fname, gender, age }, index) => (
                  <div key={id} className="container">
                    <div className="row align-items-start">
                      <div className="col">
                        <div style={{ display: "flex" }}>
                          <h6>
                            {index + 1} | {id} | {fname} | {gender} | {age <= extempedAge ? <span style={{ color: "orange" }}>Child</span> : age <= teenAge ? <span style={{ color: "green" }}>Teen</span> : <span style={{ color: "olive" }}>Adult</span>}
                          </h6>
                        </div>
                      </div>
                      <div className="col-2">
                        <button onClick={(e) => handleRemove(e, index)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <p style={{ display: "flex", color: "red" }}>
                {errorMessage}
              </p>
              <div className="row justify-content-end">
                <div className="form-group col-sm-3">
                  <button
                    className="btn-block btn-primary"
                    disabled={mem.length === 0}
                    onClick={handlePayment}
                  >
                    Payment
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>

  </>

  const closedTemplate = <>
    <h4 style={{"color":"red"}}>Yatra Member Registration Closed.</h4>
  </>

  return (
    <>
      {closedTemplate}
    </>
  );
}
