import { Dialog, DialogTitle, DialogActions, DialogContent, Button, DialogContentText } from "@mui/material";
import { useState } from "react";
import LoadingSpinner from "../pleaseWait/loadingSpinner/LoadingSpinner";
import { Trash2Outline } from "emotion-icons/evaicons-outline";
import DateTimeSelection from "../utils/DateTimeSelection";

export default function AccomodationModal(props) {
  const [mem, setMem] = useState([]);
  const [arrDate, setArrDate] = useState("")
  const [arrDepError, setArrDepError] = useState("")
  const [depDate, setDepDate] = useState("");
  const { oneRoom } = props

  let bookingDetails = { roomType: { roomId: props.roomType }, member: mem, memCheckInTime: arrDate, memCheckOutTime: depDate }
  const [memId, setMemId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const extempedAge = 5
  const teenAge = 10

  const checkAlreadyBooked = (memId) => {
    const found = props.membersAccomoBooked.filter((one) => one.dbDevId === memId)
    if (found.length === 0)
      return false;

    return true;
  }
  const checkAlreadySaved = (memId) => {
    const found = props.savedMembersForBooking.filter((one) => one.dbDevId === memId)
    if (found.length === 0)
      return false;

    return true;
  }
  const checkPendingApproval = (memId) => {
    const found = props.membersPendingApproval.filter((one) => one.dbDevId === memId)
    if (found.length === 0)
      return false;

    return true;
  }

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

    const found = props.yatraRegisteredUsers.filter(
      (one) => memId.toUpperCase() === one.dbDevId
    );
    if (found.length !== 0) {
      const existMem = mem.filter((one) => found[0].dbDevId == one.dbDevId);
      const memAdultCount = mem.filter((mem) => mem.dbDevAge > 10)
      if (memAdultCount.length < props.memCount || found[0].dbDevAge < 10) {
        if (existMem.length === 0) {
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

  const saveBookingDetails = () => {
    const memAdultCount = mem.filter((mem) => mem.dbDevAge > 10)
    if (bookingDetails.member.length < props.minMemCount) {
      setArrDepError(`Please Add atleast ${props.minMemCount} Members before Saving`);
    }
    else if(memAdultCount.length===0){
      setArrDepError("please select Atleast one Adult in the room");
    }
    else if (bookingDetails.memCheckInTime.length === 0) {
      setArrDepError("please select Arrival Date and Time");
    }
    else if (bookingDetails.memCheckOutTime.length === 0) {
      setArrDepError("please select Departure Date and Time");
    }
    else {
      props.onSave(bookingDetails)
      console.log(bookingDetails)
      setMem([]);
      setArrDate("");
      setDepDate("");
      props.onClose()
    }
  }

  const onClose = () => {
    setMem([]);
    setMemId("");
    setArrDate("");
    setDepDate("");
    props.onClose();
  }

  return (
    <>
      <Dialog open={props.open} onClose={onClose} >
        <DialogTitle sx={{ background: '-webkit-linear-gradient(180deg,#eee, #090979)', color: 'whitesmoke' }}> Add Booking Details</DialogTitle>
        <DialogContent>

          <div>

            <h2 className="text-center mb-4">Add Members to the room</h2>
            <div><p><i>You cannot accomodate more than {oneRoom.memberCount} adults in this room.</i></p></div>
            <form className="form-card" onSubmit={(e) => e.preventDefault()}>
              <div className="row justify text-left">
                <div className="form-group col-sm-8 flex-column d-flex">
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Enter Registration ID"
                    onChange={(e) => { setMemId(e.target.value); setErrorMessage(""); setArrDepError("") }}
                  />
                 </div> {props.yatraRegisteredUsers.length===0 ? <LoadingSpinner />:
                <button
                  className="form-group col-sm-2 flex-column d-flex btn btn-success "
                  onClick={handleSearch}
                  style={{    "alignItems": "center"}}
                >
                  Add
                </button>}
               
                <i style={{ width: "250px", color: "red", display: "block" }} >
                  {errorMessage}
                </i>
              </div>
              {errorMessage ? "" : <br />}
              <h5 className="text " style={{ display: "flex" }}>
                <div className="col">  Selected Members</div>
              </h5>

              <hr />

              <div className="accordion" id="accordionExample">
                {mem.length === 0 ? <><br /><br /><br /></> :
                  mem?.map(({ id, dbDevId, dbDevName, dbDevGender, dbDevAge }, index) => (
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
                          <button className="p-0 m-0 bg-transparent border-none text-red-600 hover:text-red-800 " onClick={(e) => handleRemove(e, index)}>
                          <Trash2Outline size={20}/>
                        </button>
                        </div>
                      </div>
                    </div>
                  ))}
                <hr />
                <div class="container">{arrDepError ? <p style={{  color: "red" }} >
                {arrDepError}</p>:""}</div> 
                <div className="container"><p><b style={{ color: "maroon" }}>
                Note: Accommodation is available only from {oneRoom.checkInTime} to {oneRoom.checkOutTime}. Apart from that duration (if any), devotees can make their own arrangements
                  </b>

                </p></div>
                <div>
                  <DateTimeSelection arrDate={arrDate} depDate={depDate} onArrivalUpdate={(value)=>{setArrDate(value); setArrDepError("")}} onDepartureUpdate={(value)=>{setDepDate(value); setArrDepError("")}}/>
                </div>
              </div>
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
          <Button onClick={onClose}
            color="success" >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}