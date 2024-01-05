import React from "react";
import css from "./style.module.css";
import { useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AiFillLock } from "react-icons/ai";
import LessonContext from "../../../context/LessonContext";

const Lesson = (props) => {
  const ctx = useContext(LessonContext);
  const [status, setStatus] = useState("Төлбөргүй");
  const history = useHistory();
  // console.log(ctx.lesson);
  const view = () => {
    ctx.Lesson(props.chLesson, props.chLan, props.chLevel);
    history.push(`/lesson/${props.chLan}/${props.chLevel}/${props.chLesson}`);
  };

  return (
    <div>
      {status === "Төлбөргүй" ? (
        <div
          className={css.hoverButton}
          // className="flex flex-col py-3 items-center border border-blue-500 w-[200px]  hover:border-blue-300  rounded-[5px] "
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div className="flex mb-2">
            <div className="mx-3"> {props.chLan}</div>
            <div className="mx-3">{props.chLevel}</div>
            <div className="mx-3">№{props.chLesson}</div>
          </div>

          <div
            onClick={view}
            className="text-white w-[140px] h-[40px] bg-blue-500 rounded-[5px] my-3 flex justify-center items-center text-[20px] p-2 hover:bg-blue-600 hover:scale-110 "
          >
            Үзэх
          </div>
        </div>
      ) : (
        // Төлбөртэй
        <div className="flex flex-col relative py-3 items-center border border-blue-500 w-[200px]  hover:border-blue-300 rounded-[5px] ">
          <div className="flex mb-2">
            <div className="mx-3"> {props.chLan}</div>
            <div className="mx-3">{props.chLevel}</div>
            <div className="mx-3">№{props.chLesson}</div>
          </div>
          <div>
            <AiFillLock
              size={25}
              className="absolute mt-[50px] ml-[70px] text-red-500"
            />
          </div>
          <div className="w-[140px] h-[40px] bg-red-500 rounded-[5px] my-3 flex justify-center items-center text-[16px] p-2 hover:bg-red-600 hover:scale-110">
            2000₮ Төлөх
          </div>
        </div>
      )}
    </div>
  );
};

export default Lesson;
