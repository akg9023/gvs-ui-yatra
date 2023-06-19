import { createContext,useState } from "react";

export const BookingDetailContext=createContext();

export default (props) => {
    const [bookingDetails, setBookingDetails] = useState({selectedMembers:["saurav"],arrivalDate:"",departureDate:""});
  
    return (
      <BookingDetailContext.Provider
        value={{ bookingDetails: bookingDetails, setBookingDetail: setBookingDetails }}
      >
        {props.children}
      </BookingDetailContext.Provider>
    );
  };;