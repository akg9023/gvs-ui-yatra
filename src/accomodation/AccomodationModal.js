import { Dialog,DialogTitle,DialogActions,DialogContent,Button,DialogContentText } from "@mui/material";
import { useContext, useState,useEffect} from "react";
import {BookingDetailContext} from "../context/BookingDetailContextProvider";


export default function AccomodationModal(props){
  const [mem, setMem] = useState([]);
  const [arrDate,setArrDate]=useState("")
  const [depDate,setDepDate]=useState("");
  let bookingDetails={roomType:{roomId:props.roomType},member:mem,memCheckInTime:arrDate,memCheckOutTime:depDate}
  console.log(props.savedMembersForBooking)
  console.log(props.yatraRegisteredUsers)
  const [memId, setMemId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const extempedAge = 5
  const teenAge = 10
 
  const checkAlreadyBooked = (memId) => {
    const found = props.membersAccomoBooked.filter((one) => one.dbDevId === memId)
    if (found.length == 0)
      return false;

    return true;
  }
  const checkAlreadySaved = (memId) => {
    const found = props.savedMembersForBooking.filter((one) => one.dbDevId === memId)
    if (found.length == 0)
      return false;

    return true;
  }
  const checkPendingApproval = (memId) => {
    const found = props.membersPendingApproval.filter((one) => one.dbDevId === memId)
    if (found.length == 0)
      return false;

    return true;
  }

  setTimeout(() => {
    setErrorMessage("")
  }, 10000)

  const handleSearch = (e) => {
    e.preventDefault();

    if (checkAlreadyBooked(memId.toUpperCase())) {
      setErrorMessage("Member already Booked.");
      return;
    }
    if (checkAlreadySaved(memId.toUpperCase())) {
      setErrorMessage("Member already Saved for Booking.");
      return;
    }
    if (checkPendingApproval(memId.toUpperCase())) {
      setErrorMessage("Member already in Approval Stage.");
      return;
    }

    const found =  props.yatraRegisteredUsers.filter(
      (one) => memId.toUpperCase() === one.dbDevId
    );
    if (found.length !== 0) {
      const existMem = mem.filter((one) => found[0].dbDevId == one.dbDevId);
      const memAdultCount=mem.filter((mem)=>mem.dbDevAge>10)
      if(memAdultCount.length<props.memCount){
      if (existMem.length == 0 ) {
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
    if(bookingDetails.member.length===0){
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
                {mem.map(({ id,dbDevId, dbDevName, dbDevGender, dbDevAge }, index) => (
                  <div key={id} className="container">
                    <div className="row align-items-start">
                      <div className="col">
                        <div style={{ display: "flex" }}>
                          <h6>
                            {index + 1} | {dbDevId} | {dbDevName} | {dbDevGender} | {dbDevAge <= extempedAge ? <span style={{ color: "orange" }}>Child</span> : dbDevAge <= teenAge ? <span style={{ color: "green" }}>Teen</span> : <span style={{ color: "olive" }}>Adult</span>}
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