import { Avatar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext';
import { NAVIGATE_TO_DATABASE_REGISTRATION_PAGE,NAVIGATE_TO_MAIN_YATRA_REGISTRATION_PAGE,LOGOUT } from '../constants/Constants';
import { LogOutOutline } from "emotion-icons/evaicons-outline";
import { Registered } from "emotion-icons/boxicons-regular";
import { BrowserOutline } from "emotion-icons/evaicons-outline";
import { PeopleAdd } from "emotion-icons/fluentui-system-filled";
import { Dashboard } from "emotion-icons/boxicons-solid";
import { BuildingHouse } from "emotion-icons/boxicons-solid";
import { UserCog } from "emotion-icons/fa-solid";       // User with cog (great admin representation)

export default function Sidebar(props) {
    const {logout,user} =useAuth();
    const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  function stringToColor(string) {
    let hash = 0;
    let i;
      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }

    let color = '#';

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
          borderWidth: "2px"
        },
        children: `${name.charAt(0)}${name.charAt(1)}`,
      };
  }


  const menuItems = [
    { icon: <Dashboard size="20"/>, label: "Dashboard" },
    { icon: <PeopleAdd size="20"/>, label: "My Registrations" },
    { icon: <BuildingHouse size="20"/>, label: "My Bookings" },
    { icon: <Registered size="20"/>, label: "DB Registration" },
    { icon: <BrowserOutline size="20"/>, label: "GVS Portal" },
    user.roles?.filter((e) => e === "ROLE_ADMIN")?{ icon: <UserCog size="20"/>, label: "Admin" }:"",
    { icon: <LogOutOutline size="20"/>, label: "Logout" },
  ];
  const handleClickedMenu = async (e) => {
    switch (e.target.id) {
      case "Logout":
        {
          await fetch(LOGOUT, {
            method: 'POST',
            credentials: 'include',
          }).then(() => {
            logout();
            sessionStorage.clear();
            navigate("/")
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
      case "My Registrations":
        {
          navigate("/manageMem")
        }
        break;
        case "My Bookings":
        {
          navigate("/manageBookings")
        }
        break;
      case "Settings":
        {
          navigate("/myprofile")
        }
        break;
      case "GVS Portal":
        {
          window.location.href = NAVIGATE_TO_MAIN_YATRA_REGISTRATION_PAGE+'/yatra';
        }
        break;
        case "DB-Registration":
        {
          window.location.href = NAVIGATE_TO_DATABASE_REGISTRATION_PAGE;
        }
        break;
      default: {
        console.error("There is some error");
      }

    }

  }


  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} fixed flex flex-col justify-between border-r border-gray-200 p-4 overflow-hidden transition-all duration-1000 ease-in-out`}
     style={{    width: collapsed ? "5rem" : "15rem",height: "calc(100vh - 8vh)",boxShadow: "4px 0 15px rgba(0, 0, 0, 0.3)",
     transform: "translateZ(0)",
     borderRight: "1px solid rgba(0,0,0,0.1)"}}
      onTouchStart={()=>{setCollapsed(!collapsed);props.onCollapseToggle(!collapsed)}}
      onMouseOver={()=>{setCollapsed(false);props.onCollapseToggle(false)}} onMouseLeave={()=>{setCollapsed(true);props.onCollapseToggle(true)}}>
      
      <div>
        {/* Menu Items */}
        <nav className="space-y-4">
          {menuItems.filter(e=>e!=="").map((item, index) => (
            <button key={index} id={item.label} onClick={(e)=>handleClickedMenu(e)} className="flex items-center w-full space-x-2 text-sm hover:text-purple-600 group focus:outline-none bg-transparent border-none">
              <span className="text-xl" id={item.label}>{item.icon}</span>
              {!collapsed && 
              <span className={`overflow-hidden md:inline ml-5 whitespace-nowrap`}id={item.label}>{item.label}</span>
              }
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        {/* User Info */}
        <div className="lex flex-col items-center space-y-1">
          {/* <img src="https://via.placeholder.com/32" alt="User" className="w-8 h-8 rounded-full" /> */}
          <Avatar {...stringAvatar(sessionStorage.getItem("userEmail"))} sx={{ boxShadow: 2, fontSize: 16, marginRight: 1, background: stringToColor(sessionStorage.getItem("userEmail")) }} />
          {!collapsed && 
          <div className="hidden md:block">
            {/* <p className="text-sm font-medium">{sessionStorage.getItem("userFname")}</p> */}
            <p className="text-xs text-gray-500">{sessionStorage.getItem("userEmail")}</p>
          </div>}
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-10 h-5 flex items-center rounded-full p-1 ${darkMode ? "bg-purple-600" : "bg-gray-300"}`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform ${darkMode ? "translate-x-5" : ""} transition-transform`}
            />
          </button>
          {!collapsed && 
          <span className="hidden md:inline text-sm whitespace-nowrap">{darkMode ? "Light mode" : "Dark mode"}</span>
          }
        </div>
      </div>
    </div>
  );
}
