import React, { useState,  useEffect , useRef, useContext } from "react";
import Dice from "../../components/Dice";
import Field from "../../components/Field/Field";
import Modal from "../../../components/General/Modal";
import Spinner from "../../../components/General/Spinner";
import { useParams } from "react-router-dom";
import useGame from "../../../hook/useGame";
import UserContext from "../../../context/UserContext";
import shield from "../../../assets/game/Shield 1.png"
import go from "../../../assets/game/Go 1.png"
import back from "../../../assets/game/Back 1.png"
import Footer from "../../components/Footer/Footer";
import { RiCopperCoinFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { LuCrown } from "react-icons/lu";
import { IoMdWine } from "react-icons/io";
import { FaHandsBubbles } from "react-icons/fa6";
import css from "./style.module.css"

import e1 from "../../../assets/emoji/Love.svg"
import e2 from "../../../assets/emoji/Баас.svg"
import e3 from "../../../assets/emoji/Бүүр инээх.svg"
import e4 from "../../../assets/emoji/Гайхах.svg"
import e5 from "../../../assets/emoji/Гал.svg"
import e6 from "../../../assets/emoji/Чамайг харах.svg"
import e7 from "../../../assets/emoji/Ирмэлт.svg"
import e8 from "../../../assets/emoji/Салхи.svg"
import e9 from "../../../assets/emoji/Таалагдах.svg"
import e10 from "../../../assets/emoji/Уйлах.svg"
import e11 from "../../../assets/emoji/Хараал.svg"
import e12 from "../../../assets/emoji/Чулуу.svg"

let intervalIds = [];

const emoji = [e1, e2, e3, e4, e5,e6, e7, e8, e9, e10, e11, e12]

const GameDetail = () => {
  // players position
  const positions = [
    { position: "absolute", top: 150, left: 10 },
    { position: "absolute", top: 230, left: 10 },
    { position: "absolute", top: 310, left: 10 },
    { position: "absolute", top: 390, left: 10 },
  ];

  const ctx = useContext(UserContext)
  const currentUserId = ctx?.currentUser?.authId
  // console.log(ctx?.currentUser?.name)
  const { id } = useParams();
  const {addRightAnswers,  randomPower, queryPlayer, 
    sendEmoji, isGo, isShield, isBack, addAnswer, 
    game, players, addPoint, logoutPlayer , getEndGame,
    getWaitPlayers, getShowStartGame,  getQuestionShow , getAnswerShow,
    getShowPlayer ,  getLogoutGame, getShowCoin ,  getStartTime , getQuestionTime,
    getQuestionNumber , getTurn, getDiceTime , getShowDiceTime, getShowTurn
  
  } = useGame(id);

  const [time, setQuestionTime] = useState()
  const [startTime, setStartTime] = useState()
  const [diceTime, setDiceTime] = useState()
  const [showPlayer , setShowPlayer] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0);
  const [turn, setTurn] = useState(0);
  const questions = useRef([])
  const [showLogout, setShowLogout] = useState()
  const question = questions.current[questionNumber] || {} 
  const [playerAnswer, setPlayerAnswer] = useState("")
  const [selectedPower, setSelectedPower] = useState("")
  const currentUser = players?.find((item) => item.id === currentUserId)
  const [showCoin  ,setShowCoin] = useState(false)
  const power = {[game?.go] : go , [game?.shield] : shield , [game?.back] : back}
 
  // **  powers
  useEffect(() => {
    const generateUniqueRandomNumber = (exclude = []) => {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 40);
      } while (exclude.includes(randomNumber));
      return randomNumber;
    };
    // Generate three unique random numbers
    const random1 = generateUniqueRandomNumber();
    const random2 = generateUniqueRandomNumber([random1]);
    const random3 = generateUniqueRandomNumber([random1, random2]);
    // setPower({  [random1]: go , [random2]: shield  , [random3]: back  })
    randomPower(random1, random2, random3)


  }, []);

  // асуултууд
  useEffect(() => {
    // console.log(game?.questions && !questions.current,game?.questions , !questions.current)
    // if (game?.questions   ) {
    // if (game?.questions && questions.current.length === 0  ) {
      if (game?.questions && (questions.current.length === 0 || game?.questions[questionNumber]?.answers)  ) {
        questions.current = game?.questions
      } 
  }, [game?.questions]);

  // ** logout game
  const logout = () => {
    logoutPlayer(id, currentUserId , game);
  };

//  clear
const clearIntervals = () => {
  // console.log('====Clear',intervalIds)
  // intervalIds = ref.current
  intervalIds.map(i=>clearInterval(i))
  intervalIds = [];
}

  // 1
  useEffect(() => {
    // show start game modal
    // Дараа нь асуулт харагдана
    if(game?.count === 4){
      getWaitPlayers(false)
      getShowStartGame(true)
    } 
  } , [game?.count])

  // 2
  useEffect(() => {
      if(game?.showStartGame){
      intervalIds.push(setInterval(startGameTime, 1000))
      return ()=>{
        // console.log(intervalIds);
        clearIntervals()
      }
    }
} ,[game?.showStartGame === true])

// 3 start time  
  useEffect(() => {
    if(game?.startTime){
      setStartTime(game?.startTime)
    }
    if(game?.startTime <= 0){
        getShowStartGame(false)
        getShowDiceTime(false)
        setTimeout(() =>{
          // getQuestionShow(true)
        }, 2000)
        getStartTime(0)
      }
  } ,[game?.startTime])

   // 4
   const startGameTime = () => {
    setStartTime(prev => {
      let next = prev - 1;
      getStartTime(next)
      return next;
    })
  }

  // 5
  useEffect(() => {
      if(game?.showQuestion){
        // Асуултын харагдах хугацаа
        intervalIds.push( setInterval(startQuestionTimer, 1000))
        return ()=>{
          // console.log(intervalId);
          clearIntervals()
        }
      }
}, [game?.showQuestion === true]);
// 
// 6  Асуултанд хариулах хугацаа харагдана
const startQuestionTimer = () => {
  setQuestionTime(prev =>{
    let next = prev - 1; 
    getQuestionTime(next)
    return next;
  }) 
}

// 7 Асуултанд хариулах хугацаа харагдана
useEffect(() => {
  if(game?.questionTime){
    setQuestionTime(game?.questionTime)
  }
  if(game?.questionTime <= 0) {
    
    addQuestionnumber()
    addRightAnswers([])
    getQuestionShow(false)
    filterRightAnswers()
    getAnswerShow(true)
    setTimeout(() => {
      getAnswerShow(false)
      setPlayerAnswer("")
    }, 3000)
    getQuestionTime(10)
  } 
} ,[game?.questionTime])

// Асуултын хариултыг хадгалах
const saveAnswer = (answer) => {  
  setPlayerAnswer(answer)
  setTimeout(() => {
    addAnswer(answer, currentUserId, questionNumber , ctx?.currentUser?.name);
  }, 500)
};

//6  Зөв хариултыг шүүж авах
const filterRightAnswers = () => {
  const question = questions.current[questionNumber]
    if(question){
    const correctAnswer = question?.answerKey
    const allAnswer = question?.answers
    let playersCorrectAnswers = allAnswer?.filter(el => el.answer === correctAnswer)
    // let answerData = allAnswer?.find(el => el.authId === currentUserId)
    let rightAnswers = playersCorrectAnswers?.sort((a , b) => a.time.localeCompare(b.time))
  
    if(rightAnswers === undefined){
      // Зөв хариулт байхгүй бол дараагийн асуултыг харуулах
      addRightAnswers([])
      // getNotAnswers()
    } else {
      // Зөв хариултыг game?.answeredPlayers рүү хийх
      addRightAnswers(rightAnswers)
      getShowDiceTime(false)
      getDiceTime(5)
      setTimeout(() => {
        getShowDiceTime(true) 
      }, 4000)
    }
  }
}


//7  Зөв хариулт байхгүй бол дараагийн асуултыг харуулах
const getNotAnswers = () => {
  // console.log(game?.answeredPlayers?.length <= 1)
    if(game?.answeredPlayers?.length === 0 ){
      setTimeout(() => {
        getQuestionShow(true)
      }, 5000)  
  } 
}

useEffect(() => {
  if(game?.diceTime){
    setDiceTime(game?.diceTime)
  }
  if(game?.diceTime <= 0) {
    setDiceTime(0)
    setTimeout(() => {
      getShowDiceTime(false)
    } , 2000)
  } 
} ,[game?.diceTime])

// 8 зөв хариулттай үед 
useEffect(() => {
      if(game?.showDiceTime){
        intervalIds.push( setInterval(startDiceTime, 1000))
        return ()=>{
          clearIntervals()
        }
      }
}, [game?.showDiceTime === true]);

// 9 зөв хариулттай үед 5s харагдана . 
// 5s дотор Шоо дараагүй бол автоматаар дараагын ээлж рүү шилжинэ.
const startDiceTime = () => {
  setDiceTime(prev =>{
    let next = prev - 1; 
    getDiceTime(next)
    return next;
  }) 
}


useEffect(() => {
  if(game?.turn){
    setTurn(game?.turn)
  }
  if(game?.answeredPlayers?.length === 1){
    setTimeout(() => {
      getShowDiceTime(false)
      getTurn(0)
      getQuestionShow(true)
    }, 2000)
  }

  // if(game?.turn >= game?.answeredPlayers?.length - 1 ){   
  if(game?.turn > game?.answeredPlayers?.length-1 ){
      setTimeout(() => {
        getShowDiceTime(false)
      },2000) 
      setTimeout(() => {
        getTurn(0)
        getQuestionShow(true)
      },3000)  
  } 
  
} ,[game?.turn])


// Тоглогчын ээлжийг 1000ms дараа автоматаар солих
 const autoTurn = () => {
  // console.log("bnu")
    setTurn((prev) => {
      let next = prev + 1;
      getTurn(next)
      return next;
    });
    setTimeout(() => {
      getShowDiceTime(true)
    }, 2000)
};

//10 Шоо хаях
const onDiceChange = async (val) => {
  const pointCount = currentUser?.pointCount
  const horsePoint = currentUser?.point
  const updateHorsePoint = horsePoint + val
  const clickPlayerId = game?.answeredPlayers[game?.turn]
// console.log(clickPlayerId.authId)
  if(val === 5 && pointCount < 2  ) {  
    addPoint(clickPlayerId,  false, game?.go, game?.shield, game?.back, updateHorsePoint, id, val)
    setTimeout(() => {
      getShowDiceTime(false)
      getDiceTime(5)
    } , 2000)

    setTimeout(() => {
      getShowDiceTime(true)
    } , 3000)
   
  } else {
    addPoint(clickPlayerId,  false, game?.go, game?.shield, game?.back, updateHorsePoint, id, val, true)
    
    setTimeout(() => {
      autoTurn()
      getShowDiceTime(false)
      getDiceTime(5)
    }, 2000)
   
    
  }
};


useEffect(() => {
  if(game?.questionNumber){
    setQuestionNumber(game?.questionNumber)
  }
  if(questions.current.length-1 < game?.questionNumber){
    getQuestionNumber(0)
    getQuestionShow(false)
    // gameEnd()
  }
},[game?.questionNumber])

// Асуултыг нэг нэгээр нэмэгдүүлж байна
const addQuestionnumber = () => {
  setQuestionNumber((prev) => {
    let next= prev + 1
    getQuestionNumber (next)
    return next;
  });
};

const gameEnd = () => {
  getAnswerShow(false)
  getQuestionShow(false)
  clearIntervals()
  getEndGame(true)
}


const playerData = ctx?.userList.find(
  item => item.id === showPlayer.playerID
)

const chooseHorse = (e) => {
  // console.log(e)
  if(selectedPower === "back" && currentUserId === game?.answeredPlayers[game?.turn]?.authId) {
    // if(selectedPower === "back" && currentUserId === game?.answeredPlayers[turn]?.authId) {
    isBack(true, e , currentUserId , selectedPower , currentUser)
    setSelectedPower("")
  } 
}

const getPower = (power, diceNumber) => {
  // console.log(diceNumber , power)
  if(power === "back") {
    setSelectedPower(selectedPower === power ? '' : power)
    
  } 
  else if (power === "shield") {
    setSelectedPower( power)
   
    isShield(true, currentUser , currentUserId , ()=>{
      setTimeout(() => {
        setSelectedPower('')   
      }, 400);
     
    })
  } 
  else if (power === "go") {
   setSelectedPower( power)
  
    isGo(true, currentUser , selectedPower, currentUserId , diceNumber ,  () => {
      setTimeout(() => {
        setSelectedPower('')   
      }, 400);
    })
  } else {
    console.log("no power")
  }
}

const data = {
  coin: 100,
  label: "send emoji",
  labelType: "emoji",
  type: "withdraw"
}

const getEmoji = (e) => {
  if(ctx?.currentUser?.coins >= 100 ) {
    sendEmoji(data, e , currentUser , currentUserId , showPlayer.playerID , ctx?.currentUser?.coins)
    setShowPlayer({showPlayer: false, playerID: null})
  } else {
    setShowPlayer({showPlayer: false, playerID: null})
    setShowCoin(true)
    // alert("coin hvrehgvi bn")
  }
}


  return (
    <div className="bg-[#6e8426] flex justify-center items-center w-screen h-screen">
      <div className="flex m-auto relative w-[400px] h-[700px] bg-[#97B62E]">

          {/* logout game */}
          <div className="h-[30px] left-0 top-14 px-6 z-10 absolute flex items-center justify-between w-full">
            <IoIosArrowBack
              // onClick={() => getLogoutGame(true)}
              onClick={() => setShowLogout(true)}
              size={30}
              className="text-white md:w-[30px] md:h-[30px] mx-1 lg:mx-5 hover:text-blue-500 transform duration-500 ease-in-out hover:scale-125"
            />
          </div>

          {/* wait other players */}
          <Modal show={game?.waitPlayers}>
            <div>WAIT OTHER PLAYERS</div>
          </Modal>

          {/* start game */}
          {game?.waitPlayers ? (
            null
          ) : (
          <Modal show={game?.showStartGame}>
            <div className="flex flex-col items-center text-xl">
              <p className="my-2">THE GAME BEGINS </p>
              <p className="my-2 text-red-500">Are you ready !!</p>
              <p className="rounded-[50%] my-2 text-white text-3xl font-bold bg-baseBlue1 w-[70px] h-[70px] flex justify-center items-center"> 
              {/* {startTime} */}
              {game?.startTime}
              </p>
            </div>
          </Modal>
          )}
         

            {/* not enough coin */}
          <Modal show={showCoin} closeConfirm={() => setShowCoin(false)}>
            <div className="text-black">Not enough coins</div>
          </Modal>

          {/* logout modal */}
          <Modal 
            // show={game?.logoutGame} 
            show={showLogout}
          >
            <div>
              <p className="text-center">Are you sure about exiting the game ?</p>
              <div className="flex justify-around mt-4 text-white font-semibold">
                <button className="bg-green-500 rounded-2xl p-2 w-16" onClick={() =>setShowLogout(false)}>NO</button>
                <button className="bg-red-500 rounded-2xl p-2 " onClick={logout}>Yes , logout game</button>
              </div>
            </div>
          </Modal>

          {/* Тоглогчдыг харуулж байна */}
          {players?.map((e, i) => {
            return (
              <>
                <div
                  id={e}
                  style={{ ...positions[i] }}
                  className="flex z-10 items-center "
                  key={i}
                >
                  {/* <p>order </p> */}
                  <div 
                    onClick={() => setShowPlayer({ showPlayer: true, playerID:e.state.authId})}
                    className={`relative flex flex-col`}
                  >
                   
                    {e?.sendEmoji ? (
                      <div className={`relative `}>
                        <img src={e?.state?.photo} 
                        className={`border-[8px] p-0  w-[60px] h-[60px] rounded-[50%] `} 
                        style={{borderColor: `${e.color}`  }}
                        />
                        <img 
                          src={e?.sendEmoji} 
                          className="absolute top-0 -right-4 w-[40px] h-[40px] rounded-[50%] " />
                       </div>
                    ) : e?.logoutGame ? (
                      <img src={go} style={{borderColor:`${e.color}`}} className={`border-[8px] p-0  w-[60px] h-[60px] rounded-[50%]`}/>
                    ) : 
                     ( game?.showDiceTime && game?.answeredPlayers[turn]?.authId === e?.state?.authId)
                       ? (
                      <div 
                        className={`${css.loader} border-[8px] p-0  w-[60px] h-[60px] rounded-[50%]`} 
                      ></div>
                    ): e?.endGamePlayer ? (
                      <div  className={` border-[8px] p-0 w-[60px] h-[60px] rounded-[50%] bg-green-700 text-white flex justify-center items-center uppercase`}>done</div>
                    ) : (
                      <img src={e?.state?.photo} 
                      style={{borderColor: `${e.color}` }}
                      className={` border-[8px] p-0 w-[60px] h-[60px] rounded-[50%]`}
                    
                    />
                    )}
                    <p className={`text-[14px] absolute -bottom-4 left-3 text-${e?.color}`}>{e?.state?.name}</p>
                  </div>

                   { (game?.answeredPlayers[game?.turn]?.authId === e?.state?.authId && game?.showDiceTime) && (
                      <Dice id={i} 
                          onDiceChange={onDiceChange} 
                          answeredPlayers={game?.answeredPlayers[game?.turn]}
                          diceTime = {game?.diceTime}
                      />
                    )
                    }    
                 
                </div>
              </>
            );
          })}
         
          
          {/* show player information*/}
          <Modal show={showPlayer.showPlayer} closeConfirm={() => setShowPlayer({showPlayer: false, playerID: null})}>
            {showPlayer?.playerID === currentUserId ? (
            <div className="text-baseColor ">
                 <div className="flex justify-between">
                   <p className="bg-red-500 rounded-xl p-1 w-[40px] text-white text-sm">lv.</p>
                   <p className="text-baseColor font-bold">{playerData?.name}</p>
                   <div className="flex items-center w-[60px] justify-between">
                     <RiCopperCoinFill size={25} className="text-yellow-500"/>
                     <p className="text-orange-600">{playerData?.coins}</p>
                   </div>
                 </div>
                 <div className="flex bg-hpink justify-around mt-3 w-full rounded-2xl h-[50px]">
                  <div className="flex flex-col items-center h-full">
                    <p>Match</p>
                    <p className="font-bold">{playerData?.matchGame}</p>
                  </div>
                  <div className="flex flex-col items-center h-full ">
                    <p>Win</p>
                    <p className="font-bold">{playerData?.winGame}</p>
                  </div>
                </div>
            </div>
            ) : (
              <div className="text-baseColor ">
                <div className="flex justify-between">
                  <p className="bg-red-500 rounded-xl p-1 w-[40px] text-white text-sm">lv.</p>
                  <p className="text-baseColor font-bold">{playerData?.name}</p>
                  <div className="flex items-center w-[60px] justify-between">
                    <RiCopperCoinFill size={25} className="text-yellow-500"/>
                    <p className="text-orange-600">{playerData?.coins}</p>
                  </div>
                </div>
                <div className="flex bg-hpink justify-around mt-3 w-full rounded-2xl h-[50px]">
                  <div className="flex flex-col items-center h-full">
                    <p>Match</p>
                    <p className="font-bold">{playerData?.matchGame}</p>
                  </div>
                  <div className="flex flex-col items-center h-full ">
                    <p>Win</p>
                    <p className="font-bold">{playerData?.winGame}</p>
                  </div>
                </div>
                <div className="">
                  <div className="flex mt-2 items-center justify-between">
                    <p className="font-bold ">Send emojij</p>
                    <p className="text-sm">100 coins per Emoji</p>
                  </div>
                  <div className="grid grid-cols-4 w-full h-[300px] place-items-center">
                    {emoji.map((e, i) => {
                      return (
                        <div onClick={() => getEmoji(e)} key={i} className="w-[50px] h-[50px]">
                          <img src={e}  className="h-full w-full" />
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            )}
          </Modal>   
        
          {/* game end  */}
          <Modal show={game?.endGame}>
            <div className="">
              
              <div className="flex justify-center relative m-2">
                <p className="text-center ">WIN</p>
                <MdOutlineCancel onClick={() => getEndGame(false)} size={25} className="absolute top-0 right-0"/>
              </div>
             
              {queryPlayer?.map((e, i) => {
                // console.log(e.logoutGame)
                return (
                <div 
                  key={i}
                >
                    { e?.endGamePlayer ? (
                        <div className="">
                          {i === 0 ? (
                            <div className="border border-baseColor m-1 rounded-2xl flex justify-between py-1 items-center">
                              <LuCrown className="text-yellow-500 ml-2" size={30}/>
                              <div className="flex flex-col w-[80px] justify-center items-center">
                                <img src={e?.state?.photo}/>
                                <p>{e?.state?.name}</p>
                              </div>
                              
                              <div className="flex justify-between items-center w-[100px] mx-2">
                                <RiCopperCoinFill size={30} className="text-yellow-500"/>
                                <p className="text-2xl text-orange-500 font-semibold">+{game?.winCoin}</p>
                              </div>
                                
                            </div>
                          ) : i === 1 ? (
                            <div className="border border-baseColor m-1 rounded-2xl flex justify-between py-1 items-center">
                              <IoMdWine className="text-blue-500 ml-2" size={30}/>
                              <div className="flex flex-col w-[80px] justify-center items-center">
                                <img src={e?.state?.photo}/>
                                <p>{e?.state?.name}</p>
                              </div>
                              
                              <div className="flex justify-between items-center w-[100px] mx-2">
                                <RiCopperCoinFill size={30} className="text-yellow-500"/>
                                <p className="text-2xl text-orange-500 font-semibold">+{game?.secondCoin}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="border border-baseColor m-1 rounded-2xl flex justify-between py-1 items-center">
                              <FaHandsBubbles className="text-green-700 ml-2" size={20}/>
                              <div className="flex flex-col w-[80px] justify-center items-center">
                                <img src={e?.state?.photo}/>
                                <p>{e?.state?.name}</p>
                              </div>
                              
                              <div className="flex justify-between items-center w-[100px] mx-2">
                                <RiCopperCoinFill size={30} className="text-yellow-500"/>
                                <p className="text-2xl text-orange-500 font-semibold">+{e?.secondCoin}</p>
                              </div>
                            </div>
                          ) 
                          }
                        </div>
                      ) : e?.logoutGame ? (
                        <div className="border border-baseColor m-1 rounded-2xl flex justify-between py-1 items-center">
                          {/* <FaHandsBubbles className="text-green-700 ml-2" size={20}/> */}
                          {/* <div className="flex flex-col w-[80px] justify-center items-center">
                            <img src={e?.state?.photo}/>
                            <p>{e?.state?.name}</p>
                          </div>  */}
                          <p className="flex justify-center items-center w-[100px] mx-2">Leaving</p>
                        </div>
                      ) : (
                        <div className="border border-baseColor m-1 rounded-2xl flex justify-between py-1 items-center">
                          <FaHandsBubbles className="text-green-700 ml-2" size={20}/>
                            <div className="flex flex-col w-[80px] justify-center items-center">
                              <img src={e?.state?.photo}/>
                              <p>{e?.state?.name}</p>
                            </div> 
                              <p className="flex justify-center items-center w-[100px] mx-2">Playing</p>
                          
                        </div>
                      )
                    }
                </div>
                )
              })}
              
            </div>
          </Modal>

          {/* Асуултыг харуулж байна */}
          <Modal show={game?.showQuestion}>
            <div 
            className="flex flex-col h-full w-full"
            // style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="text-white m-auto flex flex-col justify-center items-center w-[70px] h-[70px] bg-baseBlue1 rounded-[50%]">
                <p className="text-sm">time </p>
                {/* <p className="text-[22px] font-bold">{time}</p> */}
                <p className="text-[22px] font-bold">{game?.questionTime}</p>
              </div>
              <div className="flex my-2 w-full border border-baseBlue1 rounded-[10px] h-full p-2">
                <p>{question?.questionText} </p>
              </div>

              <div className="flex flex-col my-2">
                {question?.options?.map((choice, i) => {
                  return (
                  // !answerShow &&    
                  <button
                      key={i}
                      onClick={() => saveAnswer(choice.optionText)}
                      className ={`${playerAnswer ? "hidden" : "mx-3 border border-baseBlue1 my-1 p-2 rounded-2xl"} hover:bg-orange-400`}
                    >
                    
                    <p > {choice.optionText}</p>
                  </button>
                  );
                })}
              </div>
            </div>
          </Modal>

          {/* Харилутыг харуулж байна */}
          <Modal show={game?.showAnswer}>
            <div className="flex flex-col justify-center">
              <p className="text-center">Answer</p>
              <p className="text-center my-2 w-full  border border-baseBlue1 rounded-[10px] h-full p-2">
                 correct answer : {question?.answerKey}
              </p>
              <p className="text-center my-2 w-full  border border-baseBlue1 rounded-[10px] h-full p-2">
                your answer :  {playerAnswer}
              </p>

              <p className="">Total right answer <span className="mx-2 font-bold text-lg">{game?.answeredPlayers?.length}</span></p>
              <p>Dice roll order</p>
              {game?.answeredPlayers?.map((e, i) => {
                // console.log(i)
                return (
                  <div>{i+1}. <span className="mx-1">{e?.name}</span> </div>
                )
              })}
            </div>
          </Modal>

        <div className="absolute w-full h-full">
          <Field   power={power} chooseHorse={chooseHorse} selectedPower={selectedPower} currentUserId={currentUserId} currentUser={currentUser}/> 
        </div>

        {/* coin */}
        <div className="bg-white p-1 absolute bottom-[120px] right-8 flex justify-around items-center rounded-[23px]">
          <p className="mx-2"> {ctx?.currentUser?.name}</p>
          
          <RiCopperCoinFill size={18} className="text-yellow-400"/>
          <p className="text-baseColor font-bold mx-1">{ctx?.currentUser?.coins}</p>
        </div>

        <div className="absolute z-10 w-full h-[68px] bottom-[40px]">
          <Footer currentUser={currentUser} 
          answerPlayerId={game?.answeredPlayers ? (game?.answeredPlayers[game?.turn]?.authId) : (null)}
          // answerPlayerId={game?.answeredPlayers ? (game?.answeredPlayers[turn]?.authId) : (null)}
          currentUserId={currentUserId} getPower={getPower} selectedPower={selectedPower} />
        </div> 
      </div>  
    </div>
  );
};

export default GameDetail;

