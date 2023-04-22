import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { PleaseWaitContext } from '../context/PleaseWaitContextProvider.js';
import axios from 'axios';
import { GET_ALL_REG_MEM_DETAILS } from '../constants/apiConstant';
import PleaseWait from "../pleaseWait/PleaseWait.js"
import { useNavigate } from 'react-router-dom';


export default () => {
    const [regMemDetails, setRegMemDetails] = useState([])
    const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
    const userEmail = sessionStorage.getItem("userEmail")
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("userEmail")) navigate("/");
      }, []);

    useEffect(() => {
        const fun = async () => {
            // setGWaitOn(true)
            const res = await axios.post(GET_ALL_REG_MEM_DETAILS, { email: userEmail })
            setRegMemDetails(res.data)
            // setGWaitOn(false)
        }
        fun()
    }, [])

    const template = <div class="container">
        <h1 class="display-4">Manage Members</h1><br /><br />
        <div class="row">
            {regMemDetails.map((one, index) => (<>
                <div class="col-sm-5" style={{"padding":"20px"}}>
                        <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">Members</h5>
                                <small class="text-muted">{one.created_at}</small>
                            </div>
                            <ul class="list-group list-group-flush">
                                {one.memberIdList.map((mem) => (
                                    <li class="list-group-item">{mem.dbDevId} | {mem.dbDevName} | {mem.dbDevGender}</li>
                                ))}
                            </ul>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">Payment</h5>

                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Status : {one.paymentStatus}</li>
                                <li class="list-group-item">Transaction Id: {one.upiTxnId}</li>
                                <li class="list-group-item">UPI Id : {one.customerVPA}</li>
                                <li class="list-group-item">Amount : {one.amount} </li>
                                <li class="list-group-item">Transaction Date : {one.txnDate}</li>
                            </ul>
                        </a>
                    </div>
                </div></>
            ))}

        </div>
    </div>

    return <>
         {gWaitOn?<PleaseWait/>:template}
    </>
}   