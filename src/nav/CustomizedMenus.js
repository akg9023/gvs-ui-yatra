import { React, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { LOGOUT, CHECK_AUTHENTICATION_URL,NAVIGATE_TO_MAIN_YATRA_REGISTRATION_PAGE,NAVIGATE_TO_DATABASE_REGISTRATION_PAGE } from "../constants/Constants";
import Avatar from "@mui/material/Avatar";
import Cookies from "js-cookie";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
export default function CustomizedMenus(properties) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userName, setUserName] = useState("");
  const [menuItem, setMenuItem] = useState([...properties.menuItems])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(CHECK_AUTHENTICATION_URL, {
      method: "GET",
      credentials: "include",
    }).catch((e) => {
      console.warn("failed to load navbar");
      properties.onLogin(false);
      navigate("/");
    });

    if (response?.ok) {
      const userData = await response.json();
      let { userEmail, roles, userName } = userData;
      setUserName(userName == null ? userEmail.substr(0, 4) : userName);
      if(roles!==null && roles.filter((e) => e.name === "ROLE_ADMIN")){
        setMenuItem((menuItem)=>menuItem.filter((e)=>e!=="Admin"&&e!=="Database Registration")?[...properties.menuItems,"Database Registration","Admin"]:menuItem);
      }
      else if(roles!==null && roles.length>0){
        setMenuItem((menuItem)=>menuItem.filter((e)=>e!=="Database Registration")?[...properties.menuItems,"Database Registration"]:menuItem);
      }
      properties.onLogin(true);
    } else {
      properties.onLogin(false);
    }
  };



  function stringToColor(string) {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        borderWidth: "2px",
      },
      children: `${name.charAt(0).toUpperCase()}${name
        .charAt(1)
        .toUpperCase()}`,
    };
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickedMenu = async (e) => {
    Cookies.remove("loginButton", {
      path: "/",
      domain: "gaurangavedic.org.in",
    });
    switch (e.target.id) {
      case "Logout":
        {
          properties.onLogin(false);
          sessionStorage.clear();
          await fetch(LOGOUT, {
            method: "POST",
            credentials: "include",
          }).then(() => {
            navigate("/");
          });
        }
        break;
        case "Admin":
        {
        navigate("/admin");
        }
        break;
        case "Dashboard":
        {
        navigate("/dashboard")
        }
        break;
        case "Main Yatra Page":
        {
        window.location.href=NAVIGATE_TO_MAIN_YATRA_REGISTRATION_PAGE;
        }
        break;
        case "Database Registration":
        {
          window.location.href=NAVIGATE_TO_DATABASE_REGISTRATION_PAGE;
        }
        break;
      //   case "Profile":
      //   {
      //   navigate("/profile")
      //   }
      //   break;
      default: {
      }
    }
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        
        onClick={handleClick}
        sx={{opacity:0.8,position:'relative',marginInline:1,borderTopLeftRadius:"10rem"}}>
        <Avatar
          {...stringAvatar(userName)}
          sx={{boxShadow: 3,
            fontSize:16,marginRight:1,
            background: stringToColor(userName),
          }}
        />
        {userName}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItem?.map((menu, index) => (
          <MenuItem
            id={menu}
            key={index}
            onClick={(e) => {
              handleClickedMenu(e);
              handleClose();
            }}
            disableRipple
          >
            {menu}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
