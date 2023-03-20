import React from "react";
import css from "./style.module.css";

const Lesson = props => {
    return (
        <div className={css.lesson}>
            <p><strong>хичээл</strong></p>
            <p>
                <strong>exam : </strong>{props.lesson.exam} , 
                <strong>grammar : </strong> {props.lesson.grammar},
                {/* <strong>image </strong> {props.lesson.image}, */}
                <strong>language</strong> {props.lesson.language},
            </p>
        </div>
    )
};

export default Lesson;
