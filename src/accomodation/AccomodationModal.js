import { Dialog,DialogTitle,DialogActions,DialogContent,Button,DialogContentText } from "@mui/material";
import { useContext, useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {BookingDetailContext} from "../context/BookingDetailContextProvider";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider";
import axios from "axios";

export default function AccomodationModal(props){
  console.log(props.roomType)
  console.log(props.memCount)
  const [mem, setMem] = useState([]);
  const [arrDate,setArrDate]=useState("")
  const [depDate,setDepDate]=useState("");
  let bookingDetails={roomType:{roomId:props.roomType},members:mem,memCheckInTime:arrDate,memCheckOutTime:depDate}
  console.log(props.dbUserData);
  
  console.log(props.members);
  const [memId, setMemId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
  const extempedAge = 5
  const teenAge = 10

  useEffect(() => {
  }, []);
 
  const checkAlreadyReg = (memId) => {
    const found = props.dbRegMemIdList.filter((one) => one == memId)
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
      setErrorMessage("Member already Booked.");
      return;
    }

    const found =  props.dbUserData.filter(
      (one) => memId.toUpperCase() === one.id
    );
    if (found.length !== 0) {
      const existMem = mem.filter((one) => found[0].id === one.id);
      if(1){
      if (existMem.length === 0 ) {
        setMem([...mem, found[0]]);
      } else {
        setErrorMessage("Member already exists.");
      }
     }
     else {
      setErrorMessage("Selected members exceeds room capacity")
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

  const saveBookingDetails=()=>{
    console.log(bookingDetails)
    if(bookingDetails.members.length===0){
      setErrorMessage("Please Add Members before Saving");
    }
    else if(bookingDetails.memCheckInTime.length===0){
      setErrorMessage("please select Arrival Date and Time");
    }
    else if(bookingDetails.memCheckOutTime.length===0){
      setErrorMessage("please select Departure Date and Time");
    }
    else{
    props.onSave(bookingDetails)
    setMem([]);
    setArrDate("");
    setDepDate("");
    props.onClose()
    }
  }

    return (
        <>
          <Dialog open={props.open}  onClose={props.onClose} >
            <DialogTitle bgcolor="blue" color="whitesmoke"> Add Booking Details</DialogTitle>
            <DialogContent>
              
                <div className="card">

            <h2 className="text-center mb-4">Add Members to the room</h2>
            <form className="form-card" onSubmit={(e) => e.preventDefault()}>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-10 flex-column d-flex">
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Enter Registration ID"
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
               <td >  Selected Members</td> 
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
                <hr/>
                <h5>
               <td><a>Arrival: <input type="dateTime-local" id="arrDate"style={{height:"20px",fontSize:2}} onChange={(e)=>setArrDate(e.target.value)}></input></a><br/>
               <a>Depart: <input type="dateTime-local" id="depDate"style={{height:"20px",fontSize:2}} onChange={(e)=>setDepDate(e.target.value)}></input></a></td>
               </h5>
              </div>
              <br />
              <p style={{ display: "flex", color: "red" }}>
                {errorMessage}
              </p>
            </form>
          </div>          
              <DialogContentText>
                {props.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={saveBookingDetails} 
                      color="success" >
                Save
              </Button>
              <Button onClick={props.onClose} 
                      color="success" >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }