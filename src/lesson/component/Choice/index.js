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
    <div className="flex  text-white flex-col md:mt-14 h-screen  items-center pt-2 pb-32 px-6">
      {ctx.state.loading && <Spinner />}
      {/* <div className={css.text}>Хэл сонгох</div> */}
      
      <div className="flex md:mt-10 justify-between mb-2  w-full sm:w-[80%] xl:w-[60%]">
        {lanId.map((lan, i) => {
          return (
            <div
            className={`${chLan === lan ?  "bg-baseBlue1 text-white" : "" } w-[90px] sm:w-1/3 mx-1 hover:bg-baseBlue1 hover:text-white md:text-2xl bg-white font-bold text-baseBlack p-4 flex items-center justify-center rounded-2xl` }
             
              key={i}
              onClick={() => selectLan(lan.id)}
            >
              {lan.id}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-between w-full sm:w-[80%] xl:w-[60%]">
        {levelId.map((e, i) => {
          return (
            <div
            className={`${chLevel === e ?  "bg-baseBlue1 text-white" : ""  }w-[40px] h-[40px] sm:w-[60px] sm:h-[50px] hover:bg-baseBlue1 hover:text-white md:text-2xl bg-white font-bold text-baseBlack md:p-5 flex items-center justify-center rounded-2xl m-1 md:m-2` }
              
              key={i}
              onClick={() => selectLevel(e.id, i)}
            >
              {e.id}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
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

