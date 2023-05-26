import React , {useContext, useState} from "react";
import css from "./style.module.css";
import {DefaultPlayer as Video} from "react-html5video"

import photo from "../../../src/assets/img/1.jpg";
import introVideo from "../../../src/assets/video/1.mp4";
import "react-html5video/dist/styles.css";
import { useParams } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import TranslateView from "../../components/translateView";
import ExamView from "../../components/examView";
import ToolSidebar from "../../components/ToolSidebar";
import LessonContext from "../../context/LessonContext"



const LessonView = (props) => {
    const [rating, setRating] = useState(null);
    const ctx = useContext(LessonContext)
     
  
    const {id} = useParams()
    const lessonId = ctx.lessonList.find(
        // item => console.log(item)
         item =>  item.id === id
        );
        // console.log(lessonId.state.translate)
  
    
  
 
    return (
        <div className={css.body}> 
            <ToolSidebar/>
            <div className={css.head}>sss
                <div className={css.text}>{}</div>
                <div className={css.text}>Түвшин: {lessonId.state.base.level}</div>
               
                <div className={css.text}>Хичээлийн дугаар: {}</div>
                <div className={css.text}>хичээлийн нэр: {}</div>
            </div>              
            
            <div className={css.lesson}>
               

                 <div className={css.left}>
                    <Video autoPlay loop 
                    // poster={photo} 
                    on>
                        <source
                         src={lessonId.state.video}
                        // src={introVideo}

                        type="video/webm"
                        />
                    </Video>
                </div>
                <div className={css.right}>
                       
                        <div className={css.grammar}>
                        <img src={lessonId.state.image} className={css.sh}/>
                            {/* <img src={lessonId[1].base.grammar} /> */}
                        </div>
                        <div className={css.new}>{}</div>
                </div>
            </div>

            <div className={css.footer}> 
                <div className={css.translate}>
                    <TranslateView 
                translate={lessonId.state.translate}
                />
                </div>
                <div className={css.exam}>
                    <ExamView 
                    exam={lessonId.state.exam}
                    />
                </div>
            </div>
            <div>
               <StarIcon onClick= {() => setRating(1)} className={css.star}/>
               <StarIcon onClick= {() => setRating(2)} className={css.star}/>
               <StarIcon onClick= {() => setRating(3)} className={css.star}/>
               <StarIcon onClick= {() => setRating(4)} className={css.star}/>
               <StarIcon onClick= {() => setRating(5)} className={css.star}/>

               
            </div>
           
        </div>
    )
}

export default LessonView;