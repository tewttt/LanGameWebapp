import React, { useState, useContext} from "react";
import LessonContext from "../../../context/LessonContext";
import Spinner from "../../../components/General/Spinner";
import Lesson from "../Lesson";
import useLesson from "../../../hook/useLesson";

const Choice = () => {
  const ctx = useContext(LessonContext);
  const { getLessons, lessons, lanId , levelId, getLessonId, getLevelId} = useLesson()
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
    <div className="flex text-white flex-col h-screen items-center p-2">
      {ctx.state.loading && <Spinner />}
      
      <div className="flex flex-wrap gap-2 place-content-center mb-2  w-full sm:w-[80%] xl:w-[60%]">
        {lanId.map((lan, i) => {
          return (
            <div
            className={`${chLan === lan ?  "bg-baseBlue1 text-white" : "" } w-[30%] hover:bg-baseBlue1 hover:text-white md:text-2xl bg-white font-bold text-baseBlack p-4 flex items-center justify-center rounded-2xl` }
              key={i}
              onClick={() => selectLan(lan.id)}
            >
              {lan.id}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 place-content-center w-full sm:w-[80%] xl:w-[60%]">
        {levelId.map((e, i) => {
          return (
            <div
            className={`${chLevel === e ?"bg-baseBlue1 text-white" : ""  } h-[40px] w-[14%] aspect-square hover:bg-baseBlue1 hover:text-white bg-white font-bold text-baseBlack  flex items-center justify-center rounded-2xl`}
              key={i}
              onClick={() => selectLevel(e.id, i)}
            >
              {e.id}
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

