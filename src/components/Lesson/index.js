import React from "react";
import css from "./style.module.css";

const Lesson = props => {
    console.log(props.lesson)
    return (
        <div className={css.lesson}>
            <p><strong>хичээлийн нэр {props.lesson.base.name}</strong></p>
            <p>
                {/* <img src={url}/> */}
                <strong>language : </strong> <br/> ,
                
                <strong>level : </strong>{props.lesson.level}  <br/>,
                <strong>lessonNumber : </strong>{props.lesson.lessonNumber}  <br/>,
                <strong>photo : </strong>{props.lesson.photo} , 
                {/* <strong>video : </strong>{props.lesson.video} , */}
                {/* <strong>grammar : </strong> {props.lesson.grammar}, */}
                {/* <strong>shine vg</strong> {props.lesson.newWord}, */}
                {/* <strong>translate : </strong>{props.lesson.translate} ,  */}
               
                {/* <strong>exam : </strong>{props.lesson.exam} , */}
            </p>
        </div>
    )
};

export default Lesson;
