import { Dialog,DialogTitle,DialogActions,DialogContent,Button,DialogContentText } from "@mui/material";
import { useContext, useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {BookingDetailContext} from "../context/BookingDetailContextProvider";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider";
import axios from "axios";
import { AddCircle } from "@emotion-icons/fluentui-system-regular";


export default function AccomodationModal(props){
  const {bookingDetails,setBookingDetail} = useContext(BookingDetailContext);
  const [membersName,setMembersName]=useState([]);
  console.log(props.dbUserData);
  
  const selectedMember=(e)=>{
    console.log(e);
    switch (e.target.id) {
      case "selectMember":{
        let {selectedMembers}=bookingDetails
        selectedMembers=[...selectedMembers,e.target.value]
        const bookingDetail={...bookingDetails,selectedMembers}
        console.log(bookingDetail)
        setBookingDetail(bookingDetail);
        console.log(bookingDetails)}
        break;
      case "arrDate":{
         const bookingDetail={...bookingDetails,arrivalDate:`${e.target.value.toString()}`}
         setBookingDetail(bookingDetail);}
         break;
      case "depDate":{
        const bookingDetail={...bookingDetails,departDate:e.target.value.toString()}
         setBookingDetail(bookingDetail);}
         break;
      default:
        break;
    }
    
    
  }
  console.log(props.members);
  const [memId, setMemId] = useState("");
  const [mem, setMem] = useState([]);
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

      console.log("now save the data for further processing")
    }
  };

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
               <td><a>Arrival: <input type="dateTime-local" style={{height:"20px",fontSize:2}}></input></a><br/>
               <a>Depart: <input type="dateTime-local" style={{height:"20px",fontSize:2}}></input></a></td>
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
            <Button onClick={props.onClose} 
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