import React from "react";
import css from "./style.module.css"
import { useHistory, Link } from "react-router-dom";
import { useState , useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {AiFillLock} from "react-icons/ai"
const Lesson = props => {
//    console.log(props)
    const[status, setStatus] = useState("")
    const history = useHistory();

    const view = () => {
        history.push(`/lesson/${props.lesson.id}?lang=${props.lang}`)
        
    }
    useEffect(() =>{  
        setStatus(props.lesson.state.base.status)
    },[])

    const wallet = () => {
        
    }  
    
    return (
        <div>
           
           
         {status === "Төлбөргүй" ? (
            <div className={css.hoverButton}
                // className="flex flex-col py-3 items-center border border-blue-500 w-[200px]  hover:border-blue-300  rounded-[5px] " 
                >  
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div className="flex mb-2"> 
                        <div className="mx-3"> {props.lesson.state.base.language}</div> 
                        <div className="mx-3">№{props.lesson.state.base.lessonNumber}</div> 
                        <div className="mx-3">{props.lesson.state.base.level}</div>  
                </div>
                <div className="m-2 text-sm text-blue-300">{props.lesson.state.base.name}</div>  
                <div className="w-[140px] h-[40px] bg-blue-500 rounded-[5px] my-3 flex justify-center items-center text-[20px] p-2 hover:bg-blue-600 hover:scale-110 " onClick={view}>Үзэх </div>
            </div>
         ) : (
            // Төлбөртэй
            <div className="flex flex-col py-3 items-center border border-blue-500 w-[200px]  hover:border-blue-300 rounded-[5px] " >  
                <div className="flex mb-2"> 
                    <div className="mx-3"> {props.lesson.state.base.language}</div> 
                    <div className="mx-3">№{props.lesson.state.base.lessonNumber}</div> 
                    <div className="mx-3">{props.lesson.state.base.level}</div>  
                </div>
                <div >
                    <AiFillLock size={25} className="absolute mt-[90px] ml-[80px] text-red-500"/>
                </div>
                <div className="m-2 text-sm text-blue-300">{props.lesson.state.base.name}</div>  
                <div className="w-[140px] h-[40px] bg-red-500 rounded-[5px] my-3 flex justify-center items-center text-[16px] p-2 hover:bg-red-600 hover:scale-110" onClick={wallet}>2000₮ Төлөх </div>
            </div>
         )}
        </div>
)};

export default Lesson;
