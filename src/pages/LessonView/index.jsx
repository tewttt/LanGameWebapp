import React , {useContext, useState} from "react";
import css from "./style.module.css";
import {DefaultPlayer as Video} from "react-html5video"
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
        <div>
            <ToolSidebar/>
            <div className="flex flex-col text-sm text-white text-[12px]">
                <div className="flex flex-col md:flex-row md:mb-2">
                    <div className="flex mt-2 justify-around md:mt-0">
                        <div className="mx-3 text-gray-300 ">Хэл: {lessonId.state.base.language}</div>
                        <div className="mx-3 text-gray-300 ">Түвшин: {lessonId.state.base.level}</div>
                        <div className="mx-3 text-gray-300 ">Хичээлийн дугаар:  {lessonId.state.base.lessonNumber}</div>
                    </div>        
                    <div className=" flex items-center mb-2 md:mb-0">
                        <div className=" text-gray-300 mx-6 sm:mx-16">Хичээлийн нэр:</div> 
                        <h1 className="text-blue-500 ">{lessonId.state.base.name}</h1>
                    </div>    
                </div>  
                
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full md:w-[70%]">
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

                    <div className="flex flex-col ">
                            <div className="text-[12px] text-gray-300"> image
                                <img src={lessonId.state.image} className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"/> 
                            </div>
                            <div className="text-[12px] text-gray-300"> grammar
                                <img src={lessonId.state.grammar} className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"/>
                            </div>
                            <div className={css.grammar}> newword
                                <img src={lessonId.state.newWord} className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"/>
                            </div>
                    </div>
                </div>

                <div> 
                    <div >
                        <TranslateView translate={lessonId.state.translate}/>
                    </div>
                    <div className={css.exam}>
                        <ExamView exam={lessonId.state.exam}/>
                    </div>
                </div>
                <div className={css.bodyStar}>
                    <StarIcon onClick= {() => setRating(1)} className={css.star}/>
                    <StarIcon onClick= {() => setRating(2)} className={css.star}/>
                    <StarIcon onClick= {() => setRating(3)} className={css.star}/>
                    <StarIcon onClick= {() => setRating(4)} className={css.star}/>
                    <StarIcon onClick= {() => setRating(5)} className={css.star}/>
                </div>
            </div>
        </div>
    )
}

export default LessonView;