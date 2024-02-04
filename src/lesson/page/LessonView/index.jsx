import React, { useContext, useState } from "react";
import css from "./style.module.css";
import { Switch, Route , useHistory} from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import TranslateView from "../../view/translateView";
import ExamView from "../../view/examView";
import GrammarView from "../../view/grammarView";
import WordView from "../../view/wordView";
import VideoView from "../../view/videoView";
import ToolSidebar from "../../../components/ToolSidebar";
import LessonContext from "../../../context/LessonContext";

const LessonView = () => {
  const history = useHistory();
  const [rating, setRating] = useState(null);
  const ctx = useContext(LessonContext);

  const lan = ctx?.lesson?.language
  const level= ctx?.lesson?.level
  const number = ctx?.lesson?.lessonNumber

 const word = () => {
    history.push(`/lesson/${lan}${level}${number}/word`)
 }
 const video = () => {
    history.push(`/lesson/${lan}${level}${number}`)
 }
 const grammar = () => {
    history.push(`/lesson/${lan}${level}${number}/grammar`)
 }
 const exam = () => {
    history.push(`/lesson/${lan}${level}${number}/exam`)
 }
 const translate = () => {
    history.push(`/lesson/${lan}${level}${number}/translate`)
 }
 
  return (
    <div>
      <ToolSidebar />
      <div className="flex flex-col pt-[50px] text-sm text-[12px]">
        <div className="flex flex-col md:flex-row md:mb-2">
          <div className="flex mt-2 justify-around md:mt-0">
            <div className="mx-3 ">Хэл: {ctx?.lesson?.language}</div>
            <div className="mx-3">Түвшин: {ctx?.lesson?.level}</div>
            <div className="mx-3 ">Хичээлийн дугаар:  {ctx?.lesson?.lessonNumber}</div>
          </div>
          <div className=" flex items-center mb-2 md:mb-0">
            <p className=" mx-6 sm:mx-16">Хичээлийн нэр:</p>
            <h1 className="text-blue-500 ">{ctx.lesson.name}</h1>
          </div>
        </div>
        <div className="flex" >
            <button 
              onClick={video} 
              className={`${history.location.pathname == `/lesson/${lan}${level}${number}` ? "bg-blue-700 text-white" : ""} mx-1  w-[70px] h-[30px]  flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} 
            >
                Video
            </button>
            <button onClick={grammar}  
                className={`${history.location.pathname == `/lesson/${lan}${level}${number}/grammar` ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`}
                 >Дүрэм</button>
            <button onClick={word} 
                className={`${history.location.pathname ==`/lesson/${lan}${level}${number}/word` ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`}
                 >
                Шинэ үг
            </button>
            <button onClick={translate} 
                className={`${history.location.pathname == `/lesson/${lan}${level}${number}/translate` ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`}
                 >
                Орчуулга
            </button>
            <button onClick={exam} 
                className={`${history.location.pathname == `/lesson/${lan}${level}${number}/exam` ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`}
                 >
                Шалгалт
            </button>
           
        </div>                
        <Switch>
          <Route path="/lesson/:id/translate" component={TranslateView}/>
          <Route path="/lesson/:id/word" component={WordView}/>
          <Route path="/lesson/:id/exam" component={ExamView}/>
          <Route path="/lesson/:id/grammar" component={GrammarView}/>
          <Route path='/lesson/:id' component={VideoView} />
        </Switch>
      </div>
    </div>
  );
};

export default LessonView;

{/* <div className={css.bodyStar}>
<StarIcon onClick={() => setRating(1)} className={css.star} />
<StarIcon onClick={() => setRating(2)} className={css.star} />
<StarIcon onClick={() => setRating(3)} className={css.star} />
<StarIcon onClick={() => setRating(4)} className={css.star} />
<StarIcon onClick={() => setRating(5)} className={css.star} />
</div> */}

// let query = useQuery();
// console.log('lang', query.get("lang"))

// let lessonId = null
// if(query.get("lang") == 'Англи хэл') {
//     lessonId = ctx.englishList.find(
//         item =>  item.id === id
//     );
// } else if(query.get("lang") == 'Солонгос хэл') {
//     lessonId = ctx.koreaList.find(
//         item =>  item.id === id
//     );
// } else if(query.get("lang") == "Монгол хэл") {
//     lessonId = ctx.mongoliaList.find(
//         item =>  item.id === id
//     );
// }