import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { BACKEND_UPI_GATEWAY_CREATE_ORDER_URL } from "../constants/apiConstant";


//ADDED PROXY IN PACKAGE.JSON


export const upiGatewayPayment = async (amt, formData) => {
    
    //create a new client txn id
    const client_id = uuidv4();
    const redirect = (path)=>{
        console.log("redirecing...",path)
        window.location.replace(path);
    }

    //creating request for create_order call
    const request = 
    {

            "amount": amt+"",
            "clientTransactionId":client_id,
            "customerEmail": "saurav109677@gmail.com",
            "customerMobile": "6295135550",
            "customerName": "Saurav Kumar",
            "info": "ISKCON Haldia",
            // "callbackUrl": HOME_URL+"/api/v1/htmlResp/updatePaymentDetails/"+formData.personId.substring(0,18)
    }

    console.log("request",request)
    try{
        //Creating new order 
        const response = await axios.post(BACKEND_UPI_GATEWAY_CREATE_ORDER_URL,request)
        const payload = response.data.data;
        
        const payment = {
            status: "pending",
            amount: amt,
            transactionId: "pending",
            dateOfPayment: "pending",
            paymentMedium: "pending",
            clientId:client_id
            // orderId:payload.order_id
        };

        const finalData = {
            ...formData,
            payment
        };
        console.log("finalData",finalData)
        // const res = await axiosAddRegistration(finalData)
        // console.log("db_reply",res);
        

        //   open new tab with payemnt_link provided by upigateway
        // <Link to={{  pathname: response.data.payment_url }} target="_blank" />
        // history.push(response.data.payment_url)
        redirect(payload.payment_url)
    }
    catch(error){
        console.log("error",error);
    }
    
   
}