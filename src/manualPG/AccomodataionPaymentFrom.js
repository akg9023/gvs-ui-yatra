import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import "./pg.css"
import { useContext, useEffect, useState } from "react";
import parse from 'html-react-parser';
import { PAYMENT_MERCHANT_NAME, PAYMENT_UPI_ID, SAVE_ACC_TXN, SAVE_MEM_LIST, SAVE_PAYMENT_REQUEST } from "../constants/apiConstant";
import axios from "axios";
import Swal from "sweetalert2";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";
import { right } from "@popperjs/core";
// import * as dotenv from 'dotenv' 


export default () => {
    const { state } = useLocation();
    const { amount, bookingId } = state ? state : "";
    const [errMessage, setErrorMessage] = useState("")
    const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const paymentUrl = `upi://pay?pa=${PAYMENT_UPI_ID}&pn=${PAYMENT_MERCHANT_NAME}&am=${amount}&tn=yatra&cu=INR`
    const upiId = "7870823920@paytm"
    const [toCopy,setToCopy] = useState(false)
    const [toCopyAmount,setToCopyAmount] = useState(false)
    const TIMEFORTXN = 30
    const [seconds, setSeconds] = useState(TIMEFORTXN);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;


    const template = {
        customerUPIApp: "",
        customerUTR: "",
        customerName: "",
        customerPhoneNo: ""
    }
    const [formData, setFormData] = useState(template);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 991) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
    

        if(seconds==0){
            clearTimeout(timer);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Time up. Please try to pay within time. Your rooms are not reserved.',
            })

            navigate("/accomodation")
        }
    
      }, [seconds]);

    useEffect(() => {
        // if (!sessionStorage.getItem("userEmail")) navigate("/");
        // else {

        //     // Converting the data into base64
        //     QRCode.toString(paymentUrl, function (err, code) {
        //         if (err) return console.log("error occurred")
        //         setQR(code)
        //     })
        // }

    }, [])

    setTimeout(() => {
        setErrorMessage("")
        setToCopy(false)
        setToCopyAmount(false)
    }, 120000)
    const change = (e) => {

        let updatedForm = { ...formData, [e.target.id]: e.target.value.trim() }
        setFormData(updatedForm);

    }

    const copyUpiId = async () => {
        await navigator.clipboard.writeText(upiId);
        setToCopy(true)
    }

    const copyAmount = async () => {
        await navigator.clipboard.writeText(amount);
        setToCopyAmount(true)
    }

    const onSubmit = async () => {

        if (formData.amount == "" || formData.customerName == "" || formData.customerPhoneNo == "" || formData.customerUPIApp == "" || formData.customerUTR == "") {
            setErrorMessage("Please fill all the fields.")
            return;
        }
        
        if(formData.customerUTR.length!=12){
            setErrorMessage("Transaction Id should be of 12 digits. Please refer the sample below.")
            return;
        }

        if(formData.customerPhoneNo.length!=10){
            setErrorMessage("Phone number should be of 10 digits.")
            return;
        }

        const apiReq = {
            "bookingId":bookingId,
            "upiTxnId": formData.customerUTR,
            "customerVPA": formData.customerUPIApp,
            "customerEmail": sessionStorage.getItem("userEmail"),
        }

        try {

            console.log(apiReq);
            //save Transaction details in db
            setGWaitOn(true)
            const res = await axios.post(SAVE_ACC_TXN, apiReq)
            setGWaitOn(false)

            navigate("/dashboard")
            const swalRes = await Swal.fire(
                'Successfully submitted for verification!',
                'It may take upto 2-4 days.\n Please visit MANAGE BOOKING for status.',
                'success'
            )
            
        }
        catch (e) {
            navigate("/dashboard")
            const swalRes = await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Make sure transactionID is unique. ',
            })
        }


    }

    return <>
        <div class=" mpg-wrapper">
            <div class="content">
                <div class="jumbotron">
                    <h1 class="display-4">Payment </h1> 
                    <p class="lead">
                        <b class="timer">Time remaining: {minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</b><br/>
                        <p class="display-6 inline">Amount: <b>{amount}</b></p><span onClick={copyAmount} class="material-symbols-outlined copy">content_copy</span>{toCopyAmount?<span class="highlight"><b>Copied!</b></span>:""}
                    </p>
                    <hr />
                    <p>Pay Here</p>
                    <h4 class="inline">{upiId} </h4><span onClick={copyUpiId} class="material-symbols-outlined copy">content_copy</span>{toCopy?<span class="highlight"><b>Copied!</b></span>:""}
                    
                    {/* <div className="qrDiv">
                        {parse(qr)}
                        {isMobile ? <a class="pay-button" href={paymentUrl}><button className="btn btn-warning ">Pay using UPI</button></a> : ""}
                    </div> */}

                    <hr />
                    <p style={{ "color": "red" }}><b>Please note that, your registration is considered only if full amount is paid.</b></p>

                </div>
               
                <form>
                    <div class="form-group">
                        <label for="exampleInputPassword1">UPI App used</label>
                        <input type="text" required class="form-control" id="customerUPIApp" onChange={(e) => change(e)} />
                        <small id="emailHelp" class="form-text text-muted ">Google Pay / PhonePay etc   </small>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleInputEmail1">Transaction ID/ UTR</label>
                        <input type="text" class="form-control" id="customerUTR" aria-describedby="emailHelp" onChange={(e) => change(e)} required />
                        <small id="emailHelp" class="form-text text-muted ">Please follow below guidelines to get transactionID</small>
                    </div>
                    <small class="highlight">GooglePay: UPI transaction ID  </small><a target="_blank" href="https://drive.google.com/file/d/1elCNsKNKHw2EgYZ_VKaMsAjthyyO1qq-/view">Sample</a><br />
                    <small class="highlight">PhonePay: UTR </small><a target="_blank" href="https://drive.google.com/file/d/1gxpfkZb7SekVSyN4HQS28ATTnhQ1Iyna/view">Sample</a><br />
                    <small class="highlight">Paytm: UPI Ref No </small><a target="_blank" href="https://drive.google.com/file/d/1d77p2gtVKaHMohazQEMCtpt29hzRA83c/view">Sample</a><br />
                    <small class="highlight">Amazon Pay: Bank Reference ID </small><a target="_blank" href="https://drive.google.com/file/d/1NiI2cOPhDL4LoE8eGcRr965z-wMgFMQM/view">Sample</a><br />
                    <br />
                    <div class="form-group">
                        <label for="exampleInputEmail1">Your Name</label>
                        <input type="text" class="form-control" id="customerName" aria-describedby="emailHelp" onChange={(e) => change(e)} required />
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleInputEmail1">Contact Number</label>
                        <input type="text" class="form-control" id="customerPhoneNo" aria-describedby="emailHelp" onChange={(e) => change(e)} required />
                    </div>
                    <br />
                    <hr />
                       <p style={{ "color": "red" }}>{errMessage}</p>
                    <br />
                    <button type="button" onClick={onSubmit} class="btn btn-secondary btn-lg btn-block">Submit for Verification</button>
                </form>
            </div>
        </div>
    </>
}
