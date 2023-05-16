import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import "./pg.css"
import { useContext, useEffect, useState } from "react";
import parse from 'html-react-parser';
import { PAYMENT_MERCHANT_NAME, PAYMENT_UPI_ID, SAVE_MEM_LIST, SAVE_PAYMENT_REQUEST } from "../constants/apiConstant";
import axios from "axios";
import Swal from "sweetalert2";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";
// import * as dotenv from 'dotenv' 


export default () => {
    const { state } = useLocation();
    const { amount, memberList } = state ? state : "";
    const [qr, setQR] = useState("")
    const [errMessage, setErrorMessage] = useState("")
    const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
    const navigate = useNavigate();
    const paymentUrl = `upi://pay?pa=${PAYMENT_UPI_ID}&pn=${PAYMENT_MERCHANT_NAME}&am=${amount}&tn=yatra&cu=INR`
    const template = {
        userEmail: sessionStorage.getItem("userEmail"),
        customerUPIApp: "",
        customerUTR: "",
        customerName: "",
        customerPhoneNo: "",
        amount: amount
    }
    const [formData, setFormData] = useState(template);

    useEffect(() => {
        if (!sessionStorage.getItem("userEmail")) navigate("/");
        else {

            // Converting the data into base64
            QRCode.toString(paymentUrl, function (err, code) {
                if (err) return console.log("error occurred")
                setQR(code)
            })
        }

    }, [])

    setTimeout(() => {
        setErrorMessage("")
    }, 5000)
    const change = (e) => {

        let updatedForm = { ...formData, [e.target.id]: e.target.value }
        setFormData(updatedForm);

    }

    const onSubmit = async () => {

        if (formData.amount == "" || formData.customerName == "" || formData.customerPhoneNo == "" || formData.customerUPIApp == "" || formData.customerUTR == "") {
            setErrorMessage("Please fill all the fields.")
            return;
        }

        const reqForMemList = {
            "memberIdList": memberList,
            "userEmail": sessionStorage.getItem("userEmail"),
            "amount": amount,
            "paymentStatus": "pending",
            "upiTxnId": formData.customerUTR,
            "customerVPA": formData.customerUPIApp,
            "customerEmail": sessionStorage.getItem("userEmail"),
            "txnDate": Date.now()
        }

        console.log(reqForMemList);
        setGWaitOn(true)
        //save in member registraion table
        await axios.post(SAVE_MEM_LIST, reqForMemList)

        //save request
        await axios.post(SAVE_PAYMENT_REQUEST, formData)
        setGWaitOn(false)
        navigate("/dashboard")
        const swalRes = await Swal.fire(
            'Successfully submitted for verification!',
            'It may take upto 2-4 days.\n Please visit MANAGE MEMBER for status.',
            'success'
        )


    }

    return <>
        <div class=" mpg-wrapper">
            <div class="content">
                <div class="jumbotron">
                    <h1 class="display-4">Payment</h1>
                    <p class="lead">
                        <p class="display-6">Amount: <b>{amount}</b></p>
                    </p>
                    <hr />
                    <p>Scan here</p>
                    <div className="qrDiv">{parse(qr)}</div>

                    <hr />

                </div>
                <p style={{ "color": "red" }}>{errMessage}</p>
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
                        <small id="emailHelp" class="form-text text-muted ">Subject to verfiy.</small>
                    </div>
                    <small class="highlight">GooglePay: UPI transaction ID  </small><a target="_blank" href="https://drive.google.com/file/d/1elCNsKNKHw2EgYZ_VKaMsAjthyyO1qq-/view">Sample</a><br/>
                    <small class="highlight">PhonePay: UTR </small><a target="_blank" href="https://drive.google.com/file/d/1gxpfkZb7SekVSyN4HQS28ATTnhQ1Iyna/view">Sample</a><br/>
                    <small class="highlight">Paytm: UPI Ref No </small><a target="_blank" href="https://drive.google.com/file/d/1d77p2gtVKaHMohazQEMCtpt29hzRA83c/view">Sample</a><br/>
                    <small class="highlight">Amazon Pay: Bank Reference ID </small><a target="_blank" href="https://drive.google.com/file/d/1NiI2cOPhDL4LoE8eGcRr965z-wMgFMQM/view">Sample</a><br/>
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
                    <br />
                    <button type="button" onClick={onSubmit} class="btn btn-secondary btn-lg btn-block">Submit for Verification</button>
                </form>
            </div>
        </div>
    </>
}