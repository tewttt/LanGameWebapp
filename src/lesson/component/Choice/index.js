import React, { useState, useContext, useEffect} from "react";
import LessonContext from "../../../context/LessonContext";
import Spinner from "../../../components/General/Spinner";
import Lesson from "../Lesson";
import useLesson from "../../../hook/useLesson";

const Choice = ({languageId}) => {
  const ctx = useContext(LessonContext);
  const [chLevel, setChLevel] = useState("");
  const { getLessons, lessons, levelId, getLessonId, getLevelId} = useLesson()


  useEffect(() => {
    getLevelId(languageId)
  },[languageId])

  const selectLevel = (level) => {
    setChLevel(level)
    getLessonId(level, languageId)  
    getLessons(level, languageId)
  };


  return (
    <div className="flex text-white flex-col h-screen items-center p-2">
      {ctx.state.loading && <Spinner />}

      <div className="flex flex-wrap gap-2 place-content-center w-full sm:w-[80%] xl:w-[60%]">
        {levelId.map((e, i) => {
          return (
            <div
            className={`${chLevel === e ?"bg-baseBlue1 text-white" : ""  } h-[60px] aspect-square hover:bg-baseBlue1 hover:text-white bg-white font-bold text-baseBlack  flex items-center justify-center rounded-2xl`}
              key={i}
              onClick={() => selectLevel(e.id, i)}
            >
             <p className="text-2xl">{e.id}</p> 
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap pb-32 gap-2 place-content-center">
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

