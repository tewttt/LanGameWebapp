import React, {useState} from "react";

import Toolbar from "../Toolbar";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar/Navbar";

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