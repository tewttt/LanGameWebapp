import React from "react";
import css from "./style.module.css";
import Lesson from "../Lesson";

const LessonList = (props) => {
    return (
        <div className={css.LessonList}>
            {props.lessons.map(el => (
                <Lesson key={el[0]} lesson={el[1]}/>
                // <Lesson key={el[0]}>{el[1].language}{el[1].name}</Lesson>
            ))}
        </div>
    )
};

export default LessonList;