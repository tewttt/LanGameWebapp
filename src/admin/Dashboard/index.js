import React from "react";
import css from "./style.module.css";

import AdminNav from "../AdminNav";

import ToolSidebar from "../../components/ToolSidebar";


const Dashboard = () => {
    return (
        <div style={{color: "white", margin:"60px" }}> 
        <ToolSidebar/>
        <AdminNav/>
          
           
        </div>
    )
}
export default Dashboard;