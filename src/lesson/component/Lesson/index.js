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

  const data = lessonActiveUsers?.find(
    item => item.number == props.lessons.lessonNumber
  );

  useEffect(() => {
    getLessonUsers()
  } ,[])

  const view = () => {
    history.push(`/lesson/${props.lessons.language}/${props.lessons.level}/${props.lessons.lessonNumber}`);
  };


  const payCoin = () => {
    if(props?.lessons?.coin > userCtx.currentUser.coins){
      setShowPay(true)
      
    }else {
      payLesson({
        coin: props?.lessons?.coin,
        label: "paid lesson",
        labelType: "lesson",
        type: "withdraw"
      } , props?.lessons)
    }
   
  }

  const payPrice = () => {
    if(userCtx.currentUser.amount < props?.lessons?.price){
      setShowPay(true)
      
    } else {
      payLesson({
        amount: props?.lessons?.price,
        label: "paid lesson",
        labelType: "lesson",
        type: "withdraw"
      } , props?.lessons)
    }
   
  }

  return ( 
    <div className="text-white mt-4 w-[140px] sm:w-[160px] lg:w-[200px] aspect-square">
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
      {/* {props?.lessons?.acceptStatus === "accept" && (
        
      )} */}
      <div className="h-[140px]">
          {props?.lessons?.status === "Төлбөргүй" || data  ? (
            <div className="flex flex-col p-2 lg:p-4 items-center justify-around border border-blue-500 w-full h-full  rounded-[5px] ">
              <div className="flex w-full justify-between">
                <div className=""> {props.lessons.language}</div>
                <div className="">{props.lessons.level}</div>
                <div className="">№{props.lessons.lessonNumber}</div>
              </div>

              <div
                onClick={view}
                className=" bg-blue-500 rounded-[5px] w-full flex justify-center items-center text-[20px] px-6 py-2 hover:bg-blue-600 hover:scale-110 "
              >
                Watch
              </div>
            </div>
          ) : (
            // Төлбөртэй
          <div className="flex flex-col p-2 lg:p-4 justify-between items-center border border-blue-500 w-full h-full  rounded-[5px] ">
            <div className="flex w-full justify-between">
              <div className=""> {props.lessons.language}</div>
              <div className="">{props.lessons.level}</div>
              <div className="">№{props.lessons.lessonNumber}</div>
            </div>
          
            <div 
              onClick={payPrice}
              className="flex justify-center w-full p-1 bg-green-500 rounded-[5px]  hover:bg-green-600">
                Pay {props?.lessons?.price}₮
            </div>
            <p>or</p>
            <div 
              onClick={payCoin}
              className="flex justify-center w-full p-1 bg-green-500 rounded-[5px] hover:bg-green-600 hover:scale-110">
                Pay {props?.lessons?.coin}coin
            </div>
          </div>
          )}
        </div>
      
    </div>
  );
};

export default Lesson;
