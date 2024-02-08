import React from "react";
import Choice from "../../component/Choice";
import ToolSidebar from "../../../components/ToolSidebar";
import backImage from "../../../assets/logo/backgroundSmall.png"
const LessonPage = () => {
    return (
        <div className="relative flex flex-col bg-baseBlack h-screen">
            {/* <div 
                className="bg-cover absolute top-0 left-0 z-20 opacity-60 w-screen h-screen"
                style={{backgroundImage: `url(${backImage})`}}>
            </div> */}
            <ToolSidebar/>
            <Choice/>
        </div>      
)}
export default LessonPage;