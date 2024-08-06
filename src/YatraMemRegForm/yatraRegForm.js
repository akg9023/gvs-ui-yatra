import { useContext, useEffect, useState } from "react";
import "./yatraRegForm.css";
import axiosGetUserDetail from "../axios/axiosGetUserDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { upiGatewayPayment } from "../upipayment/UPIPayment";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";
import axios from "axios";
import LoadingSpinner from "../pleaseWait/loadingSpinner/LoadingSpinner";
import { Button, Menu, MenuItem, Card, Container, Typography, Badge, Paper, TableRow, TableCell, Divider,Input } from "@mui/material";
import { AddToQueue } from "@emotion-icons/boxicons-solid/AddToQueue";
import { CALCULATE_MEM_REG_AMOUNT, GVS_YATRA, GET_LIMITED_SINGLE_USER_DETAIL, GET_ALL_REG_MEM_ID, GET_LIMITED_USER_DEPENDENTS_DETAIL } from "../constants/Constants";

export default function MemRegForm() {
  const [memId, setMemId] = useState("");
  const [userDependentLimitedData, setUserDependentLimitedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dbRegMemIdList, setDBRegMemIdList] = useState("");
  const [mem, setMem] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
  const extempedAge = 5
  const teenAge = 10;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    const res2 = await axios.get(GET_LIMITED_USER_DEPENDENTS_DETAIL, { withCredentials: true });

    setUserDependentLimitedData(res2.data);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchDbRegMemIdList = async () => {

    const res1 = await axios.get(GET_ALL_REG_MEM_ID, { withCredentials: true });

    setDBRegMemIdList(res1.data);


  }

  useEffect(() => {
    if (!sessionStorage.getItem("userEmail")) navigate("/");
    fetchDbRegMemIdList();
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

  const handleSearch = async (e) => {
    e.preventDefault();

    if (checkAlreadyReg(memId.toUpperCase())) {
      setErrorMessage("Member already registered.");
      return;
    }


    setIsLoading(true);
    let searchData = null;
    const res1 = await axios.get(GET_LIMITED_SINGLE_USER_DETAIL + "/" + memId.toLocaleUpperCase(), { withCredentials: true }).catch((e) => { console.log("There is some error"); setIsLoading(false); });
    console.log(res1);
    res1 == undefined || res1.data === "" ? searchData = null : searchData = res1.data;
    console.log(searchData);
    addDataToList(searchData);

    // const found = dbUserData.filter(
    //   (one) => memId.toUpperCase() === one.id
    // );


    setIsLoading(false);
  };

  const addDataToList = (data) => {
    if (data !== null) {
      if (checkAlreadyReg(data.id.toUpperCase())) {
        setErrorMessage("Member already registered.");
        return;
      }
      //   const existMem = mem.filter((one) => found[0].id === one.id);
      const existMem = mem.filter((one) => data.id === one.id);
      if (existMem.length === 0) {
        console.log(data);
        //        setMem([...mem, found[0]]);
        setMem([...mem, data]);
      } else {
        setErrorMessage("Member already exists.");
      }
    } else {
      setErrorMessage("Member doesn't exist.");
    }

  }

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
        devoteeList: mem
      }
      setGWaitOn(true)
      const res = await axios.post(CALCULATE_MEM_REG_AMOUNT, req, { withCredentials: true })
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
    <div className="container-fluid px-1 py-2 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">{GVS_YATRA}</h1>
              <p className="lead">Organized by Haldia VOICE</p>
              <hr />
              <p className="lead"><b>20th to 24th November 2024 - Chitrakoot</b></p>
              <hr />
            </div>
          </div>
          <Card elevation={4} sx={{borderRadius:1}}>
            <Container>
              {/* <div className="container" style={{ display: "flex", "flexDirection": "column", "alignItems": "start" }}> */}
              <div className="row">
                <div className="col-sm">
                  {/* <span className="badge text-bg-secondary">Adult (Above 10) : Rs.2200/-</span> */}
                  <Paper className="badge text-bg-secondary">Adult (Above 10) : Rs.2200/-</Paper>
                </div>
                <div className="col-sm">
                  <Paper className="badge text-bg-secondary">Teens (Age less than or equal to 10) : Rs.1100/-</Paper>
                </div>
                <div className="col-sm">
                  <Paper className="badge text-bg-secondary">Child (Age less than or equal to 5) : FREE</Paper>
                </div>
              </div>


              {/* </div> */}
            </Container>

            <br />
            <Typography gutterBottom variant="h4" component="div">
              Register Members
            </Typography>

            {/* <h2 className="text-center mb-4">Register Members</h2> */}
            <form className="form-card" onSubmit={(e) => e.preventDefault()}>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-10 flex-column d-flex">
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      style={{margin:"1rem",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}

                      placeholder="Enter your Registration ID"
                      onChange={(e) => setMemId(e.target.value)}
                    />
                </div>
                <div
                  className="form-group col-sm-2 flex-column d-flex "
                  onClick={handleSearch}
                >
                  {isLoading ? <LoadingSpinner style={{ position: "relative", textAlign: "left" }} /> : <i className="bi bi-search search-icon" style={{margin:"1rem"}}/>}
                </div>
              </div>
              <br />
              <div className="row ">
                <h5 className="text col-sm-6" style={{ display: "flex", margin:"1rem" }}>
                  Added Members
                </h5>
                <Button
                  className="form-group col-sm-4 ms-auto"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  Add Dependents
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >{userDependentLimitedData.length == 0 ? <MenuItem>No record ...</MenuItem> : userDependentLimitedData.map((dev, index) => (
                  <><MenuItem key={dev.id} onClick={() => { addDataToList(dev); handleClose() }} style={{ noWrap: "clip" }}> {dev.id} | {dev.fname} | {dev.gender} | {dev.age <= extempedAge ? <span style={{ color: "orange" }}> Child</span> : dev.age <= teenAge ? <span style={{ color: "green" }}>Teen</span> : <span style={{ color: "olive" }}>Adult</span>}
                  </MenuItem><Divider /></>

                ))}
                </Menu>
              </div>
              <hr style={{margin:"1rem"}}/>
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

                <div className="form-group col-sm-3 ">
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
          </Card>

        </div>
      </div>
    </div>

  </>

  const closedTemplate = <>
    <h4 style={{ "color": "red" }}>Yatra Member Registration Closed.</h4>
  </>

  return (
    <>
      {template}
    </>
  );
}
