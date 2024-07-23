
import 'bootstrap/dist/css/bootstrap.min.css';
import './album.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default () => {
    const navigate = useNavigate()

    useEffect(() =>{
        if(!sessionStorage.getItem("userEmail"))
           navigate("/login")
   }, []);

    const navigateToMemForm = () => {
        navigate("/yatraMemReg")
    }

    const manageMem = () => {
        navigate("/manageMem")
    }
    
    return (
        <>
            <div className="album py-5 bg-light">
                
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-4 box-shadow">
                                <img className="card-img-top myImg" src="https://tse3.mm.bing.net/th?id=OIP.A5rZGnnmCAixyCKce89DzwHaHa&pid=Api&P=0" alt="Card image cap" />
                                <div className="card-body">
                                    <h4>Step 1: Add Members</h4>
                                    <p className="card-text">This is the first phase of yatra registration in which you will be only allowed to add members coming in yatra.</p>
                                    <small>Registration Starts: <span style={{ color: "green" }}>26-Apr-2023</span></small><br />
                                    <small>Last Date of Registration: <span style={{ color: "green" }}>07-May-2023</span></small><br /><br />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-success" onClick={navigateToMemForm}>Register</button>&nbsp;
                                            <button type="button" className="btn btn-sm btn-outline-success" onClick={manageMem}>Manage</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-4 ">
                            <div className="card mb-4 box-shadow boxx">
                                <img className="card-img-top myImg" src="https://icon-library.com/images/accommodation-icon/accommodation-icon-7.jpg" alt="Card image cap" />
                                <div className="card-body">
                                    <h4>Step 2: Accommodation</h4>
                                    <p className="card-text">Choose your accommodation for yatra. Feel comfortable!</p><br />
                                    <small>Registration Starts: <span style={{ color: "green" }}>09-July-2023</span></small><br />
                                    <small>Last Date of Registration: <span style={{ color: "green" }}>16-July-2023</span></small><br /><br />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button onClick={()=>navigate("/accomodation")} type="button" className="btn btn-sm btn-outline-success">Book</button>
                                            <button type="button" onClick={()=>navigate("/manageBookings")} className="btn btn-sm btn-outline-success">Manage</button>
                                        </div>  

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4 box-shadow">
                                <img className="card-img-top myImg" src="https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_960_720.png" alt="Card image cap" />
                                <div className="card-body">
                                    <h4>Step 3: Confirmation</h4>
                                    <p className="card-text">For your Confirmation.</p><br /><br /><br /><br /><br />

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-success disabled">Show</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}