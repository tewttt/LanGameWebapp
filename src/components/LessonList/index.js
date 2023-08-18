import React from "react";
import css from "./style.module.css";
import Lesson from "../Lesson";


const LessonList = (props) => {
    
    return (
        <div className=" grid gap-5 mt-5 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"> 
            {props.lessons.map(el => (
               
                <Lesson key={el[0]} lesson={el}/>
              
            ))}

        </div>
    )
};

export default LessonList; 