import React, { useEffect, useState } from 'react';
import "./index.css";
import CustomizedMenus from "./CustomizedMenus.js";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import { NAVIGATE_TO_MAIN_YATRA_REGISTRATION_PAGE } from "../constants/Constants";

const NavBar = (props) => {

  const [enableMenu,setEnableMenu]=useState(true);
  
      return (<>
  <AppBar  style={{background:' -webkit-linear-gradient(180deg,#eee, #090979)',display:'flex',height:"8vh"}}position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Box
          component="img"
          src="../images/HaldiaT4.png"
          style={{ height: "4rem", width: "70px", marginTop:"5px", marginBottom:"5px"}}
          /><Typography
          variant="h6"
          noWrap
          component="a"
          href={NAVIGATE_TO_MAIN_YATRA_REGISTRATION_PAGE}
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          GAURANGA VEDIC SOCIETY
        </Typography>
          {enableMenu && <Box sx={{flexGrow: 0,marginRight:2,margin:1,position:"absolute",top:0,right:0 }}>
            
            <CustomizedMenus  menuItems={["Dashboard","Main Yatra Page","Logout"]} onLogin={(e)=>setEnableMenu(e)}/>
            
            
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
</>
  );
};

export default NavBar;