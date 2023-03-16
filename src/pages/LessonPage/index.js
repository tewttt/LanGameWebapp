import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import Button from "../../components/Button";
import FetchLesssonContext  from "../../context/FetchLessonContext";
import Lesson from "../../components/Lesson";


const LessonPage = (props) => {
    const ctx = useContext(FetchLesssonContext);
    
    const game = () => {
        props.history.push("/");

   
   };
//    console.log(ctx.state.lesson[1])
    return (

        <div className={css.text}>
            { ctx.state.lesson.map(el => <Lesson key={el[0]} Lesson={el[1]}/>)}

            {/* hicheel{state.lesson} */}
            {/* {state.lesson.map((el) => (
                <Lesson key={el[0]} lesson={el[1]}/>
            ))} */}

             <Button daragdsan={game} text="Тоглох"/>
            Lesson
        </div>
    )
}

export default LessonPage;