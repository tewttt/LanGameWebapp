import React from "react";
import AdminLesson from "../AdminLesson";
const AdminLessonList = (props) => {
    // console.log(props.lessons)
    return (
        <div className="text-white text-[12px] flex flex-col justify-center items-center">
            {props.lessons.map(el => (
                // console.log(el.id)
                <AdminLesson key={el.id} lesson={el}/>
            ))}
        </div>
    )
};

export default AdminLessonList;