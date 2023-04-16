// import React, { useState } from 'react';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import "./index.css";


const NavBar = () => {
  
  // <a className="navbar-brand" href="#"></a>

  return (<>
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid ">
        <Link to="/">
        <img
                style={{ height: "5rem", width: "90px", marginLeft:"2rem"}}
                src="../images/HaldiaT4.png"
              />
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
      </div>
    </nav>
</>
  );
};

export default NavBar;