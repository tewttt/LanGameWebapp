import React, {useContext, useState} from "react";
import css from "./style.module.css";
import FetchLessonContext from "../../context/FetchLessonContext"
import Choice from "../../components/Choice";
import AdminLessonList from "../component/AdminLessonList";
import AdminChoice from "../component/AdminCoice";
import {db} from "../../firebase"
import { useEffect } from "react";


const AllLesson = () => {
    const ctx = useContext(FetchLessonContext);
    const [lessons, setLesson] = useState([])

    //   useEffect(() => {
      
    //         db.collection("addlesson").onSnapshot(snapshot => {
    //             setLesson (snapshot.docs.map(doc => ({
    //                 id:doc.id,
    //                 lesson:doc.data().lesson
    //             })))
    //         })
    //     }, []);
  

    return (
        <div style={{color: "white"}}>
        <AdminChoice/>
           {/* <AdminLessonList lessons={ctx.state.lesson}/> */}

           {/* {lessons.map(lesson => {
            <div> {lesson}</div>
           })} */}
        
        </div>
    )
}
export default AllLesson;