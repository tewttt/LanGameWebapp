import React, {useContext, useState} from "react";
import css from "./style.module.css";
import { Switch, Route, Link} from "react-router-dom";
import Choice from "../../components/Choice";
import AdminLessonList from "../component/AdminLessonList";
import AdminChoice from "../component/AdminCoice";
import {db} from "../../firebase"
import { useEffect } from "react";
import LessonContext from "../../context/LessonContext";


const AllLesson = () => {
    const ctx= useContext(LessonContext)
    const [lessons, setLesson] = useState([]);
  
    return (
        <div style={{color: "white"}}>Бүх хичээл
        {/* <AdminChoice/> */}
           <AdminLessonList lessons={ctx.lessonList}/>

           {/* {ctx.lessonList.map(el => {
            // console.log(el.userId)
            <div style={{color: "red"}}>fff {el.userId}</div>
           })} */}

     
        
        </div>
    )
}
export default AllLesson;