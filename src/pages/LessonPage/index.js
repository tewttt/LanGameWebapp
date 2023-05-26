import React, {useContext} from "react";
import css from "./style.module.css";
import Choice from "../../components/Choice";
import ToolSidebar from "../../components/ToolSidebar";
import {getAuth} from "firebase/auth";
import Comment from "../../components/Comment";
import LessonContext from "../../context/LessonContext";

const auth = getAuth();




// https://www.youtube.com/watch?v=50vgpBDhEkY&list=PLEVTJcDnFDm9lpEEHTftRa9JSRV4jY_p9&index=12  
// Quiz app ийн заавар
const LessonPage = (props) => {
    const ctx = useContext(LessonContext)
    // console.log(ctx.lessonList)
    // https://www.youtube.com/watch?v=UzMr7-0FgA0&t=4803s
    // currentUSer.uid awah hicheel
    
   
    return (
 
        <div className={css.lessonPage}>
           <ToolSidebar/>
         
           
            <Choice/>  
            <div>
                email: {auth.currentUser?.email}  uid: {auth.currentUser?.uid}
              
            </div>
          
            {/* <Comment/> */}
         
            
        </div>
    )
}

export default LessonPage;