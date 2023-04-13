import React, {useContext} from "react";
import css from "./style.module.css";
import FetchLessonContext from "../../context/FetchLessonContext"
import LessonList from "../../components/LessonList";


const AllLesson = () => {
    const ctx = useContext(FetchLessonContext);
    console.log(ctx.state.lesson)
    return (
        <div style={{color: "white"}}>hicheelvvd
           <LessonList lessons={ctx.state.lesson}/>
           
        </div>
    )
}
export default AllLesson;