import { Dialog,DialogTitle,DialogActions,DialogContent,Button,DialogContentText } from "@mui/material";
import { useContext, useState } from "react";
import {BookingDetailContext} from "../context/BookingDetailContextProvider";



export default function AccomodationModal(props){
  const {bookingDetails,setBookingDetail} = useContext(BookingDetailContext);
  const [membersName,setMembersName]=useState([]);
  
  
  const selectedMember=(e)=>{
    const bookingDetail={...bookingDetails}
    console.log(bookingDetail)
    setBookingDetail(bookingDetail);
    console.log(bookingDetails)
    
  }
  console.log(props.members);
    return (
        <>
          <Dialog open={props.open}  onClose={props.onClose} >
            <DialogTitle bgcolor="blue" color="whitesmoke"> Add Booking Details</DialogTitle>
            <DialogContent>
              <div className="table">
                <div className="row">
                  <div className="col " style={{width:"190px"}}>
              Select Members:
              </div>
              <div className="col">
             Arrival Date & Time: 
             </div>
                <div className="col">
             Depart Date & Time: 
                </div>
                </div>
                <div className="row">
                  <div className="col " >
               <select className="form-select" id="selectedMember"style={{height:"36px", width:"90px"}} onChange={(e)=>selectedMember(e)}>
                
               { props.members.map((e)=><option value={e.dbDevName} key={e.id}label={e.dbDevName}/>)}
              </select>
              </div>
              <div className="col">
             <input className="form-date" style={{height:"30px"}}type="datetime-local" onChange={()=>selectedMember}/>
                </div>
                <div className="col">
             <input className="form-date" style={{height:"30px"}}type="datetime-local" onChange={selectedMember}/>
                </div>
                </div>
                <div className="row">
                 {bookingDetails.selectedMembers}  {bookingDetails.arrivalDate} {bookingDetails.departDate}
                </div>
                </div>
              <DialogContentText>
                {props.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={props.onClose} 
                      color="success" >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }