import React, { useState, useContext, useEffect } from "react";
import css from "./style.module.css";
import LessonContext from "../../../context/LessonContext";
import Spinner from "../../../components/General/Spinner";
import Lesson from "../Lesson";
import useLesson from "../../../hook/useLesson";

const Choice = () => {

  const ctx = useContext(LessonContext);
  const { getLessons, lessons, lanId , levelId, lessonsId , getLessonId, getLevelId} = useLesson()
  const [chLan, setChLan] = useState("");
  const [chLevel, setChLevel] = useState("");

  const selectLan = (lan, i) => {
    setChLan(lan);
    getLevelId(lan)
  };

  const selectLevel = (level, i) => {
    setChLevel(level)
    getLessonId(level, chLan)  
    getLessons(level, chLan)
  };
  

  return (
    <div className="flex  text-white flex-col md:mt-14 h-screen  items-center pt-2 pb-32 px-6">
      {ctx.state.loading && <Spinner />}
      {/* <div className={css.text}>Хэл сонгох</div> */}
      
      <div className="flex md:mt-10 ">
        {lanId.map((lan, i) => {
          return (
            <div
            className={`${chLan === lan ?  "bg-baseBlue1 text-white" : "" } md:w-[140px] md:h-[60px] hover:bg-baseBlue1 hover:text-white md:text-2xl bg-white font-bold text-baseBlack p-5 flex items-center justify-center rounded-2xl m-2` }
              // className={`${chLan === lan ? css.laan : ""} ${css.nolan} m-1 p-2`}
              key={i}
              onClick={() => selectLan(lan.id)}
            >
              {lan.id}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center">
        {levelId.map((e, i) => {
          return (
            <div
            className={`${chLevel === e ?  "bg-baseBlue1 text-white" : ""  }w-[40px] h-[40px] md:w-[60px] md:h-[60px] hover:bg-baseBlue1 hover:text-white md:text-2xl bg-white font-bold text-baseBlack md:p-5 flex items-center justify-center rounded-2xl m-1 md:m-2` }
              // className={`${chLevel === e ? css.laan : ""} ${css.nolan} w-[40px] md:w-[60px] m-1 p-2 `}
              key={i}
              onClick={() => selectLevel(e.id, i)}
            >
              {e.id}
            </div>
          );
        })}
      </div>

      <div className="flex  flex-wrap gap-2 justify-center">
        {lessons.map((e, i) => {
          return (
            <div key={i}>
              <Lesson lessons={e}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Choice;

