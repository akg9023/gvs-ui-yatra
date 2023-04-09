
import { useEffect, useState } from "react";
import "./yatraRegForm.css"
import axiosGetUserDetail from "../axios/axiosGetUserDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { upiGatewayPayment } from "../upipayment/UPIPayment";
export default function MemRegForm() {

    const [memId, setMemId] = useState("")
    const [mem, setMem] = useState([])
    const [errorMessage, setErrorMessage] = useState()
    const { state } = useLocation()
    const { dbUserData } = state?state:""
    const navigate = useNavigate();

    useEffect(()=>{
        if(!sessionStorage.getItem("userId"))
            navigate("/")
    },[])

    setTimeout(()=>{
        setErrorMessage("")
    },9000)

    const handleChange = (e) => {
        const x = e.target.value;
        setMemId(x)
    }

    const searchUserById = (e) => {
        e.preventDefault();
        // serach for memId in db
        const found = dbUserData.filter((one) => memId == one.id)
        if (found.length!=0) {
            const existMem = mem.filter((one) => found[0].id == one.id)
            if (existMem.length == 0)
                setMem([...mem, found[0]])
            else {
                setErrorMessage("Member already exist.")
            }
        }
        else{
            setErrorMessage("Member doesn't exist.")
        }
        // console.log(mem);
    }

    const removeDev = (e, i) => {
        e.preventDefault();
        const seggMem = mem.filter((a, index) => index != i)
        setMem(seggMem)
    }

    const proceedPayment = (e) =>{
        e.preventDefault();
        // proceed to payment
        upiGatewayPayment(1,mem)  
    }

    return (
        <>
            <div class="container-fluid px-1 py-5 mx-auto">
                <div class="row d-flex justify-content-center">
                    <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                        <h3>Yatra 2023</h3>
                        <p class="blue-text">11-Aug to 15-Aug<br />Vrindavan</p>

                        <div class="card">
                            <span class="badge text-bg-warning">Registration Fee : 1500/-</span><br />
                            <h2 class="text-center mb-4">Register Members</h2>
                            <form class="form-card" onsubmit="event.preventDefault()">
                                <div class="row justify-content-between text-left">
                                    <div class="form-group col-sm-10 flex-column d-flex" > <input type="text" id="fname" name="fname" placeholder="Search" onChange={(e) => handleChange(e)} /> </div>
                                    <div class="form-group col-sm-2 flex-column d-flex " onClick={(e) => searchUserById(e)} > <i class="bi bi-search search-icon"></i></div>
                                </div>
                                <br/>

                                <h5 class="text " style={{display:"flex"}}>Added Members</h5>

                                <hr />
                               
                                <div class="accordion" id="accordionExample">
                                    {mem ? mem.map((one, index) => (
                                        <>
                                            <div class="container">
                                                <div class="row align-items-start" >
                                                    <div class="col" >
                                                        <div style={{ display: "flex" }}> {index + 1}|{one.id} - {one.fname} | 23 | Male</div>
                                                    </div>
                                                    <div class="col-2">
                                                        <button onClick={(e) => removeDev(e, index)}><i class="bi bi-trash"></i></button>
                                                    </div>

                                                </div>

                                            </div>
                                            <hr />
                                        </>

                                    )) : ""

                                    }
                                </div >
                    

                                <br />
                                <p style={{display:"flex",color:"red"}}>{errorMessage?errorMessage:""}</p>
                                <div class="row justify-content-end">
                                    <div class="form-group col-sm-3"> <button class="btn-block btn-primary" disabled={mem.length==0} onClick={(e)=>proceedPayment(e)}>Payment</button> </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}