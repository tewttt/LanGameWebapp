import React, { useState, useContext } from "react";
import css from "./style.module.css";
import LessonContext from "../../../context/LessonContext";
import Spinner from "../../../components/General/Spinner";
import Lesson from "../Lesson";

const Choice = () => {
  const ctx = useContext(LessonContext);
  // console.log(ctx.lessons[0].status)
  let arrLevel = ctx.levelId;
  let arrLanguage = ctx.lanId;
  let arrLesson = ctx.lessons;
  // let arrLesson = ctx.lessonId

  const [chLan, setChLan] = useState("");
  const [lanActive, setLanActive] = useState("");
  const [levelActive, setLevelActive] = useState("");
  const [chLevel, setChLevel] = useState("");

  const selectLan = (lan, i) => {
    setLanActive(i);
    setChLan(lan);
    ctx.Level(lan);
  };

  const selectLevel = (level, i) => {
    setLevelActive(i);
    setChLevel(level);
    // ctx.getLessonId(level, chLan)
    ctx.Lessons(level, chLan); 
  };


  return (
    <div className="flex flex-col mt-10 w-full items-center px-6">
      {ctx.state.loading && <Spinner />}
      <div className={css.text}>Хэл сонгох</div>

      <div className="flex">
        {arrLanguage.map((lan, i) => {
          return (
            <div
              className={`${lanActive === i ? css.laan : ""} ${css.nolan} m-1 p-2`}
              key={i}
              onClick={() => selectLan(lan.id, i)}
            >
              {lan.id}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap">
        {arrLevel.map((e, i) => {
          return (
            <div
              className={`${levelActive === i ? css.laan : ""} ${css.nolan} w-[40px] m-1 p-2 `}
              key={i}
              onClick={() => selectLevel(e.id, i)}
            >
              {e.id}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap">
        {arrLesson.map((e, i) => {
          return (
            <div key={i}>
              <Lesson lesson={e} chLesson={e.id} i={i} chLan={chLan} chLevel={chLevel} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Choice;

