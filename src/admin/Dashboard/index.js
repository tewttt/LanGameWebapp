import React from "react";
import css from "./style.module.css";
import AllLesson from "../AllLesson";
import AddLesson from "../AddLessonPage";

import Users from "../Users";
import AdminNav from "../AdminNav";
import Toolbar from "../../components/Toolbar";


const Dashboard = () => {
    return (
        <div style={{color: "white"}}> 
        <Toolbar/>
        <AdminNav/>
          
           
        </div>
    )
}
export default Dashboard;