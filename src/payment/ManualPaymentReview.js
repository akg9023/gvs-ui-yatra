import { useContext, useState, useEffect } from "react";
import { ADMIN_EMAIL_LIST, APPROVE_BOOKING, DECLINE_BOOKING, FETCH_ALL_APPROVED_BOOKING, FETCH_ALL_DECLINE_BOOKING, FETCH_ALL_PENDING_BOOKING } from "../constants/Constants";
import axios from "axios";
import LoadingSpinner from "../pleaseWait/loadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import "./review.css"
import { useNavigate } from "react-router-dom";

export default () => {

  const [pendingApprovals, setPendingApprovals] = useState([])
  const [approved, setApproved] = useState([])
  const [decline, setDecline] = useState([])
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const [isAdmin,setIsAdmin] = useState(false)

  useEffect(() => {

    const sessionEmail = sessionStorage.getItem("userEmail")
    if (!sessionEmail) navigate("/");
    if(ADMIN_EMAIL_LIST.includes(sessionEmail))
        setIsAdmin(true)

    getPendingData()
    getApprovedData()
    getDeclineData()
  }, [])
  const approveHandler = (e) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        setSpinner(true)
        const res = await axios.post(`${APPROVE_BOOKING}${e}`)
        getPendingData()
        getApprovedData()
        getDeclineData()
        setSpinner(false);
        swalWithBootstrapButtons.fire(
          'Approved!',
          'This payment has been approved.',
          'success'
        )
      }
    })



  }
  const disapprovalHandler = (e) => {
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
      input: "select",
      inputOptions: {
        'DECLINE - transactionId incorrect': 'Incorrect Transaction Id',
        'DECLINE - amount not matched': 'Amount Not Matched',
        'DECLINE - payment not found ': 'Payment Not Found',
        'DECLINE - others': 'Other'

      },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Decline Payment!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.post(`${DECLINE_BOOKING}${e}`, { "paymentStatus": result.value })
        swalWithBootstrapButtons.fire(
          'Declined!',
          'This payment has been Declined.',
          'success'
        )
        getPendingData()
        getApprovedData()
        getDeclineData()
      }
    })


  }

  const getPendingData = () => {
    setSpinner(true)
    const res = axios.post(FETCH_ALL_PENDING_BOOKING)
    res.then((data) => setPendingApprovals(data.data))
    setSpinner(false);
  }

  const getApprovedData = () => {
    setSpinner(true)
    const res = axios.post(FETCH_ALL_APPROVED_BOOKING)
    res.then((data) => setApproved(data.data))
    setSpinner(false);
  }

  const getDeclineData = () => {
    setSpinner(true)
    const res = axios.post(FETCH_ALL_DECLINE_BOOKING)
    res.then((data) => setDecline(data.data))
    setSpinner(false);
  }

  const template = <>
     <div class="main-wrapper">
        <h4>Booked Rooms [PENDING FOR APPROVAL]</h4>

        <table class="table table-striped custom">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Booking ID</th>
              <th scope="col">UPI App</th>
              <th scope="col">Transaction Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Transaction Id</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {pendingApprovals.length==0?<td>No result found.</td>:
            pendingApprovals.map((obj, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{obj.id}</td>
                <td>{obj.customerVPA}</td>
                <td>{obj.txnDate}</td>
                <td>{obj.amount}</td>
                <td>{obj.upiTxnId}</td>
                <td><button class="btn btn-warning" onClick={() => approveHandler(obj.id)}>Approve</button></td>
                <td><button class="btn btn-danger" onClick={() => disapprovalHandler(obj.id)}>Decline</button></td>
              </tr>
            ))}
          </tbody>
        </table> <br/><br/><hr/>

        {/* APPROVED */}
        <h4>Booked Rooms [APPROVED]</h4>

        <table class="table table-striped custom">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Booking ID</th>
              <th scope="col">UPI App</th>
              <th scope="col">Transaction Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Transaction Id</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {approved.length==0?<td>No result found.</td>:
            approved.map((obj, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{obj.id}</td>
                <td>{obj.customerVPA}</td>
                <td>{obj.txnDate}</td>
                <td>{obj.amount}</td>
                <td>{obj.upiTxnId}</td>

              </tr>
            ))}
          </tbody>
        </table><br/><br/><hr/>

        {/* DECLINE */}
        <h4>Booked Rooms [DECLINED]</h4>

        <table class="table table-striped custom">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Booking ID</th>
              <th scope="col">UPI App</th>
              <th scope="col">Transaction Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Transaction Id</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {decline.length==0?<td>No result found.</td>:
              decline.map((obj, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{obj.id}</td>
                <td>{obj.customerVPA}</td>
                <td>{obj.txnDate}</td>
                <td>{obj.amount}</td>
                <td>{obj.upiTxnId}</td>

              </tr>
            ))}
          </tbody>
        </table><br/><br/><hr/>
      </div>
  </>

  return (
    <>
      {spinner ? <LoadingSpinner /> : ""}

      {!isAdmin?<h3>Not Authorized</h3>:template}

    </>
  )
}