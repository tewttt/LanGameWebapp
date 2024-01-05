import React, { useContext, useEffect, useState } from "react";
import css from "./style.module.css";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { useParams, useLocation, Switch, Route , useHistory} from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import TranslateView from "../../view/translateView";
import ExamView from "../../view/examView";
import GrammarView from "../../view/grammarView";
import WordView from "../../view/wordView";
import ToolSidebar from "../../../components/ToolSidebar";
import LessonContext from "../../../context/LessonContext";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const LessonView = (props) => {
  const history = useHistory();
  const [rating, setRating] = useState(null);
  const ctx = useContext(LessonContext);
  const { id } = useParams();

 const word = () => {
  history.push("")
  ctx.wordfun()
 }
 const video = () => {
  history.push("")
  // ctx.grammarfun()
 }
 const grammar = () => {
  history.push("")
  // ctx.grammarfun()
 }
 const exam = () => {
  history.push("")
  // ctx.grammarfun()
 }
 const translate = () => {
  history.push("")
  // ctx.grammarfun()
 }
 

  return (
    <div>
      <ToolSidebar />
      <div className="flex flex-col pt-[50px] text-sm text-white text-[12px]">
        <div className="flex justify-between m-3 items-center uppercase">
          <div onClick={video}>video</div>
          <div
            className="border-b-2 pb-2 rounded-xl"
            onClick={grammar}
          >
            grammar
            {/* <img src={lessonId.state.grammar} className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"/> */}
          </div>
          <div onClick={word}>
            newword
            {/* <img src={lessonId.state.newWord} className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"/> */}
          </div>
          <div onClick={() => ctx.translatefun()}>
            translate
            {/* <TranslateView /> */}
          </div>
          <div onClick={() => ctx.examfun()}>
            Exam
            {/* <ExamView exam={lessonId.state.exam}/> */}
            {/* <ExamView/> */}
          </div>
        </div>
        {/* <button >Тоглох</button> */}

        <Switch>
          <Route path="" />
          <Route path="" component={TranslateView}/>
          <Route path="" component={WordView}/>
          <Route path="" component={ExamView}/>
          <Route path="" component={GrammarView}/>
        </Switch>
        <div className="flex flex-col md:flex-row md:mb-2">
          <div className="flex mt-2 justify-around md:mt-0">
            {/* <div className="mx-3 text-gray-300 ">Хэл: {lessonId.state.base.language}</div>
                        <div className="mx-3 text-gray-300 ">Түвшин: {lessonId.state.base.level}</div>
                        <div className="mx-3 text-gray-300 ">Хичээлийн дугаар:  {lessonId.state.base.lessonNumber}</div> */}
          </div>
          <div className=" flex items-center mb-2 md:mb-0">
            <div className=" text-gray-300 mx-6 sm:mx-16">Хичээлийн нэр:</div>
            <h1 className="text-blue-500 ">{ctx.lesson.name}</h1>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="w-full md:w-[70%]">
            <Video
              //  autoPlay loop
              // poster={photo}
              on
            >
              <source src={ctx.lesson.video} type="video/webm" />
            </Video>
          </div>

          <div className="flex flex-col ">
            <div className="text-[12px] text-gray-300">
              <img
                src={ctx.lesson.image}
                className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"
              />
            </div>
          </div>
        </div>

        <div className={css.bodyStar}>
          <StarIcon onClick={() => setRating(1)} className={css.star} />
          <StarIcon onClick={() => setRating(2)} className={css.star} />
          <StarIcon onClick={() => setRating(3)} className={css.star} />
          <StarIcon onClick={() => setRating(4)} className={css.star} />
          <StarIcon onClick={() => setRating(5)} className={css.star} />
        </div>
      </div>
    </div>
  );
};

export default LessonView;

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