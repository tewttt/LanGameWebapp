import React from "react";
import css from "./style.module.css";
import { useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AiFillLock } from "react-icons/ai";
import LessonContext from "../../../context/LessonContext";
import UserContext from "../../../context/UserContext";
import usePayment from "../../../hook/usePayment";
const Lesson = (props) => {
  const {payLesson} = usePayment()
  const userCtx = useContext(UserContext)
  const ctx = useContext(LessonContext);
  const [status, setStatus] = useState(props?.lesson?.status);
  const history = useHistory();
  // console.log(userCtx.currentUser.amount)
  console.log(props.lesson.user)

const lessonPaidUserId = props?.lesson?.user
// console.log(lessonPaidUserId)

  const view = () => {
    ctx.Lesson(props.chLesson, props.chLan, props.chLevel);
    history.push(`/lesson/${props.chLan}/${props.chLevel}/${props.chLesson}`);
  };


  const payCoin = () => {
    if(props?.lesson?.coin > userCtx.currentUser.coins){
      alert("coin hvrkv + dans tsenegle")
    }else {
      payLesson({
        coin: props?.lesson?.coin,
        label: "paid lesson",
        labelType: "lesson",
        type: "withdraw"
      } , props?.lesson)
    }
   
  }
  const payPrice = () => {
    if(userCtx.currentUser.amount < props?.lesson?.price){
      alert("amount hvrkv")
    } else {
      payLesson({
        amount: props?.lesson?.price,
        label: "paid lesson",
        labelType: "lesson",
        type: "withdraw"
      } , props?.lesson)
    }
   
  }
  return (
    <div>
      {status === "Төлбөргүй" || props.lesson.user.length > 0 ? (
        <div
        // className="text-black"
          className={`${css.hoverButton}`}
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
            className=" w-[140px] h-[40px] bg-blue-500 rounded-[5px] my-3 flex justify-center items-center text-[20px] p-2 hover:bg-blue-600 hover:scale-110 "
          >
            Watch
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
        <div 
          onClick={payPrice}
          className="flex flex-col w-[140px] bg-red-500 rounded-[5px] text-[16px]hover:bg-red-600 hover:scale-110">
          <div className="flex">
            Pay {props?.lesson?.price}₮
          </div>
        </div>
        <p>or</p>
        <div 
          onClick={payCoin}
          className="flex flex-col w-[140px] bg-red-500 rounded-[5px] text-[16px]hover:bg-red-600 hover:scale-110">
          <div className="flex">
            Pay {props?.lesson?.coin}coin
          </div>
          
        </div>
      </div>
      )}
    </div>
  );
};

export default Lesson;
