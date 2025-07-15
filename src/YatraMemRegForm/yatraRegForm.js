import { useContext, useEffect, useState } from "react";
import "./yatraRegForm.css";
import axiosGetUserDetail from "../axios/axiosGetUserDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { upiGatewayPayment } from "../upipayment/UPIPayment";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";
import axios from "axios";
import LoadingSpinner from "../pleaseWait/loadingSpinner/LoadingSpinner";
import { Button, Menu, MenuItem, Card, Container, Typography, Badge, Paper, TableRow, TableCell, Divider, Input, CircularProgress, Box } from "@mui/material";
import { PeopleSearch } from "@emotion-icons/fluentui-system-filled/PeopleSearch";
import { CALCULATE_MEM_REG_AMOUNT, GVS_YATRA, GET_LIMITED_SINGLE_USER_DETAIL, GET_ALL_REG_MEM_ID, GET_LIMITED_USER_DEPENDENTS_DETAIL } from "../constants/Constants";
import { Trash2Fill } from "emotion-icons/bootstrap";
import { Trash2Outline } from "emotion-icons/evaicons-outline";

export default function MemRegForm() {
  const [memId, setMemId] = useState("");
  const [userDependentLimitedData, setUserDependentLimitedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dbRegMemIdList, setDBRegMemIdList] = useState([]);
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
    const found = dbRegMemIdList?.filter((one) => one == memId)
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
    const res1 = await axios.get(GET_LIMITED_SINGLE_USER_DETAIL + "/" + memId.toLocaleUpperCase(), { withCredentials: true }).catch((e) => { console.error("There is some error"); setIsLoading(false); });
    res1 == undefined || res1.data === "" ? searchData = null : searchData = res1.data;
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
          <div className="jumbotron jumbotron-fluid pt-2 pb-4">
            <div className="container">
              <h1 className="display-4">{GVS_YATRA}</h1>
              <p className="lead">Organized by G.V.S.</p>
              <hr />
              <p className="lead"><b>7th to 12th September 2025 - Goverdhan</b></p>
              <hr />
            </div>
          </div>
          <Card elevation={4} sx={{ borderRadius: 1 }}>
            <Container>
              {/* <div className="container" style={{ display: "flex", "flexDirection": "column", "alignItems": "start" }}> */}
              <div className="row">
                <div className="col-sm">
                  {/* <span className="badge text-bg-secondary">Adult (Above 10) : Rs.2200/-</span> */}
                  <Paper className="badge text-bg-secondary">Adult (Above 10) : Rs.2500/-</Paper>
                </div>
                <div className="col-sm">
                  <Paper className="badge text-bg-secondary">Teens (Age less than or equal to 10) : Rs.1300/-</Paper>
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
              <div className="flex flex-wrap items-center gap-4">
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    style={{ margin: "1rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                    className="flex-1 min-w-[200px] px-3 py-2 rounded border shadow"
                    placeholder="Enter your Registration ID"
                    onChange={(e) => setMemId(e.target.value)}
                  />
                      <div className="w-full sm:w-auto flex justify-center">
                  {isLoading ? (<div className="flex items-center justify-center"> <CircularProgress /></div>) :
                    (<div className="text-blue-700 hover:text-orange-900 transition duration-200cursor-pointer flex justify-center items-center" onClick={handleSearch}>
                      <PeopleSearch size={30} />
                    </div>
                    )}
                    </div>
                <Button
                  className="flex items-center whitespace-nowrap"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ margin: 1 }}
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
              <br />
              <div className="row ">
                <h5 className="text col-sm-6" style={{ display: "flex", margin: "1rem" }}>
                  Added Members
                </h5>
              </div>
              <hr style={{ margin: "1rem" }} />
              <div className="accordion" id="accordionExample">
                {mem.length !==0 ? mem.map(({ id, fname, gender, age }, index) => (
                  <div key={id} className="flex justify-between items-center px-4 py-1 mx-4 my-1 border-b">

                        <div className="text-sm font-medium">
                          <h6 className="text-sm font-medium">
                            {index + 1} | {id} | {fname} | {gender} | {age <= extempedAge ? <span style={{ color: "orange" }}>Child</span> : age <= teenAge ? <span style={{ color: "green" }}>Teen</span> : <span style={{ color: "olive" }}>Adult</span>}
                          </h6>
                        </div>
                        <button className="p-0 m-0 bg-transparent border-none text-red-600 hover:text-red-800 " onClick={(e) => handleRemove(e, index)}>
                          <Trash2Outline size={20}/>
                        </button>
                    </div>
                )):<div className="text-sm font-medium">no one added yet..</div>
              }
              </div>
              <br />
              <p style={{ margin: "1rem", display: "flex", color: "red" }}>
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

  // const closedTemplate = <>
  //   <h4 style={{ "color": "red" }}>Yatra Member Registration Closed.</h4>
  // </>

  return (
    <>
      {template}
    </>
  );
}
