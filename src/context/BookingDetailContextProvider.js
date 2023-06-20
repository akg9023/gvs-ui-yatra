import { createContext,useState } from "react";

export const BookingDetailContext=createContext();

export default (props) => {
    const [bookingDetails, setBookingDetails] = useState({selectedMembers:["selected members:"],arrivalDate:"select arrival time",departDate:"select depart time"});
  
    return (
      <BookingDetailContext.Provider
        value={{ bookingDetails: bookingDetails, setBookingDetail: setBookingDetails }}
      >
        {props.children}
      </BookingDetailContext.Provider>
    );
  };;