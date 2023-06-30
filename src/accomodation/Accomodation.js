
import { useContext, useEffect, useState } from "react"
import "./acc.css"
import axios from "axios"
import PleaseWait from "../pleaseWait/PleaseWait.js"
import { GET_ALL_ROOMS,YATRA_REGISTERED_MEMBERS,FETCH_ALL_APPROVED_MEMBERS,FETCH_ALL_PENDING_MEMBERS,SAVE_ACCOMODATAION_DETAIL_WITHOUT_PAYMENT } from "../constants/apiConstant"
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js"
import AccomodationModal from "./AccomodationModal"
import { useNavigate } from "react-router-dom"


export default () => {
    const [isOpen,setIsOpen]=useState(false)
    const [bookingDetails,setBookingDetails]=useState([])
    const [roomType,setRoomType]=useState("")
    const [memCount,setMemCount]=useState()
    const [regMemDetails, setRegMemDetails] = useState([])
    const [membersListForBooking,setMembersListForBooking]=useState([])
    const [membersAccomoBooked,setMembersAccomoBooked]=useState([])
    const [membersPendingApproval,setMembersPendingApproval]=useState([])
    const [successMem, setSuccessMem] = useState([])
    const [rooms, setRooms] = useState([1])
    const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
    const [savedMembersForBooking,setSavedMembersForBooking]=useState([])
    const navigate = useNavigate();
    
    const getMembers = (regMemDetails) => {
        let temp = []
        regMemDetails.map((one) => {
            if (one.paymentStatus == "success") {
                let memList = one.memberIdList
                temp = [...temp, ...memList]
            }

        })
        setSuccessMem(temp)
    }
     const saveBookingData=(e)=>{
       // console.log(e);
        setBookingDetails([...bookingDetails,e])
        setSavedMembersForBooking([...savedMembersForBooking,...e.member])
      //  console.log(bookingDetails)
     }
    useEffect(() => {

             setGWaitOn(true)
        //     const regMemRes = await axios.post(GET_ALL_REG_MEM_DETAILS, { email: "saurav109677@gmail.com" })
        //     setRegMemDetails(regMemRes.data)
        //     getMembers(regMemRes.data)
            const res = axios.post(GET_ALL_ROOMS)
            res.then(data => setRooms(data.data))
             
            const memRes = axios.post(YATRA_REGISTERED_MEMBERS)
            memRes.then(data => setMembersListForBooking(data.data))
            const memBookedRes = axios.post(FETCH_ALL_APPROVED_MEMBERS)
            memBookedRes.then((data) => setMembersAccomoBooked(data.data))
            const memsPendingRes = axios.post(FETCH_ALL_PENDING_MEMBERS)
            memsPendingRes.then((data) => setMembersPendingApproval(data.data))
            setGWaitOn(false)
        

    }, [])
    const handleRemove = (e, i) => {
        const removeSavedMems=savedMembersForBooking.filter((element)=> !e.member.includes(element))
      //  console.log("removed",removeSavedMems)
        const removeBooking = bookingDetails?.filter((a, index) => index !== i);
        setBookingDetails(removeBooking);
        setSavedMembersForBooking(removeSavedMems);
      };

      const proceedAndPay = async() => {
        //save the data in db with INITIATED status
        const reqBody = {
            "roomSet":[...bookingDetails]
        }

    
        //save the data in db
        try {
            setGWaitOn(true)
            const response = await axios.post(SAVE_ACCOMODATAION_DETAIL_WITHOUT_PAYMENT, reqBody)
            setGWaitOn(false)
            const bookingId = response.data.bookingId
            const amount = response.data.amount
            //procced to payment page
            navigate("/payAcc",{state:{bookingId:bookingId,amount:amount}})
        }
        catch (e) {
            console.log(e);
        }

    }

    const template =
        <div className="container">
            <h1 className="display-4">Accommodation</h1><br /><br />
            <h5>Please choose your accommodation</h5>
            <div className="row card-wrapper">
                {rooms?.map((one, index) => {
                    console.log(one)
                    let avail = one.count > 0 ? true : false
                    return (
                        <div className="col ">
                            <div className="card" style={{ "width": "18rem", "padding": "0px" }}>
                                <img className="card-img-top" src="https://th.bing.com/th/id/OIP.qLVYj_t-HU2Yyx3v_wFgLwHaE6?pid=ImgDet&rs=1" alt="Card image cap" />
                                <div className="card-body">
                                    <h4>{one.type}</h4>
                                    <p>{one.description}</p>
                                    <p>CheckIn Time:{one.checkInTime}</p>
                                    <p>CheckOut Time: {one.checkOutTime}</p>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><b>Price: </b><h4 style={{ "display": "inline-block" }}>{one.price}</h4></li>
                                        {avail ? <li className="list-group-item" style={{ "color": "green" }}><b>AVAILABLE: </b><h5 style={{ "display": "inline-block" }}>{one.count}</h5></li>
                                            : <li className="list-group-item" style={{ "color": "red" }}><b>AVAILABLE: </b><h5 style={{ "display": "inline-block" }}>{one.count}</h5></li>}
                                    </ul>
                                </div>

                                <div className="card-body">
                                    <button className="btn btn-warning"  onClick={()=>{setIsOpen(true);setRoomType(one?.roomId);setMemCount(one?.memberCount)}}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                                 <AccomodationModal yatraRegisteredUsers={membersListForBooking} membersAccomoBooked={membersAccomoBooked} membersPendingApproval={membersPendingApproval} open={isOpen} roomType={roomType} memCount={memCount} onClose={()=>setIsOpen(false)} savedMembersForBooking={savedMembersForBooking} onSave={saveBookingData}/> 



            </div>
            {bookingDetails.length!==0 ?<h4>Booking Details</h4>:""}

            
                
                    {bookingDetails?.map((e, index) => (

                      <table className="table card">
                       <tr><th><td>Room Id</td>
                        <td>Added Members</td>
                        <td>Arrival Time</td>
                        <td>Departure Time</td>
                        <td>Action</td></th></tr>
                        <tbody>
                        <tr>
                            <td> {e.roomType?.roomId} </td>
                            <td> {e.member?.map((e)=>(e.dbDevName + " ."))} </td>
                            <td>  {e?.memCheckInTime.replace("T"," ")} </td>
                            <td> {e?.memCheckOutTime.replace("T"," ")}  </td>
                            <td> <div className="col-2">
                        <button onClick={() => handleRemove(e, index)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div></td>
                        </tr>
                        </tbody>

            </table>
                    ))}

            <button onClick={()=>proceedAndPay()}>Proceed to Pay</button>
                
        </div>

    return <>{gWaitOn ? <PleaseWait /> : template}</>
}