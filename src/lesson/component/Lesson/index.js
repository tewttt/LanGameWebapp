import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../../context/UserContext";
import usePayment from "../../../hook/usePayment";
import useLesson from "../../../hook/useLesson";
import Modal from "../../../components/General/Modal";
import useAds from "../../../hook/useAds"

const Lesson = (props) => {
  const { getLessonUsers ,  lessonActiveUsers} = useLesson(props.lessons.language, props.lessons.level, props.lessons.lessonNumber)
  const {payLesson } = usePayment()
  const { filterAds} = useAds()
  const userCtx = useContext(UserContext)
  const history = useHistory();
  const [showPay , setShowPay] = useState(false)
  const [info, setInfo] = useState(false)
  const [confirmCoin, setConfirmCoin] = useState(false)
  const [confirmAmount, setConfirmAmount] = useState(false)
// console.log(userCtx.currentUser.gender , userCtx.currentUser.age)
  const data = lessonActiveUsers?.find(
    item => item?.number == props?.lessons?.lessonNumber
  );
  useEffect(() => {
    getLessonUsers()
  } ,[])  

  const view = (adsId) => {
    history.push(`/lesson/${props.lessons.language}/${props.lessons.level}/${props.lessons.lessonNumber}/${adsId}`);
  };

  const payCoin = () => {
    if(userCtx?.currentUser?.gender === "" && userCtx.currentUser?.age === ""){
      setInfo(true)
    } else if(props?.lessons?.coin >= userCtx.currentUser.coins) {
        setShowPay(true)
    } else {
      setConfirmCoin(true)
          // payLesson({
          //   coin: props?.lessons?.coin,
          //   label: "paid lesson",
          //   labelType: "lesson",
          //   type: "withdraw",
          //   language:props?.lessons?.language,
          //   level:props?.lessons?.level,
          //   number:props?.lessons?.lessonNumber
          // } , props?.lessons)
      }
    
  }

  const payPrice = () => {
    if(userCtx?.currentUser?.gender === "" && userCtx.currentUser?.age === ""){
      setInfo(true)
    }else if(userCtx.currentUser.amount <= props?.lessons?.price){
        setShowPay(true)
      } else {
        setConfirmAmount(true)
        // payLesson({
        //   amount: props?.lessons?.price,
        //   label: "paid lesson",
        //   labelType: "lesson",
        //   type: "withdraw",
        //   language:props?.lessons?.language,
        //   level:props?.lessons?.level,
        //   number:props?.lessons?.lessonNumber
        // } , props?.lessons)
      }
    
  }

  const payLessonCoin = () =>{
    // alert("bnnu")
     payLesson({
            coin: props?.lessons?.coin,
            label: "paid lesson",
            labelType: "lesson",
            type: "withdraw",
            language:props?.lessons?.language,
            level:props?.lessons?.level,
            number:props?.lessons?.lessonNumber
          } , props?.lessons)
          setConfirmCoin(false)
  }

  const payLessonAmount = () => {
      payLesson({
          amount: props?.lessons?.price,
          label: "paid lesson",
          labelType: "lesson",
          type: "withdraw",
          language:props?.lessons?.language,
          level:props?.lessons?.level,
          number:props?.lessons?.lessonNumber
        } , props?.lessons)
        setConfirmAmount(false)
  }
// console.log(props.lessons)
  return ( 
    <div className="text-white mt-4 w-[300px] sm:w-[280px] aspect-auto">
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
      <Modal show={confirmCoin}>
        <div>
          <p className="text-center text-xl">Хичээл {props?.lessons?.coin} COIN-р худалдаж авах</p>
          <p className="text-center">Нэг удаа төлөөд, хязгааргүй үзээрэй</p>
          <div className="flex justify-around mt-4 text-white font-semibold">
            <button 
              className="bg-green-500 rounded-2xl py-2 px-6"
              onClick={() => payLessonCoin()}>Buy</button>
            <button 
              className="bg-red-500 rounded-2xl py-2 px-6"
              onClick={() => setConfirmCoin(false)} >CLOSE</button>
          </div>
        </div>
      </Modal>
      <Modal show={confirmAmount}>
        <div>
          <p className="text-center text-xl">Хичээл {props?.lessons?.price}₮-р худалдаж авах</p>
          <p className="text-center">Нэг удаа төлөөд, хязгааргүй үзээрэй</p>
          <div className="flex justify-around mt-4 text-white font-semibold">
            <button 
              className="bg-green-500 rounded-2xl py-2 px-6"
              onClick={() => payLessonAmount()}>Buy</button>
            <button 
              className="bg-red-500 rounded-2xl py-2 px-6"
              onClick={() => setConfirmAmount(false)} >CLOSE</button>
          </div>
        </div>
      </Modal>
      <div className="h-full">
          {props?.lessons?.status === "Төлбөргүй" || data  ? (

            <div className="flex flex-col p-1 items-center justify-around border border-blue-500 w-full aspect-square  rounded-[5px] ">
              
                <div className="flex font-bold text-xl md:text-lg w-full justify-between px-1">
                  <p className=""> {props?.lessons?.language}</p>
                  <p className="mx-2">{props?.lessons?.level}</p>
                  <p className="mx-2 text-helpGreen text-2xl">№{props?.lessons?.lessonNumber}</p>
                </div>
              
                <p className="text-center text-lg">{props?.lessons?.name}</p>
                <p className="mt-1 text-xs md:sm text-center text-gray-400">{props?.lessons?.text}</p>

                {filterAds?.map((ads, index) => {
                  return (
                    <div key={index} className="flex flex-row w-full">
                      {index === 0 && 
                        <button
                          onClick={() => view(ads?.id)}
                          className=" bg-baseBlue1 font-bold rounded-[5px] w-full flex justify-center items-center text-3xl px-6 py-4 hover:bg-baseBlue1/80"
                        >
                          Watch
                        </button>
                            
                        }
                    </div>
                  )
                })}
                {filterAds?.length === 0 && 
                  <button
                    onClick={() => view(0)}
                    className=" bg-baseBlue1 font-bold rounded-[5px] w-full flex justify-center items-center text-3xl px-6 py-4 hover:bg-baseBlue1/80"
                  >
                  Watch
                  </button>
                }
             
            </div>

            ) : (
            // Төлбөртэй
            <div className="flex flex-col p-1 justify-between items-center border border-blue-500 w-full aspect-square  rounded-[5px] ">
              
              <div className="flex text-xl font-bold md:text-lg w-full justify-between px-1">
                <p className=""> {props?.lessons?.language}</p>
                <div className="">{props?.lessons?.level}</div>
                <div className="text-helpGreen text-2xl">№{props?.lessons?.lessonNumber}</div>
              </div>
                <p className="text-center text-base">{props?.lessons?.name}</p>
                <p className="mt-1 text-xs md:sm text-center text-gray-400">{props?.lessons?.text}</p>
            
              <div 
                onClick={payPrice}
                className="flex flex-col items-center justify-center w-full bg-helpGreen rounded-[5px]  hover:bg-helpGreen/80">
                  <p className="font-bold text-2xl text-gray-600">{props?.lessons?.price}₮</p>
                  <p className="text-sm text-gray-600">Нэг удаа төлөөд, хязгааргүй үзээрэй</p>
              </div>
              
              <div 
                onClick={payCoin}
                className="flex flex-col items-center text-gray-600 justify-center  w-full bg-helpGreen rounded-[5px] hover:bg-helpGreen/80">
                  <p className="font-bold text-2xl ">{props?.lessons?.coin}coin</p>
                  <p className="text-sm ">Нэг удаа төлөөд, хязгааргүй үзээрэй</p>
              </div>
            </div>
          )}
      </div>
     
    </div>
  );
};

export default Lesson;
