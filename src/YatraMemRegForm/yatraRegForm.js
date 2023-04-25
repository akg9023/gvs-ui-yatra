import { useContext, useEffect, useState } from "react";
import "./yatraRegForm.css";
import axiosGetUserDetail from "../axios/axiosGetUserDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { upiGatewayPayment } from "../upipayment/UPIPayment";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";

export default function MemRegForm({ dbUserData, dbRegMemIdList }) {
  const [memId, setMemId] = useState("");
  const [mem, setMem] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
  const extempedAge = 5

  useEffect(() => {
    if (!sessionStorage.getItem("userEmail")) navigate("/");
  }, []);

  const checkAlreadyReg = (memId) =>{
      const found = dbRegMemIdList.filter((one)=>one==memId)
      if(found.length==0)
        return false;
      
      return true;
  }

  setTimeout(()=>{
     setErrorMessage("")
  },10000)

  const handleSearch = (e) => {
    e.preventDefault();

    if(checkAlreadyReg(memId.toUpperCase())){
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

  const handlePayment = (e) => {
    e.preventDefault();

    const childMem = mem.filter((one)=>one.age<=extempedAge)
    if(childMem.length == mem.length)
      setErrorMessage("Only children are not allowed. You may add one adult member.")
    else{
      setGWaitOn(true)
      upiGatewayPayment(mem,setGWaitOn);
    }

  };

  return (
    <>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <h3>Yatra 2023</h3>
            <p className="blue-text">
              11-Aug to 15-Aug<br />Vrindavan
            </p>
            <div className="card">
              <span className="badge text-bg-warning">Registration Fee: 1500/-</span>
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
                  {mem.map(({ id, fname, gender,age }, index) => (
                    <div key={id} className="container">
                      <div className="row align-items-start">
                        <div className="col">
                          <div style={{ display: "flex" }}>
                            <h6>
                              {index + 1} | {id} | {fname} | {gender} | {age<=extempedAge?<span style={{color:"orange"}}>Child</span> :<span style={{color:"olive"}}>Adult</span>}
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
  );
}
