import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import StickyHeadTable from './StickyHeadTable';
import axios from 'axios';
import { GET_ALL_REGISTERED_MEMBERS } from '../constants/Constants';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2.js";

export default function Admin() {
    const [regMem, setRegMem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchData = async () => {
        setErrorMsg("")
        setLoading(true);
        const resp = await axios.get(GET_ALL_REGISTERED_MEMBERS, { withCredentials: true })
            .catch((e) => { setErrorMsg("OOps!!There was some error. Please try again!!"); setLoading(false); });
        if (resp.data) {
            console.log("data is set")
            setRegMem(resp.data.sort((a,b)=>b.txnDate-a.txnDate));
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);
    const handleClose = () => {
        setLoading(false)
    }

    return (
        <div >

            <h4>YATRA REGISTERED MEMBERS</h4>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid2 container>

                {!errorMsg.length > 0 || !loading ? <StickyHeadTable rows={regMem} /> : <i style={{ margin: "1rem", color: "red" }}>{errorMsg}</i>}
            </Grid2>


        </div>
    );
}

// private Long id;

// //who is filling the form
// private String userEmail="";

// @ManyToMany(cascade = CascadeType.ALL)
// private List<Member24> memberIdList = new ArrayList<>();

// //transaction
// private String amount="";
// private String customerTxnId="";
// private String customerVPA="";
// private String customerEmail="";
// private String upiTxnId="";
// private String paymentStatus="";
// private String txnDate="";

// @Column(nullable = false, updatable = false)
// @CreationTimestamp
// private LocalDateTime createdDateTime;

// @Column(nullable = false)
// @UpdateTimestamp
// private LocalDateTime updatedDateTime;
