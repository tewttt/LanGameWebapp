import React, {useState} from "react";
import css from "./style.module.css";
import Toolbar from "../Toolbar";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const ToolSidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div>
             <Toolbar toggleSidebar={toggleSidebar}/>
             <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar}/>
            {/* <Sidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar}/> */}

        </div>
    )
}

export default ToolSidebar;