import { useContext, useState,useEffect} from "react";
import { FETCH_ALL_PENDING_BOOKING } from "../constants/apiConstant";
import axios from "axios";
import LoadingSpinner from "../pleaseWait/loadingSpinner/LoadingSpinner";

export default ()=>{

    const [pendingApprovals,setPendingApprovals]=useState([])
    const [spinner,setSpinner]=useState(false);
    useEffect(()=>{

        const fetchBookingPendingApprovals=async()=>{
            setSpinner(true)
        const res = await axios.post(FETCH_ALL_PENDING_BOOKING)
            console.log(res);
            setPendingApprovals(res.data)
            setSpinner(false);
        }

        fetchBookingPendingApprovals()

    },[])
    const approveHandler=()=>{
        alert("Do you really want to approve?")
    }
    
    return(
        <>
        {spinner?<LoadingSpinner/>:""}
        {console.log(pendingApprovals)}
        <h4>Booked Rooms</h4>

            <table class="table">
                <tbody>
                    {pendingApprovals.map((obj, index) => (

                        <tr>
                            <td>{index + 1}. {obj.id} | {obj.upiTxnId} |  {obj.paymentStatus}  | {obj.amount}</td> <td><button className="btn btn-warning" onClick={()=>approveHandler()}>Approve</button></td><td><button className="btn btn-danger">Decline</button></td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </>
    )
}