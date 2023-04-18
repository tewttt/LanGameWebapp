import React, {useState} from "react";
import css from "./style.module.css";
import Toolbar from "../Toolbar";
import Sidebar from "../Sidebar";

const ToolSidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div>
             <Toolbar toggleSidebar={toggleSidebar}/>
            <Sidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar}/>

        </div>
    )
}

export default ToolSidebar;