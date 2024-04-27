import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../../context/UserContext";
import usePayment from "../../../hook/usePayment";
import useLesson from "../../../hook/useLesson";
import Modal from "../../../components/General/Modal";

const Lesson = (props) => {
  const { getLessonUsers ,  lessonActiveUsers} = useLesson(props.lessons.language, props.lessons.level, props.lessons.lessonNumber)
  const {payLesson } = usePayment()
  const userCtx = useContext(UserContext)
  const history = useHistory();
  const [showPay , setShowPay] = useState(false)
  const [info, setInfo] = useState(false)
// console.log(userCtx.currentUser.gender , userCtx.currentUser.age)
  const data = lessonActiveUsers?.find(
    item => item?.number == props?.lessons?.lessonNumber
  );
  useEffect(() => {
    getLessonUsers()
  } ,[])  

  const view = () => {
    history.push(`/lesson/${props.lessons.language}/${props.lessons.level}/${props.lessons.lessonNumber}`);
  };

  const payCoin = () => {
    if(userCtx?.currentUser?.gender === "" && userCtx.currentUser?.age === ""){
      setInfo(true)
    }else {
      if(props?.lessons?.coin >= userCtx.currentUser.coins){
        setShowPay(true)
      }else {
          payLesson({
            coin: props?.lessons?.coin,
            label: "paid lesson",
            labelType: "lesson",
            type: "withdraw",
            language:props?.lessons?.language,
            level:props?.lessons?.level,
            number:props?.lessons?.lessonNumber
          } , props?.lessons)
      }
    }
  }

  const payPrice = () => {
    if(userCtx?.currentUser?.gender === "" && userCtx.currentUser?.age === ""){
      setInfo(true)
    }else {
      if(userCtx.currentUser.amount <= props?.lessons?.price){
        setShowPay(true)
      } else {
        payLesson({
          amount: props?.lessons?.price,
          label: "paid lesson",
          labelType: "lesson",
          type: "withdraw",
          language:props?.lessons?.language,
          level:props?.lessons?.level,
          number:props?.lessons?.lessonNumber
        } , props?.lessons)
      }
    }
  }

  return ( 
    <div className="text-white mt-4 w-[140px] sm:w-[160px] lg:w-[200px] aspect-auto">
      <Modal show={showPay}>
        <div>
          <p className="text-center">Таны дансны үлдэгдэл хүрэлцэхгүй байна.</p>
          <div className="flex justify-around mt-4 text-white font-semibold">
            <button 
              className="bg-green-500 rounded-2xl py-2 px-6"
              onClick={() => history.push("/wallet")}>payment </button>
            <button 
              className="bg-red-500 rounded-2xl py-2 px-6"
              onClick={() => setShowPay(false)} >close</button>
          </div>
        </div>
      </Modal>
      <Modal show={info}>
        <div>
          <p className="text-center">Хувийн мэдээллээ гүйцэт бөглөнө үү.</p>
          <p className="text-center">Please complete your personal information</p>
          <div className="flex justify-around mt-4 text-white font-semibold">
            <button 
              className="bg-green-500 rounded-2xl py-2 px-6"
              onClick={() => history.push("/profile")}>FILL</button>
            <button 
              className="bg-red-500 rounded-2xl py-2 px-6"
              onClick={() => setInfo(false)} >CLOSE</button>
          </div>
        </div>
      </Modal>
      <div className="h-full">
          {props?.lessons?.status === "Төлбөргүй" || data  ? (
            <div className="flex flex-col p-2 items-center justify-around border border-blue-500 w-full aspect-square  rounded-[5px] ">
              
              <div className="flex text-base md:text-lg w-full justify-between px-1">
                <p className=""> {props.lessons.language}</p>
                <p className="mx-2">{props.lessons.level}</p>
                <p className="mx-2">№{props.lessons.lessonNumber}</p>
              </div>
              <div
                onClick={view}
                className=" bg-baseBlue1 font-semibold rounded-[5px] w-full flex justify-center items-center text-[20px] px-6 py-4 hover:bg-baseBlue1/80"
              >
                Watch
              </div>
            </div>
            ) : (
            // Төлбөртэй
            <div className="flex flex-col p-2 lg:p-4 justify-between items-center border border-blue-500 w-full aspect-square  rounded-[5px] ">
              
              <div className="flex text-base md:text-lg w-full justify-between px-1">
                <p className=""> {props.lessons.language}</p>
                <div className="">{props.lessons.level}</div>
                <div className="">№{props.lessons.lessonNumber}</div>
              </div>
            
              <div 
                onClick={payPrice}
                className="flex justify-center w-full px-1 py-2 font-bold bg-helpGreen rounded-[5px]  hover:bg-helpGreen/80">
                  {props?.lessons?.price}₮
              </div>
              
              <div 
                onClick={payCoin}
                className="flex justify-center w-full px-1 py-2 font-bold bg-helpGreen rounded-[5px] hover:bg-helpGreen/80">
                  {props?.lessons?.coin}coin
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default Lesson;
