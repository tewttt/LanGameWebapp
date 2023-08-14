import React from "react";
import css from "./style.module.css";
import Lesson from "../Lesson";


const LessonList = (props) => {
    
    return (
        <div className={css.LessonList}> 
            {props.lessons.map(el => (
               
                <Lesson key={el[0]} lesson={el}/>
              
            ))}

        </div>
    )
};

export default LessonList; 