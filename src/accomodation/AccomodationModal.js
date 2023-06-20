import { Dialog,DialogTitle,DialogActions,DialogContent,Button,DialogContentText } from "@mui/material";
import { useContext, useState } from "react";
import {BookingDetailContext} from "../context/BookingDetailContextProvider";



export default function AccomodationModal(props){
  const {bookingDetails,setBookingDetail} = useContext(BookingDetailContext);
  const [membersName,setMembersName]=useState([]);
  
  
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
               <select className="form-select" id="selectMember"style={{height:"36px", width:"90px"}} onChange={(e)=>selectedMember(e)}>
                
               { props.members.map((e)=><option value={e.dbDevName} key={e.id}label={e.dbDevName}/>)}
              </select>
              </div>
              <div className="col">
             <input className="form-date" id="arrDate" style={{height:"30px"}}type="datetime-local" onChange={(e)=>selectedMember(e)}/>
                </div>
                <div className="col">
             <input className="form-date" id="depDate" style={{height:"30px"}}type="datetime-local" onChange={selectedMember}/>
                </div>
                </div>
                <div className="row" style={{background:"pink"}}>
                 {bookingDetails.selectedMembers.map((e)=>e +" |")}  {bookingDetails.arrivalDate?.replace("T"," ")} | {bookingDetails.departDate?.replace("T"," ")}
                </div>
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