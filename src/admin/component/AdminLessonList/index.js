import React from "react";
import css from "./style.module.css";

import AdminLesson from "../AdminLesson";


const AdminLessonList = (props) => {
    // console.log(props)
    
    return (
        <div className={css.LessonList}>
            {props.lessons.map(el => (
                <AdminLesson key={el[0]} lesson={el}/>
            ))}

            {/* {props.lessons.map(el => (
               
            ))} */}
        </div>
    )
};

export default AdminLessonList;