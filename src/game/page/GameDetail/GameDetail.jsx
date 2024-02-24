import React, { useState,  useEffect , useRef, useContext } from "react";
import Dice from "../../components/Dice";
import Field from "../../components/Field";
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
const TIME = 10
const STARTTIME = 5
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
  const { id } = useParams();
  const {randomPower, queryPlayer, sendEmoji, isGo, isShield, isBack, addAnswer, game, players, addPoint, logoutPlayer ,isGameEnded, showGameEnd} = useGame(id);
  const [loader, setLoader] = useState(false);
  const [time, setTime] = useState(TIME)
  const [startTime, setStartTime] = useState(STARTTIME)
  const [questionShow, setQuestionShow] = useState(false); 
  const [showStartGame , setShowStartGame] = useState(true)
  const [answerShow, setAnswerShow] = useState(false)
  const [waitPlayers , setWaitPlayers] = useState(true)
  const [showPlayer , setShowPlayer] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0);
  const [turn, setTurn] = useState(0);
  const [answeredPlayers, setAnsweredPlayers] = useState([])
  const questions = useRef([])
  const question = questions.current[questionNumber] || {} 
console.log(showStartGame)
  const [playerAnswer, setPlayerAnswer] = useState("")
  const [logoutGame , setLogoutGame] = useState(false)
  const [selectedPower, setSelectedPower] = useState("")
  const currentUser = players?.find((item) => item.id === currentUserId)
  const [showCoin  ,setShowCoin] = useState(false)
  const power = {[game?.go] : go , [game?.shield] : shield , [game?.back] : back}
  // console.log(players.length === 2)
  // create random number of powers
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
 
  // logout game
  const logout = () => {
    logoutPlayer(id, currentUserId , game);
  };


  useEffect(() => {
    //show start game modal
    // Дараа нь асуулт харагдана

    if(players.length === 4){
      setWaitPlayers(false)
      // setShowStartGame(true)
      intervalIds.push( setInterval(startGameTime, 500))
      
      // intervalIds.push( setInterval(startTimer, 1000))
      return ()=>{
        // console.log(intervalId);
        clearIntervals()
      }
    } 
  })

  // Тоглогчын ээлжийг 1000ms дараа автоматаар солих
  const autoTurn = () => {
    setTimeout(() => {
      setTurn((prev) => {
        let next = prev + 1;
        // console.log(next > answeredPlayers.length, next , answeredPlayers.length);
        if (next == answeredPlayers.length )
        {      
          //Бүх тоглогчид шоо хаяж, морь нүүсний дараа, дараагийн асуултыг харуулах
          // console.log(next)
          next = 0;    
          getQuestionShow()   
          addQuestionnumber()
          clearIntervals()
          intervalIds.push( setInterval(startTimer, 1000))
        }   
        return next;
      });
  }, 1000)};

  const startGameTime = () => {
    // setShowStartGame(false)
    setTimeout(() => {
      clearIntervals()
      intervalIds.push( setInterval(startTimer, 1000))
    }, 500)

    setStartTime(prev => {
      let next = prev - 1;
      if(next <=0){
        next = 5
        setShowStartGame(false)
        getQuestionShow()
      }
      return next;
    })
  }
  
  // clear
  const clearIntervals = () => {
    // console.log('====Clear',intervalIds)
    // intervalIds = ref.current
    intervalIds.map(i=>clearInterval(i))
    intervalIds = [];
  }

  // Асуултанд хариулах хугацаа харагдана
const startTimer = () => {
  setTime(prev =>{
    let next = prev - 1; 
    // console.log('=========='+next , next <= 0);
    if(next <= 0) {
      clearIntervals()
      questionClose()
      playerCheck()
      ansShow()
      setTimeout(() => {
        answerClose()
      }, 1000)
      next = 10
    }
    return next;
  }) 
}

  // асуултууд
  useEffect(() => {
    // console.log(game?.questions && !questions.current,game?.questions , !questions.current)
    if (game?.questions && questions.current.length === 0  ) {
    questions.current = game?.questions

    }
  }, [game?.questions]);


 

// Нийт хариулсан тоглогчдын хариултыг зөв болон хугацаагаар шүүгээд setAnsweredPlayers хийсэн
// AnsweredPlayers дээр Шоо харагдана
const playerCheck = () => {
  const question = questions.current[questionNumber]
  
  if(question){
    const oneCorrectAnswer = question?.answerKey
    const allAnswer = question?.answers
    let correctAnswers=  allAnswer?.filter(el => el.answer === oneCorrectAnswer)

    // let answerData = allAnswer?.find(el => el.authId === currentUserId)
    let sort = correctAnswers?.sort((a , b) => a.time.localeCompare(b.time))
    sort && setAnsweredPlayers(sort)

    // Зөв хариулт байхгүй бол дараагийн асуултыг харуулах
    // if (sort?.length === 0 ) {
      if (sort?.length === 0 || "undefined" ) {
      setTimeout(() => {
        getQuestionShow()   
        addQuestionnumber()

      }, 1000)

       // clearIntervals()
      intervalIds.push( setInterval(startTimer, 1000))
      onDiceChange()
      autoTurn()
      sort && setAnsweredPlayers(sort)
    }
}}

// Шоо хаях
const onDiceChange =async (val) => {
  const pointCount = currentUser.pointCount
  const horsePoint = currentUser.point
  const updateHorsePoint = horsePoint + val
 
  if(val === 2 && pointCount < 2  ) {  
    addPoint(false, game?.go, game?.shield, game?.back, updateHorsePoint, id, val)
  } else {
    addPoint(false, game?.go, game?.shield, game?.back, updateHorsePoint, id, val, true);
    // addPoint(false, ran1, ran2, ran3, updateHorsePoint, id, val, true);
    autoTurn();
  }
};




// Асуултын хариултыг хадгалах
const saveAnswer = (answer) => {
  addAnswer(answer, currentUserId, questionNumber);
  setPlayerAnswer(answer)
};


// Асуултыг нэг нэгээр нэмэгдүүлж байна
const addQuestionnumber = () => {
  setQuestionNumber((prev) => {
    let next= prev + 1
   
    if(questions.current.length-1 < next){
      // next=0;
      gameEnd()
    }
    return next;
  });
};

const gameEnd = () => {
  //  console.log(win)
  answerClose()
  questionClose()
  clearIntervals()
  // showGameEnd()
}

// Асуулт харуулах Modal
const getQuestionShow = () => {
  setQuestionShow(true);
};
const questionClose = () => {
  setQuestionShow(false); 
};
// Хариулт харуулах Modal
const ansShow = () => {
  setAnswerShow(true); 
};
const answerClose = () => {
  setAnswerShow(false); 
};

const playerData = ctx?.userList.find(
  item => item.id === showPlayer.playerID
)

const chooseHorse = (e) => {
  // console.log(e)
  if(selectedPower === "back" && currentUserId === answeredPlayers[turn]?.authId) {
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
  
    isGo(true, currentUser , selectedPower, currentUserId , diceNumber , () => {
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
        {loader && (
          <div className="absolute bg-baseColor">
            <Spinner />
            <div className="text-sm w-full text-center">
              Waiting for other players... 30sec
            </div>
          </div>
        )}

          {/* logout game */}
          <div className="h-[30px] left-0 top-14 px-6 z-10 absolute flex items-center justify-between w-full">
            <IoIosArrowBack
              onClick={() => setLogoutGame(true)}
              size={30}
              className="text-white md:w-[30px] md:h-[30px] mx-1 lg:mx-5 hover:text-blue-500 transform duration-500 ease-in-out hover:scale-125"
            />
          </div>
          {/* wait other players */}
          <Modal show={waitPlayers}>
            <div>WAIT OTHER PLAYERS</div>
          </Modal>

          {/* start game */}
          {waitPlayers ? (
            null
          ) : (
            <Modal show={showStartGame}>
            <div className="flex flex-col items-center text-xl">
              <p className="my-2">THE GAME BEGINS </p>
              <p className="my-2 text-red-500">Are you ready !!</p>
              <p className="rounded-[50%] my-2 text-white text-3xl font-bold bg-baseBlue1 w-[70px] h-[70px] flex justify-center items-center"> {startTime}</p>
            </div>
          </Modal>
          )}
         

            {/* not enough coin */}
          <Modal show={showCoin} closeConfirm={() => setShowCoin(false)}>
            <div className="text-black">Not enough coins</div>
          </Modal>

          {/* logout modal */}
          <Modal show={logoutGame}>
            <div>
              <p className="text-center">Are you sure about exiting the game ?</p>
              <div className="flex justify-around mt-4 text-white font-semibold">
                <button className="bg-green-500 rounded-2xl p-2 w-16" onClick={() => setLogoutGame(false)}>NO</button>
                <button className="bg-red-500 rounded-2xl p-2 " onClick={logout}>Yes , logout game</button>
              </div>
            </div>
          </Modal>

          {/* Тоглогчдыг харуулж байна */}
          {players?.map((e, i) => {
            // console.log(e.color)
            return (
              <>
                <div
                  id={e}
                  style={{ ...positions[i] }}
                  className="flex z-10 items-center"
                  key={i}
                >
                  {/* <p>order </p> */}
                  <div 
                    onClick={() => setShowPlayer({ showPlayer: true, playerID:e.state.authId})}
                    className={`relative  flex flex-col justify-center items-center`}
                  >
                   
                    {e?.sendEmoji ? (
                      <div className={`relative `}>
                        <img src={e?.state?.photo} 
                        className={`border-[8px] p-0  w-[60px] h-[60px] rounded-[50%]`} 
                        style={{borderColor: `${e.color}`  }}
                        />
                        <img 
                          src={e?.sendEmoji} 
                          className="absolute top-0 -right-4 w-[40px] h-[40px] rounded-[50%] " />
                       </div>
                    ) : e?.logoutGame ? (
                      <img src={go} style={{borderColor:`${e.color}`}} className={`border-[8px] p-0  w-[60px] h-[60px] rounded-[50%]`}/>
                    ) : (
                      <img src={e?.state?.photo} 
                      style={{borderColor: `${e.color}` }}
                      className={` border-[8px] p-0 w-[60px] h-[60px] rounded-[50%]`}
                      // className={`${true && css.loader} border-[8px] p-0 border-${e?.color}-500  w-[60px] h-[60px] rounded-[50%]`}
                    />
                    )}
                   
                   
                    
                  
                    <p className={`text-[14px] text-${e?.color}`}>{e?.state?.name}</p>
                  </div>

                  {answeredPlayers[turn]?.authId === e?.state?.authId && <Dice id={i} onDiceChange={onDiceChange} />}
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
          <Modal show={isGameEnded}>
            <div className="">
              
              <div className="flex justify-center relative m-2">
                <p className="text-center ">WIN</p>
                <MdOutlineCancel onClick={() => showGameEnd(false)} size={25} className="absolute top-0 right-0"/>
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
          {/* <Modal show={questionShow}>
            <div 
            className="flex flex-col h-full w-full"
            // style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="text-white m-auto flex flex-col justify-center items-center w-[70px] h-[70px] bg-baseBlue1 rounded-[50%]">
                <p className="text-sm">time </p>
                <p className="text-[22px] font-bold">{time}</p>
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
          </Modal> */}

          {/* Харилутыг харуулж байна */}
          {/* <Modal show={answerShow}>
            <div className="flex flex-col justify-center">
              <p className="text-center">Correct answer</p>
              <p className="text-center my-2 w-full  border border-baseBlue1 rounded-[10px] h-full p-2">
                 {question?.answerKey}</p>
            </div>
          </Modal> */}

        <div className="absolute w-full h-full">
          <Field   power={power} chooseHorse={chooseHorse} selectedPower={selectedPower} currentUserId={currentUserId} currentUser={currentUser}/> 
        </div>
        {/* coin */}
        <div className="bg-white absolute bottom-[120px] right-8 flex justify-around items-center w-[100px] h-[30px] rounded-[23px]">
              <RiCopperCoinFill size={18} className="text-yellow-400"/>
              <p className="text-baseColor font-bold">{ctx?.currentUser?.coins}</p>
        </div>
        <div className="absolute z-10 w-full h-[68px] bottom-[40px]">
          <Footer currentUser={currentUser} answerPlayerId={answeredPlayers[turn]?.authId} currentUserId={currentUserId} getPower={getPower} selectedPower={selectedPower} />
        </div> 
      </div>  
    </div>
  );
};

export default GameDetail;

// useEffect(() => {
//   console.log(game?.questions && !questions.current,game?.questions , !questions.current)
//   if (game?.questions && questions.current.length === 0  ) {
//   const shuffledQ =  shuffleArray(game?.questions);
//   questions.current = shuffledQ
  

//   }
// }, [game?.questions]);

   // Асуултуудыг нийлүүлээд байрыг нь солих
  //  function shuffleArray(questionsToShuffle) {
  //   for (let i = questionsToShuffle.length - 1; i > 0; i--) {
  //     let randomPosition = Math.floor(Math.random() * (i + 1));
  //     let temp = questionsToShuffle[i];
  //     questionsToShuffle[i] = questionsToShuffle[randomPosition];
  //     questionsToShuffle[randomPosition] = temp;
  //   }
  //   return questionsToShuffle;
  // }

