import { Dialog, DialogTitle, DialogActions, DialogContent, Button, DialogContentText } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { BookingDetailContext } from "../context/BookingDetailContextProvider";
import LoadingSpinner from "../pleaseWait/loadingSpinner/LoadingSpinner";

export default function RegMemModal(props) {

  let bookingDetails = props.bookingDetails
  let savedMembersForBooking = props.savedMembersForBooking
  let setBookingDetails = props.setBookingDetails
  let setSavedMembersForBooking = props.setSavedMembersForBooking

  const onClose = () => {
    props.onClose();
  }

  const handleRemove = (e, i) => {
    const removeSavedMems = savedMembersForBooking.filter((element) => !e.member.includes(element))
    //  console.log("removed",removeSavedMems)
    const removeBooking = bookingDetails?.filter((a, index) => index !== i);
    props.onRemoveIncreaseRoomCount(e);
    setBookingDetails(removeBooking);
    setSavedMembersForBooking(removeSavedMems);
    if(removeBooking.length===0)
    props.onClose();
    
};

  return (
    <>
      <Dialog open={props.open} onClose={onClose} >
        <DialogTitle bgcolor="blue" color="whitesmoke">Booking Details</DialogTitle>
        <DialogContent>
          <div>
            {bookingDetails?.map((e, index) => (
              <div className="row " key={index}>
                <table className="table" >
                  <tbody>
                    <tr scope="row"><th scope="col" style={{ width: "100px" }}>Room Id</th>
                      <th scope="col" style={{ width: "390px" }}>Added Members</th>
                      <th scope="col" style={{ width: "190px" }}>Arrival Time</th>
                      <th scope="col" style={{ width: "190px" }}>Depart Time</th>
                      <th scope="col" style={{ width: "90px" }}>Action</th></tr>

                    <tr>
                      <td style={{ width: "100px" }}> {e.roomType?.roomId} </td>
                      <td style={{ width: "390px" }}> {e.member?.map((e) => (e.dbDevName + " | "))} </td>
                      <td style={{ width: "190px" }}>  {e?.memCheckInTime.replace("T", " ")} </td>
                      <td style={{ width: "190px" }}> {e?.memCheckOutTime.replace("T", " ")}  </td>
                      <td style={{ width: "90px" }}>
                        <button onClick={() => handleRemove(e, index)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>

                </table>
              </div>
            ))}

          </div>
        </DialogContent>
        <DialogActions>


          <Button onClick={onClose}
            color="success" >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}