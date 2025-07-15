import NavBar from "./NavBar";
import Sidebar from "./Slidebar";
import { useState } from "react";

export default function Layout({ children }) {
  const [collapsed,setCollapsed]=useState(true)
  return (
    <div className="flex flex-col min-h-screen ">
        <div className="h-[8vh]">
        <NavBar />
      </div>
      <div className="flex flex-1" >
      <Sidebar onCollapseToggle={(bool)=>setCollapsed(bool)}/>
      <main className="flex-1 p-4 overflow-auto transition-all duration-1000 ease-in-out" style={{
      marginLeft: collapsed ? "5rem" : "15rem", // match sidebar width
      padding: "1rem"
    }}>{children}</main>
      </div>
    </div>
  );
}