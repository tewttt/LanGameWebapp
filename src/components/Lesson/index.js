import React from "react";
import css from "./style.module.css";
import { useHistory, Link } from "react-router-dom";
import LessonView from "../../pages/LessonView";
import FetchLessonContext from "../../context/FetchLessonContext";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarIcon from '@mui/icons-material/Star';

const Lesson = props => {
    const ctx = useState(FetchLessonContext)
    const history = useHistory();
    const [rating, setRating] = useState(null);

    const lessonId = () => {
        // history.push(/lesson/${});
        // history.push("/lesson/id");
    }
    const view = () => {
        history.push(`/lesson/${props.lesson[0]}`)
    }
   
    // console.log(props.lesson[1].base)
    return (
        <div className={css.lesson} 
        
        onClick={lessonId}
        >  
           



            <div style={{display: "flex", flexDirection: "row", padding: "3px"}}>
                    <div style={{margin: "0px 10px"}}> {props.lesson[1].base.language}</div> <br/> 
                    <div style={{margin: "0px 10px"}}>{props.lesson[1].base.level}</div>  <br/>
                    <div style={{margin: "0px 10px"}}>№:</div>{props.lesson[1].base.lessonNumber}  <br/>
                    {/* <div>grammar
                        <img src={props.lesson[1].base.grammar} />
                    </div> */}
                
            </div>

            <div>
            <p><strong style={{fontSize: "30px"}}> {props.lesson[1].base.name}</strong></p>
            </div>
            
            <div>
               <StarIcon onClick= {() => setRating(1)} className={css.star}/>
               <StarIcon onClick= {() => setRating(2)} className={css.star}/>
               <StarIcon onClick= {() => setRating(3)} className={css.star}/>
               <StarIcon onClick= {() => setRating(4)} className={css.star}/>
               <StarIcon onClick= {() => setRating(5)} className={css.star}/>

               
            </div>
            <div className={css.jump} onClick={view}>Үзэх
            {/* <Link to={`/lesson/${props.lesson[0]}`} className={css.link}>Үзэх</Link> */}
           
            </div>
        </div>
    )
};

export default Lesson;
