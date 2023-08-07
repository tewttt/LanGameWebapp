import React, {useContext} from "react";
import AdminLessonList from "../component/AdminLessonList";
import LessonContext from "../../context/LessonContext";

const AllLesson = () => {
    const ctx= useContext(LessonContext)
  
    return (
        <div className="text-white flex flex-col">
           <AdminLessonList lessons={ctx.lessonList}/>
        </div>
    )
}
export default AllLesson;