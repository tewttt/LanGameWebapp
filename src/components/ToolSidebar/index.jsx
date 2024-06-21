import React, {useState} from "react";
import Toolbar from "../Toolbar";
import Navbar from "../Navbar/Navbar";
import Shadow from "../General/Shadow"

const ToolSidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <div >
             <Toolbar toggleSidebar={toggleSidebar}/>
             <Shadow toggleSidebar={toggleSidebar} showSidebar={showSidebar}/>
             <Navbar toggleSidebar={toggleSidebar} showSidebar={showSidebar}/>
        </div>
    )
}

export default ToolSidebar;