import React, { useEffect, useState } from 'react';
import "./index.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";

const NavBar = (props) => {

  const [enableMenu,setEnableMenu]=useState(true);
  
      return (<>
  <AppBar  sx={{background:' -webkit-linear-gradient(180deg,#eee, #090979)',display:'flex',height:"8vh", justifyContent:"center"}}position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Box
          component="img"
          src="../images/HaldiaT4.png"
          sx={{ height: "3rem", width: "auto", maxWidth:"100%", marginY:"5px"}}
          /><Typography
          variant="h6"
          noWrap
          component="a"
          // href={NAVIGATE_TO_MAIN_YATRA_REGISTRATION_PAGE}
          sx={{
            ml: 2,
            display: "block",
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            textOverflow: 'ellipsis',
            flexGrow:1,
            fontSize: { xs: '0.9rem', sm: '1.2rem', md: '1.5rem' }
          }}
        >
          GAURANGA VEDIC SOCIETY
        </Typography>
        </Toolbar>
      </Container>
    </AppBar>
</>
  );
};

export default NavBar;