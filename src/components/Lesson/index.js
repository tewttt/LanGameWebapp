import React from "react";
import css from "./style.module.css";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';


const Lesson = props => {
 
    const history = useHistory();
    const view = () => {
        history.push(`/lesson/${props.lesson[0]}`)
    }
   

    return (
        <div className={css.lesson} >  
           
            <div style={{display: "flex", flexDirection: "row", padding: "3px"}}>
                    <div style={{margin: "0px 10px"}}> {props.lesson[1].base.language}</div> <br/> 
                    <div style={{margin: "0px 10px"}}>{props.lesson[1].base.level}</div>  <br/>
                    <div style={{margin: "0px 10px"}}>№:</div>{props.lesson[1].base.lessonNumber}  <br/>
                   
                
            </div>

            <div>
            <p><strong style={{fontSize: "30px"}}> {props.lesson[1].base.name}</strong></p>
            </div>
          
            <div className={css.jump} onClick={view}>Үзэх </div>
            <div className={css.jump} onClick={view}>2000₮ Төлөх </div>
            {/* <Link to={`/lesson/${props.lesson[0]}`} className={css.link}>Үзэх</Link> */}
           
           
        </div>
    )
};

export default Lesson;
