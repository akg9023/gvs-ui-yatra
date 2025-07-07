import NavBar from "./NavBar";
import Sidebar from "./Slidebar";
import { useEffect } from "react";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen ">
        <div className="h-[8vh]">
        <NavBar />
      </div>
      <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}