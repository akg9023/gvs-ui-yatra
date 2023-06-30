import { useContext, useState,useEffect} from "react";
import { FETCH_ALL_PENDING_BOOKING } from "../constants/apiConstant";
import axios from "axios";
import LoadingSpinner from "../pleaseWait/loadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";

export default ()=>{

    const [pendingApprovals,setPendingApprovals]=useState([])
    const [spinner,setSpinner]=useState(false);
    useEffect(()=>{

        
            setSpinner(true)
        const res =  axios.post(FETCH_ALL_PENDING_BOOKING)
            console.log(res.data);
            res.then((data)=>setPendingApprovals(data.data))
            setSpinner(false);
        

        

    },[])
    const approveHandler=(e)=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Approve!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                setSpinner(true)
                const res =  axios.post(`/approve/${e}`)
            console.log(res.data);
            setSpinner(false);
              swalWithBootstrapButtons.fire(
                'Approved!',
                'This payment has been approved.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your Approval or Decline is still pending',
                'error'
              )
            }
          })
       
    }
    const disapprovalHandler=(e)=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "you won't be able to revert this",
            input: "text",
            inputPlaceholder:"State Reason Here",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Decline Payment!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                const res =  axios.post(`/disapprove/${e}`)
            console.log(res.data);            
              swalWithBootstrapButtons.fire(
                'Declined!',
                'This payment has been Declined.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your Approval or Decline is still pending',
                'error'
              )
            }
          })
       
    }
   
    return(
        <>
        {spinner?<LoadingSpinner/>:""}
        {console.log(pendingApprovals)}
        <h4>Booked Rooms</h4>

            <table className="table">
                <tbody>
                    {pendingApprovals.map((obj, index) => (

                        <tr>
                            <td>{index + 1}. {obj.id} | {obj.upiTxnId} |  {obj.paymentStatus}  | {obj.amount}</td> <td><button className="btn btn-warning" onClick={()=>approveHandler(obj.id)}>Approve</button></td><td><button className="btn btn-danger" onClick={()=>disapprovalHandler(obj.id)}>Decline</button></td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </>
    )
}