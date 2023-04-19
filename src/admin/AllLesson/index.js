import React, {useContext} from "react";
import css from "./style.module.css";
import FetchLessonContext from "../../context/FetchLessonContext"
import Choice from "../../components/Choice";
import AdminLessonList from "../component/AdminLessonList";
import AdminChoice from "../component/AdminCoice";


const AllLesson = () => {
    const ctx = useContext(FetchLessonContext);
    // console.log(ctx.state.lesson)
    return (
        <div style={{color: "white"}}>
        <AdminChoice/>
           {/* <AdminLessonList lessons={ctx.state.lesson}/> */}
           
        </div>
    )
}
export default AllLesson;