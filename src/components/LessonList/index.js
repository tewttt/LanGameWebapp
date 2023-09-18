import React from "react";
import Lesson from "../Lesson";

const LessonList = (props) => {
    // console.log(props)
    return (
        <div className=" grid gap-5 mt-5 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"> 
            {props.lessons.map(el => (
                <Lesson key={el[0]} lesson={el} lang={props.lang}/>
            ))}
        </div>
)};
export default LessonList; 