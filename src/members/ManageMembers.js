import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { PleaseWaitContext } from '../context/PleaseWaitContextProvider.js';
import axios from 'axios';
import { GET_ALL_REG_MEM_DETAILS } from '../constants/Constants.js';
import PleaseWait from "../pleaseWait/PleaseWait.js"
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../pleaseWait/loadingSpinner/LoadingSpinner.js';


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
            setGWaitOn(true)
            const res = await axios.get(GET_ALL_REG_MEM_DETAILS,{withCredentials:true})
            setRegMemDetails(res.data)
            setGWaitOn(false)
        }
        fun()
    }, [])

    const template = <div className="container">
        <h1 className="display-4 rounded-xl px-4 py-2 text-blue-900 shadow-xl">Manage Members</h1><br /><br />
        <div className="row gap-4">
            {regMemDetails.length!==0 ? regMemDetails.map((one, index) => (<>
                <div className="col-sm-5 rounded-xl " style={{"padding":"20px",boxShadow: "4px 0 15px rgba(0, 0, 0, 0.3)"}}>
                        <div className="list-group">
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Members</h5>
                                <small className="text-muted">{one.created_at}</small>
                            </div>
                            <ul className="list-group list-group-flush">
                                {one.memberIdList.map((mem) => (
                                    <li className="list-group-item" key={mem.debDevId}>{mem.dbDevId} | {mem.dbDevName} | {mem.dbDevGender}</li>
                                ))}
                            </ul>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Payment</h5>

                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Status : {one.paymentStatus}</li>
                                <li className="list-group-item">Transaction Id: {one.upiTxnId}</li>
                                <li className="list-group-item">UPI App : {one.customerVPA}</li>
                                <li className="list-group-item">Amount : {one.amount} </li>
                                <li className="list-group-item">Transaction Date : {one.createdDateTime}</li>
                            </ul>
                        </a>
                    </div>
                </div></>
            )):"Kindly register your members to see the summary here..."}

        </div>
    </div>

    return <>
         {gWaitOn?<LoadingSpinner/>:template}
    </>
}   