import React from "react";

const Lesson = props => {
    return (
        <div>
            <p><strong>хичээл</strong></p>
            <p>
                <strong>exam : </strong>{props.Lesson.exam} , 
                <strong>grammar : </strong> {props.Lesson.grammar},
                <strong>image </strong> {props.Lesson.image},
                <strong>language</strong> {props.Lesson.language},
            </p>
        </div>
    )
};

export default Lesson;
