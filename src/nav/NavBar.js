import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import "./index.css";
import { useNavigate } from "react-router-dom";
import CustomizedMenus from "./CustomizedMenus.js";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import { PARENT_DOMAIN } from "../constants/Constants";

const NavBar = (props) => {

  const [enableMenu,setEnableMenu]=useState(true);
  
      return (<>
  <AppBar  style={{background:' -webkit-linear-gradient(180deg,#eee, #090979)'}}position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
          component="img"
          src="../images/HaldiaT4.png"
          style={{ height: "3rem", width: "3rem", marginTop:"1vh", marginBottom:"5px"}}
          href={PARENT_DOMAIN}
          />
          {enableMenu && <Box sx={{ flexGrow: 0 }} style={{marginTop: "1rem", marginRight: "2px", position:"absolute",   top:0, right:0}}>
            
            <CustomizedMenus  menuItems={["logout"]} onLogin={(e)=>setEnableMenu(e)}/>
            
            
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
</>
  );
};

export default NavBar;