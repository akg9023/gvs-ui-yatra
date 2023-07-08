import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import "./pg.css"
import { useContext, useEffect, useState } from "react";
import parse from 'html-react-parser';
import { PAYMENT_MERCHANT_NAME, PAYMENT_UPI_ID, SAVE_ACC_TXN, SAVE_MEM_LIST, SAVE_PAYMENT_REQUEST } from "../constants/Constants";
import axios from "axios";
import Swal from "sweetalert2";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";
import { right } from "@popperjs/core";
import {toPng} from 'html-to-image';
// import * as dotenv from 'dotenv' 


export default () => {
    const { state } = useLocation();
    const { amount, bookingId } = state ? state : "";
    const [errMessage, setErrorMessage] = useState("")
    const [qr, setQR] = useState("")
    const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const paymentUrl = `upi://pay?pa=${PAYMENT_UPI_ID}&pn=${PAYMENT_MERCHANT_NAME}&am=${amount}&tn=yatra&cu=INR`
    const upiId = PAYMENT_UPI_ID
    const [toCopy,setToCopy] = useState(false)
    const [toCopyAmount,setToCopyAmount] = useState(false)
    const TIMEFORTXN = 300
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
        if (!sessionStorage.getItem("userEmail")) navigate("/");

            // Converting the data into base64
            QRCode.toString(paymentUrl, function (err, code) {
                if (err) return console.log("error occurred")
                setQR(code)
            })
        

    }, [])

    setTimeout(() => {
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

    const handleDownload = () => {
        const qrCode = document.getElementById('qr-code'); // Get the DOM element for the QR code
      
        toPng(qrCode)
          .then(function (dataUrl) {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'qr-code.png';
            link.click();
          })
          .catch(function (error) {
            console.error('An error occurred while generating and downloading the QR code image:', error);
          });
      };
      
      
      

    const onSubmit = async () => {

        if (formData.amount == "" || formData.customerName == "" || formData.customerPhoneNo == "" || formData.customerUPIApp == "" || formData.customerUTR == "") {
            setErrorMessage("Please fill all the fields.")
            return;
        }
        
        if(formData.customerUTR.length!=12 ){
            setErrorMessage("Transaction Id should be of 12 digits. Please refer the sample above.")
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
            "customerName": formData.customerName,
            "customerPhoneNo": formData.customerPhoneNo
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
        <div className=" mpg-wrapper">
            <div className="content">
                <div className="jumbotron">
                    <h1 className="display-4">Payment </h1> 
                    <p className="lead">
                        <b className="timer">Time remaining: {minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</b><br/>
                        <p className="display-6 inline">Amount: <b>{amount}</b></p><span onClick={copyAmount} className="material-symbols-outlined copy">content_copy</span>{toCopyAmount?<span className="highlight"><b>Copied!</b></span>:""}
                        
                    </p>
                    <h4 className="inline">{upiId} </h4><span onClick={copyUpiId} className="material-symbols-outlined copy">content_copy</span>{toCopy?<span className="highlight"><b>Copied!</b></span>:""}
                    <hr />
                    <h2>Scan and Pay</h2><br/>
                    <img src="https://tse3.mm.bing.net/th?id=OIP.CelPKhMjGBiNmRTLQCYpOgAAAA&pid=Api&P=0&h=180" width="230px" />
                    
                    
                    <div className="qrDiv" >
                            <img src="images\upi_abhishek_nwd.png" width="400px" />
                    </div>

                    <hr />

                </div>
               
                <form>
                    <div className="form-group">
                        <label for="exampleInputPassword1">UPI App used</label>
                        <input type="text" required className="form-control" id="customerUPIApp" onChange={(e) => change(e)} />
                        <small id="emailHelp" className="form-text text-muted ">Google Pay / PhonePay etc   </small>
                    </div>
                    <br />
                    <div className="form-group">
                        <label for="exampleInputEmail1">Transaction ID/ UTR</label>
                        <input type="number" className="form-control" id="customerUTR" aria-describedby="emailHelp" onChange={(e) => change(e)} required />
                        <small id="emailHelp" className="form-text text-muted "><b>Transaction ID should be of 12 digits.<br/> Please follow below guidelines.</b></small>
                    </div>
                    <small className="highlight">GooglePay: UPI transaction ID  </small><a target="_blank" href="https://drive.google.com/file/d/1elCNsKNKHw2EgYZ_VKaMsAjthyyO1qq-/view">Sample</a><br />
                    <small className="highlight">PhonePay: UTR </small><a target="_blank" href="https://drive.google.com/file/d/1gxpfkZb7SekVSyN4HQS28ATTnhQ1Iyna/view">Sample</a><br />
                    <small className="highlight">Paytm: UPI Ref No </small><a target="_blank" href="https://drive.google.com/file/d/1d77p2gtVKaHMohazQEMCtpt29hzRA83c/view">Sample</a><br />
                    <small className="highlight">Amazon Pay: Bank Reference ID </small><a target="_blank" href="https://drive.google.com/file/d/1NiI2cOPhDL4LoE8eGcRr965z-wMgFMQM/view">Sample</a><br />
                    <br />
                    <div className="form-group">
                        <label for="exampleInputEmail1">Your Name</label>
                        <input type="text" className="form-control" id="customerName" aria-describedby="emailHelp" onChange={(e) => change(e)} required />
                    </div>
                    <br />
                    <div className="form-group">
                        <label for="exampleInputEmail1">Contact Number</label>
                        <input type="number" className="form-control" id="customerPhoneNo" aria-describedby="emailHelp" onChange={(e) => change(e)} required />
                    </div>
                    <br />
                    <hr />
                       <p style={{ "color": "red" }}>{errMessage}</p>
                    <br />
                    <button type="button" onClick={onSubmit} className="btn btn-secondary btn-lg btn-block">Submit for Verification</button>
                </form>
            </div>
        </div>
    </>
}
