import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GET_FULL_REG_DETAILS_BY_TXN_ID } from "../constants/Constants";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PleaseWaitContext } from "../context/PleaseWaitContextProvider.js";
import "./success.css"

export default (props) => {
    const { clientTxnId } = useParams()
    const { gWaitOn, setGWaitOn } = useContext(PleaseWaitContext)
    const [memDetail, setMemDetail] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fun = async () => {
            // setGWaitOn(true)
            const res = await axios.post(GET_FULL_REG_DETAILS_BY_TXN_ID + "/" + clientTxnId.trim())
            setMemDetail(res.data)
            // setGWaitOn(false)
        }
        fun()

    }, [])

    const navigateToHome = () =>{
            navigate("/dashboard")
    }

    return (
        <div className="wrapper">
            <div className="card ">
                <div style={{ "border-radius": "200px", "height": "200px", width: "200px", background: "#F8FAF5", margin: "0 auto" }}>
                    <i className="checkmark">✓</i>
                </div>
                <h1>Success</h1>
                <p>We received your payment.</p><br />
                <h6>Transaction Details</h6>
                <table className="table table-striped tbl">

                    <tbody>
                        <tr>
                            <td scope="row" colSpan={10}>Amount</td>
                            <td>{memDetail.amount}</td>

                        </tr>
                        <tr>
                            <td scope="row" colSpan={10}>UPI Transaction Id</td>
                            <td>{memDetail.upiTxnId}</td>

                        </tr>
                        <tr>
                            <td scope="row" colSpan={10}>UPI Id</td>
                            <td>{memDetail.customerVPA}</td>

                        </tr>
                        <tr>
                            <td scope="row" colSpan={10}>Payment Status</td>
                            <td>{memDetail.paymentStatus}</td>

                        </tr>
                        <tr>
                            <td scope="row" colSpan={10}>Transaction Date</td>
                            <td>{memDetail.createdDateTime}</td>

                        </tr>

                    </tbody>
                </table>
                <button className="btn btn-warning" onClick={navigateToHome}>Go to Home</button>
            </div>
        </div>
    )
}