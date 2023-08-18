import React from "react";
import Choice from "../../components/Choice";
import ToolSidebar from "../../components/ToolSidebar";
import Comment from "../../components/Comment";
import Hero from "../../components/Hero";

// https://www.youtube.com/watch?v=50vgpBDhEkY&list=PLEVTJcDnFDm9lpEEHTftRa9JSRV4jY_p9&index=12  
// Quiz app ийн заавар

const LessonPage = () => {
    return (
        <div className="text-white flex flex-col justify-center">
            <ToolSidebar/>
            <Choice/>  
            {/* <Hero/> */}
            {/* <Comment/> */}
        </div>      
)}
export default LessonPage;