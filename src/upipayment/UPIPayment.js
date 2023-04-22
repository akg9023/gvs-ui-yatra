import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { BACKEND_UPI_GATEWAY_CREATE_ORDER_URL } from "../constants/apiConstant";


//ADDED PROXY IN PACKAGE.JSON


export const upiGatewayPayment = async (amt, membersList, setGWaitOn) => {

    //create a new client txn id
    const client_id = uuidv4();
    const redirect = (path) => {
        console.log("redirecing...", path)
        window.location.replace(path);
    }


    //creating request for create_order call
    const request =
    {

        "amount": amt + "",
        "clientTransactionId": client_id,
        "customerEmail": sessionStorage.getItem("userEmail"),
        "info": "ISKCON Haldia",
        "memberDetails": membersList,
        "amount": "1"
    }

    console.log("request", request)
    try {
        //Creating new order 
        const response = await axios.post(BACKEND_UPI_GATEWAY_CREATE_ORDER_URL, request)
        console.log(response);
        const payload = response.data.data;
        setGWaitOn(false)
        redirect(payload.payment_url)
    }
    catch (error) {
        console.log("error", error);
    }


}