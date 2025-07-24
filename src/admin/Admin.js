import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import StickyHeadTable from './StickyHeadTable';
import axios from 'axios';
import { GET_ALL_BOOKED_MEMBERS, GET_ALL_REGISTERED_MEMBERS, GET_ALL_REGISTERED_MEMBERS_PENDING_FOR_BOOKING } from '../constants/Constants';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2.js";
import { Box, Tab, Tabs,useMediaQuery } from '@mui/material';
import StickyHeadTableBooking from './StickyHeadTableBooking';
import StickyHeadTablePendingMembers from './PendingMembers.js';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useTheme } from '@mui/material/styles';

export default function Admin() {
    const [regMem, setRegMem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedTab, setSelectedTab] = useState(0);
    const [accommodationData, setAccomodationData] = useState("");
    const [pendingMemData, setPendingMemData] = useState("");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const exportToXLSX = (data, filename = 'export.xlsx') => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
      
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      
        saveAs(dataBlob, filename);
      };


const handleTabChange = (event, newValue) => {
  setSelectedTab(newValue);
};

    const fetchData = async () => {
        setErrorMsg("")
        setLoading(true);
        const resp = await axios.get(GET_ALL_REGISTERED_MEMBERS, { withCredentials: true })
            .catch((e) => { setErrorMsg("OOps!!There was some error. Please try again!!"); setLoading(false); });
        if (resp.data) {
            setRegMem(resp.data.sort((a,b)=>b.txnDate-a.txnDate));
        }
        setLoading(false);
    }

    const fetchAccomodationData = async () => {
        setErrorMsg("")
        setLoading(true);
        const resp = await axios.get(GET_ALL_BOOKED_MEMBERS, { withCredentials: true })
            .catch((e) => { setErrorMsg("OOps!!There was some error. Please try again!!"); setLoading(false); });
        if (resp.data) {
            setAccomodationData(resp.data);
        }
        setLoading(false);
    }
    const fetchPendingMembersData = async () => {
        setErrorMsg("")
        setLoading(true);
        const response = await axios.get(GET_ALL_REGISTERED_MEMBERS_PENDING_FOR_BOOKING, { withCredentials: true })
        .catch((e) => { setErrorMsg("OOps!!There was some error. Please try again!!"); setLoading(false); });
    if (response.data) {
      setPendingMemData(response.data);
    }

        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
    }, [accommodationData,regMem]);
    const handleClose = () => {
        setLoading(false)
    }

    return (
        <div >

<Box sx={{ borderBottom: 1, borderColor: 'divider', mb:2 }}>
  <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable"
  scrollButtons="auto"
  sx={{
    '& .MuiTab-root': {
      minWidth: isMobile ? '80px' : '130px',
      fontSize: isMobile ? '8px' : '20px',
      padding: isMobile ? '6px 8px' : '12px 16px',
    },
  }}>
    <Tab label="YATRA REGISTERED MEMBERS" onClick={fetchData}/>
    <Tab sx={{ whiteSpace: 'nowrap', minWidth: 'fit-content' }} label="MEMBER ACCOMODATION DETAILS" onClick={fetchAccomodationData}/>
    <Tab sx={{ whiteSpace: 'nowrap', minWidth: 'fit-content' }} label="MEMBERS ROOM NOT BOOKED" onClick={fetchPendingMembersData}/>

  </Tabs>
</Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {selectedTab === 0 && (
            <Grid2 container>

                {!errorMsg.length > 0 || !loading ? <StickyHeadTable rows={regMem} onExport={exportToXLSX}/> : <i style={{ margin: "1rem", color: "red" }}>{errorMsg}</i>}
            </Grid2>)}
            {selectedTab === 1 && !loading && (
            <Grid2 container>

                {!errorMsg.length > 0 || !loading ? <StickyHeadTableBooking rows={accommodationData} onExport={exportToXLSX}/> : <i style={{ margin: "1rem", color: "red" }}>{errorMsg}</i>}
            </Grid2>)}
            {selectedTab === 2 && !loading && (
            <Grid2 container>

                {!errorMsg.length > 0 || !loading ? <StickyHeadTablePendingMembers rows={pendingMemData} onExport={exportToXLSX}/> : <i style={{ margin: "1rem", color: "red" }}>{errorMsg}</i>}
            </Grid2>)}


        </div>
    );
}