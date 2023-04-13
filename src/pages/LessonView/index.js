import React , {useContext, useState} from "react";
import css from "./style.module.css";
import {DefaultPlayer as Video} from "react-html5video"
import FetchLessonContext from "../../context/FetchLessonContext";
import photo from "../../../src/assets/img/1.jpg";
import introVideo from "../../../src/assets/video/1.mp4";
import "react-html5video/dist/styles.css";
import ReactVideoPlayer from "../../components/ReactVideoPlayer";
import { useParams } from "react-router-dom";
import Toolbar from "../../components/Toolbar";
import StarIcon from '@mui/icons-material/Star';
import TranslateView from "../../components/view/translateView";
import ExamView from "../../components/view/examView";


const LessonView = (props) => {
    const [rating, setRating] = useState(null);

    
    const ctx = useContext(FetchLessonContext)
    const {id} = useParams()
    const lessonId = ctx.state.lesson.find(item => item[0] ===id );
    // const view= lessonId.find(item => item[1])
    // console.log(lessonId)
    // console.log(lessonId[1])
    // console.log(lessonId[1].base.video)
    // console.log(lessonId[1].translate)

    // {props.lessons.map(el => (
    //     <Lesson key={el[0]} lesson={el}/>
    // ))}
    
  
 
    return (
        <div className={css.body}> 
            <Toolbar/>
            <div className={css.head}>
                <div className={css.text}>{}</div>
                <div className={css.text}>Түвшин: {lessonId[1].base.level}</div>
               
                <div className={css.text}>Хичээлийн дугаар: {lessonId[1].base.lessonNumber}</div>
                <div className={css.text}>хичээлийн нэр: {lessonId[1].base.name}</div>
            </div>              
            
            <div className={css.lesson}>
                 <div className={css.left}>
                    <Video autoPlay loop 
                    // poster={photo} 
                    on>
                        <source
                        //  src={lessonId[1].base.video}
                        // src={introVideo}

                        type="video/webm"
                        />
                    </Video>
                </div>
                <div className={css.right}>
                       
                        <div className={css.grammar}>
                            {/* <img src={lessonId[1].base.grammar} /> */}
                        </div>
                        <div className={css.new}>{lessonId[1].base.newWord}</div>
                </div>
            </div>

            <div className={css.footer}> 
                <div className={css.translate}><TranslateView translate={lessonId[1].translate}/></div>
                <div className={css.exam}><ExamView exam={lessonId[1].exam}/></div>
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