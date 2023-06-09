import { Dialog,DialogTitle,DialogActions,DialogContent,Button,DialogContentText, Input, Select } from "@mui/material";
import { useState } from "react";



export default function AccomodationModal(props){
  const [roomBooked,setRoomBooked]=useState([]);
  const selectedMember=()=>{
    
  }
  console.log(props.members);
    return (
        <>
          <Dialog open={props.open}  onClose={props.onClose}>
            <DialogTitle bgcolor="blue" color="whitesmoke"> Add Booking Details</DialogTitle>
            <DialogContent>
              <div className="table">
                <div className="row">
                  <div className="col">
              Select Members: <select className="form-select" style={{height:"36px"}} onClick={selectedMember}>
                
               { props.members.map((e)=><option value={e.dbDevName} label={e.dbDevName}/>)}
              </select>
              </div>
              <div className="col">
             Arrival Date & Time: <input className="form-date" style={{height:"30px"}}type="datetime-local"/>
                {/* <Input name="seleted members" value={"hello"}></Input> */}
                </div>
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