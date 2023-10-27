import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./layout.scss";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSideBarOpen,setIsSideBarOpen] = useState(true);

  const toggleSideBar = () => {
      setIsSideBarOpen(!isSideBarOpen);
  }
  return (
    <div className="layout__wrapper">
        <Sidebar isSideBarOpen={isSideBarOpen} />
        <div className="container">
            <Topbar toggleSideBar={toggleSideBar}/>
            <main>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default Layout;