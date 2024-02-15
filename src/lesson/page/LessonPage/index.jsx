import React from "react";
import ToolSidebar from "../../../components/ToolSidebar";
import pattern from "../../../assets/logo/patternWhite.png"
import Choice from "../../component/Choice"
const LessonPage = () => {

    return (
        <div className="relative flex bg-baseBlack flex-col p-6 md:p-0">
            <div 
                className="bg-cover absolute top-0 -left-4  z-10 "
                style={{backgroundImage: `url(${pattern})`}}>
            </div>
            <div className="z-30">
                <ToolSidebar />
            </div>
            
            <div className="z-20 ">
                <Choice/>
            </div>
        </div>      
)}
export default LessonPage;