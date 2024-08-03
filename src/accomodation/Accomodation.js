
import { useContext, useEffect, useState } from "react"
import "./acc.css"
import axios from "axios"
import PleaseWait from "../pleaseWait/PleaseWait.js"
import { GET_ALL_ROOMS, YATRA_REGISTERED_MEMBERS, FETCH_ALL_APPROVED_MEMBERS, FETCH_ALL_PENDING_MEMBERS, SAVE_ACCOMODATAION_DETAIL_WITHOUT_PAYMENT } from "../constants/Constants"
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js"
import AccomodationModal from "./AccomodationModal"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../pleaseWait/loadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import RegMemModal from "./RegMemModal"


export default () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isRegModalOpen, setIsRegModalOpen] = useState(false)
    const [bookingDetails, setBookingDetails] = useState([])
    const [roomType, setRoomType] = useState("")
    const [memCount, setMemCount] = useState()
    const [minMemCount, setMinMemCount] = useState()
    const [oneRoom, setOneRoom] = useState({})
    const [regMemDetails, setRegMemDetails] = useState([])
    const [membersListForBooking, setMembersListForBooking] = useState([])
    const [membersAccomoBooked, setMembersAccomoBooked] = useState([])
    const [membersPendingApproval, setMembersPendingApproval] = useState([])
    const [successMem, setSuccessMem] = useState([])
    const [rooms, setRooms] = useState([1])
    const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
    const [savedMembersForBooking, setSavedMembersForBooking] = useState([])
    const navigate = useNavigate();
    let membersList = [];


    const getData=()=>{

        const res = axios.post(GET_ALL_ROOMS,{withCredentials:true})
        res.then(data => setRooms(data.data))

        // const memRes = axios.post(YATRA_REGISTERED_MEMBERS,{withCredentials:true})
        // memRes.then(data => setMembersListForBooking(data.data))
        // const memBookedRes = axios.post(FETCH_ALL_APPROVED_MEMBERS,{withCredentials:true})
        // memBookedRes.then((data) => setMembersAccomoBooked(data.data))
        // const memsPendingRes = axios.post(FETCH_ALL_PENDING_MEMBERS,{withCredentials:true})
        // memsPendingRes.then((data) => setMembersPendingApproval(data.data))
    }


    useEffect(() => {
         if (!sessionStorage.getItem("userEmail")===null)
          navigate("/");

          else getData();
        


    }, [])
    const saveBookingData = (e) => {
        // console.log(e);
        setBookingDetails([...bookingDetails, e])
        setSavedMembersForBooking([...savedMembersForBooking, ...e.member])
        manageRoomCount(e,"1");
        //  console.log(bookingDetails)
    }


    const proceedAndPay = async () => {

        //save the data in db with INITIATED status
        const reqBody = {
            "roomSet": [...bookingDetails]
        }


        //save the data in db
        try {
            setGWaitOn(true)
            const response = await axios.post(SAVE_ACCOMODATAION_DETAIL_WITHOUT_PAYMENT, reqBody,{withCredentials:true})
            setGWaitOn(false)
            const bookingId = response.data.bookingId
            const amount = response.data.amount

            if (bookingId == null) {
                const swalRes = await Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Something went wrong. ',
                })
            }
            //procced to payment page
            navigate("/payAcc", { state: { bookingId: bookingId, amount: amount } })
        }
        catch (e) {
            // console.log(e);
        }

    }
    const manageRoomCount=(e,i)=>{
        if(i==="1")
        rooms.filter((l)=>e.roomType.roomId===l.roomId).map((l)=>l.count=l.count-1)
        else if(i==="2")
        rooms.filter((l)=>e.roomType.roomId===l.roomId).map((l)=>l.count=l.count+1)

          
      
      
          
      }

    const showRegMemModal = () => {
        <AccomodationModal />
    }



    const template = <>

        <div className="container">
            <h1 className="display-4">Accommodation</h1>
            <a href="https://drive.google.com/file/d/1Qqhd8anYtvmh68FgZB288KyfR57EWh03/view?usp=sharing" target="_blank"><button className="btn btn-primary ">Guidelines</button></a><br/><br/>
            <h5>Please choose your accommodation</h5>
            <div className="row card-wrapper">
                {rooms && rooms?.map((one, index) => {
                    let avail = one.count > 0 ? true : false
                    return (
                        <div className="col cardColumn" key={index}>

                            <div class="card " style={{ "width": "18rem", "padding": "0px" }}>
                                <img class="card-img-top" style={{ "height": "100px" }} src="https://th.bing.com/th/id/OIP.qLVYj_t-HU2Yyx3v_wFgLwHaE6?pid=ImgDet&rs=1" alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">{one.type + " - " + one?.roomId + ""}</h5>
                                    <p class="card-text">
                                        <small>Description:</small> <div class="desc">{one.description}</div>
                                        <hr />
                                        <small>CheckIn Time:{one.checkInTime}</small><br />
                                        <small>CheckOut Time: {one.checkOutTime}</small><br />
                                        <span><b>Price: <span class="price">{one.price}</span></b><i> (full yatra)</i></span><br />
                                        {avail ? <li className="list-group-item" style={{ "color": "green" }}><b>AVAILABLE: </b><h5 style={{ "display": "inline-block" }}>{one.count}</h5></li>
                                            : <li className="list-group-item" style={{ "color": "red" }}><b>AVAILABLE: </b><h5 style={{ "display": "inline-block" }}>{one.count}</h5></li>}
                                    </p>

                                </div>
                                <div className="card-body"  >
                                    {membersListForBooking.length === 0 ? <LoadingSpinner style={{ position: "relative", textAlign: "left" }} /> : <button className="btn btn-warning" disabled={one.count <= 0} onClick={() => { setIsOpen(true); setRoomType(one?.roomId); setMemCount(one?.memberCount); setOneRoom(one); setMinMemCount(one?.minMemberCount) }}>Book Now</button>}
                                </div>
                            </div>
                        </div>



                    )
                })}
                {isOpen ? <AccomodationModal yatraRegisteredUsers={membersListForBooking} membersAccomoBooked={membersAccomoBooked} membersPendingApproval={membersPendingApproval} open={isOpen} oneRoom={oneRoom} roomType={roomType} minMemCount={minMemCount} memCount={memCount} onClose={() => setIsOpen(false)} savedMembersForBooking={savedMembersForBooking} onSave={saveBookingData} /> : ""}


                {isRegModalOpen ? <RegMemModal open={isRegModalOpen} 
                        bookingDetails={bookingDetails} 
                        savedMembersForBooking={savedMembersForBooking}
                        setBookingDetails= {setBookingDetails}
                        onRemoveIncreaseRoomCount={(e)=>manageRoomCount(e,"2")}
                        setSavedMembersForBooking={setSavedMembersForBooking}
                        onClose={() => setIsRegModalOpen(false)} /> : ""}






            </div>


            <div className="payButton">
                <button className="btn btn-dark " disabled={bookingDetails.length==0} onClick={() => { setIsRegModalOpen(true); }} >Review</button>
                <button className="btn btn-success " style={{ marginLeft: "40px" }} onClick={() => proceedAndPay()} disabled={bookingDetails.length == 0}>Proceed to Pay</button>

            </div>

        </div>
    </>

    const timeIsOver=<>Sorry! Booking window is now closed!!!</>

    return <>{gWaitOn ? <PleaseWait /> : template}</>
}

