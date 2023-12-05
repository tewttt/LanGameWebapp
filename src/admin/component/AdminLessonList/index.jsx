import React from "react";
import AdminLesson from "../AdminLesson"
const AdminLessonList = (props) => {
    // console.log(props.lessons)
    return (
        <div className="text-white text-[12px] grid  lg:grid-cols-2 xl:grid-cols-4 justify-center md:justify-between items-center">
            {/* {props.lessons.map(el => (
                // console.log(el.id)
                <AdminLesson key={el.id} lesson={el} lang={props.lan}/>
            ))} */}
        </div>
    )
};

export default AdminLessonList;