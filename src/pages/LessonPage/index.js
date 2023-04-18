import React from "react";
import css from "./style.module.css";
import Choice from "../../components/Choice";
import ToolSidebar from "../../components/ToolSidebar";


// https://www.youtube.com/watch?v=50vgpBDhEkY&list=PLEVTJcDnFDm9lpEEHTftRa9JSRV4jY_p9&index=12  
// Quiz app ийн заавар
const LessonPage = (props) => {
   
    return (

        <div className={css.lessonPage}>
           <ToolSidebar/>
            <Choice/>
            
        </div>
    )
}

export default LessonPage;