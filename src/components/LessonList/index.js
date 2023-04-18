import React from "react";
import css from "./style.module.css";
import Lesson from "../Lesson";


const LessonList = (props) => {
    // console.log(props)
    
    return (
        <div className={css.LessonList}>
            {props.lessons.map(el => (
                <Lesson key={el[0]} lesson={el}/>
            ))}

            {/* {props.lessons.map(el => (
               
            ))} */}
        </div>
    )
};

export default LessonList;