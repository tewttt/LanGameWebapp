import React from "react";
import css from "./style.module.css";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

 
const Lesson = props => {
    // console.log(props.lesson.state.base.language)
    const history = useHistory();
    const view = () => {
        history.push(`/lesson/${props.lesson.id}`)
        // history.push(`/lesson/${props.lesson[0]}`)
    }
    const wallet = () => {
        
    }
    

    return (
        <div className="flex flex-col py-3 items-center border border-blue-500 w-[200px] h-[200px] rounded-[5px] lg:w-[250px] lg:h-[250px]" >  
           
            <div className="flex mb-2"> 
                    <div className="mx-3"> {props.lesson.state.base.language}</div> 
                    <div className="mx-3">№{props.lesson.state.base.lessonNumber}</div> 
                    <div className="mx-3">{props.lesson.state.base.level}</div>  
                   
            </div>
            <div className="m-2 text-sm text-blue-300">{props.lesson.state.base.name}</div>  
          
            <div className="w-[140px] h-[40px] bg-blue-500 rounded-[5px] my-3 flex justify-center items-center text-[20px] p-2 hover:bg-blue-400 " onClick={view}>Үзэх </div>
            <div className="w-[140px] h-[40px] bg-red-500 rounded-[5px] my-3 flex justify-center items-center text-[16px] p-2 hover:bg-red-400" onClick={wallet}>2000₮ Төлөх </div>
            {/* <Link to={`/lesson/${props.lesson[0]}`} className={css.link}>Үзэх</Link> */}
           
           
        </div>
    )
};

export default Lesson;
