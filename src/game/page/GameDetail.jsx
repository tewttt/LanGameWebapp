import React, { useState,  useEffect , useRef, useContext } from "react";
import Dice from "../components/Dice";
import zur from "../../assets/img/1.jpg"
import Field from "../components/Field";
import Modal from "../../components/General/Modal";
import Spinner from "../../components/General/Spinner";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import useGame from "../../hook/useGame";
import UserContext from "../../context/UserContext";
import { MdOutlineLogout } from "react-icons/md";
import shield from "../../assets/game/Shield 1.png"
import go from "../../assets/game/Go 1.png"
import back from "../../assets/game/Back 1.png"
import Footer from "../components/Footer";
import { RiCopperCoinFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";

const auth = getAuth();
let intervalIds = [];
const TIME = 10
// TO DO
// waiting for other players Modal haruulah , spinner
// end game Model dr toglogchdiin niit heden asuultand zow hariulsaniig haruulah
// 1, 2 bairnii toglogchdod coin nemeh
// sound oruulah 
// power heregleh ved power iin toog bagasgah 
// power other player d ...
// win coin nemeh
// shoo shidhees omno power hereglene
// shield awbal back noloolohgvi, shield bgaa eshiig shalgana
// ooriigoo uragshluulna
//random update
// 
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
  const { addAnswer, game, players, addPoint,deletePlayer ,isGameEnded, showGameEnd} = useGame(id);
  const [loader, setLoader] = useState(false);
  const [time, setTime] = useState(TIME)
  const [questionShow, setQuestionShow] = useState(true); 
  const [answerShow, setAnswerShow] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0);
  const [turn, setTurn] = useState(0);
  const [answeredPlayers, setAnsweredPlayers] = useState([])
  const questions = useRef([])
  const question = questions.current[questionNumber] || {} 
// console.log(questions)
  const [playerAnswer, setPlayerAnswer] = useState("")
  const [playerAnswerData, setPlayerAnswerData] = useState("")
  const [power, setPower] = useState({})
  const [ran1 , setRan1] = useState("")
  const [ran2 , setRan2] = useState("")
  const [ran3 , setRan3] = useState("")
  const currentUser = players?.find((item) => item.id === currentUserId)
  // console.log(players)

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
    setPower({  [random1]: go , [random2]: shield  , [random3]: back  })
    setRan1(random1-1);
    setRan2(random2-1 );
    setRan3(random3-1);
  }, []);
 
  // logout game
  const logout = () => {
    deletePlayer(id, currentUserId);
  };

  useEffect(() => {
    // Асуултын харагдах хугацаа
    intervalIds.push( setInterval(startTimer, 1000))
     return ()=>{
      // console.log(intervalId);
      clearIntervals()
    }
  }, []);
  
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
    const shuffledQ =  shuffleArray(game?.questions);
    // console.log(shuffledQ)
    questions.current = shuffledQ
    
    // console.log(questions.current)
    }
  }, [game?.questions]);
// }, [game.questions]);

  // Асуултуудыг нийлүүлээд байрыг нь солих
  function shuffleArray(questionsToShuffle) {
    for (let i = questionsToShuffle.length - 1; i > 0; i--) {
      let randomPosition = Math.floor(Math.random() * (i + 1));
      let temp = questionsToShuffle[i];
      questionsToShuffle[i] = questionsToShuffle[randomPosition];
      questionsToShuffle[randomPosition] = temp;
    }
    return questionsToShuffle;
  }

// Нийт хариулсан тоглогчдын хариултыг зөв болон хугацаагаар шүүгээд setAnsweredPlayers хийсэн
// AnsweredPlayers дээр Шоо харагдана
const playerCheck = () => {
  const question = questions.current[questionNumber]
  
  if(question){
    const oneCorrectAnswer = question?.answerKey
    const allAnswer = question?.answers
    let correctAnswers=  allAnswer?.filter(el => el.answer === oneCorrectAnswer)

    let answerData = allAnswer?.find(el => el.authId === currentUserId)
    setPlayerAnswerData(answerData)

    let sort = correctAnswers?.sort((a , b) => a.time.localeCompare(b.time))
    sort && setAnsweredPlayers(sort)

    // Зөв хариулт байхгүй бол дараагийн асуултыг харуулах
    if (sort?.length === 0 ) {
      // if (sort?.length === 0 || "undefined" ) {
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
    addPoint(ran1, ran2, ran3, updateHorsePoint, id, val)
  } else {
    addPoint(ran1, ran2, ran3, updateHorsePoint, id, val, true);
    autoTurn();
  }
};

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
  clearIntervals()
  answerClose()
  questionClose()
  showGameEnd()
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
const answer = question?.answers?.find(item => item.authId === currentUserId)
  // console.log(answer?.authId)
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

          {/* Back button */}
          <div className="h-[30px] left-0 top-14 px-6 z-10 absolute flex items-center justify-between w-full">
            <IoIosArrowBack
              onClick={logout}
              size={30}
              className="text-white md:w-[30px] md:h-[30px] mx-1 lg:mx-5 hover:text-blue-500 transform duration-500 ease-in-out hover:scale-125"
            />
          </div>

          {/* coin */}
          <div className="bg-white absolute bottom-[120px] right-8 flex justify-around items-center w-[100px] h-[30px] rounded-[23px]">
              <RiCopperCoinFill size={18} className="text-yellow-400"/>
              <p className="text-baseColor font-bold">{ctx?.currentUser?.coins}</p>
          </div>

          {/* Тоглогчдыг харуулж байна */}
          {players?.map((e, i) => {
            return (
              <>
                <div
                  id={e}
                  style={{ ...positions[i] }}
                  className="flex z-10 items-center"
                  key={i}
                >
                  {/* <p>order </p> */}
                  <div className="relative flex flex-col justify-center items-center">
                    {/* <p className="text-[10px] absolute">Level</p> */}
                    <img src={zur} className="w-[60px] h-[60px] rounded-[50%] " />
                    <p className="text-[10px]">{e.state.name}</p>
                  </div>

                  {answeredPlayers[turn]?.authId === e.state.authId && <Dice id={i} onDiceChange={onDiceChange} />}
                </div>
              </>
            );
          })}
          
          {/* game end  */}
          <Modal show={isGameEnded}>
            <div>
              <p>End game</p>
            </div>
          </Modal>

          {/* Асуултыг харуулж байна */}
          <Modal show={questionShow}>
            <div 
            className="flex flex-col h-full w-full"
            // style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="text-white m-auto flex flex-col justify-center items-center w-[70px] h-[70px] bg-baseColor rounded-[50%]">
                <p className="text-sm">time </p>
                <p className="text-[22px] font-bold">{time}</p>
              </div>
              <div className="flex my-2 w-full bg-hpink border border-baseColor rounded-[10px] h-full p-2">
                <p>{question?.questionText} </p>
              </div>

              <div className="flex flex-col my-2">
                {question?.options?.map((choice, i) => {
                  return (
                  // !answerShow &&    
                  <button
                      key={i}
                      onClick={() => saveAnswer(choice.optionText)}

                      // disabled={playerAnswer?.answer}
                      // className= {`${
                      //   (choice.optionText === playerAnswer?.answer &&  playerAnswer?.answer === question?.answerKey) ? 
                      //     'bg-green-600 ' : ""} hover:bg-orange-400 my-1 p-2 border border-baseColor rounded-2xl`}
                      
                      // className ={`${answer?.authId === currentUser ? "hidden" : "mx-3 border border-hpink my-1 p-2 rounded-2xl"} `}
                      // className ={`${playerAnswer || playerAnswerData?.data ? "hidden" : "mx-3 border border-hpink my-1 p-2 rounded-2xl"} `}
                      className ={`${playerAnswer ? "hidden" : "mx-3 border border-hpink my-1 p-2 rounded-2xl"} hover:bg-orange-400`}
                    
                    >
                    
                    <p > {choice.optionText}</p>
                  </button>
                  );
                })}
              </div>
            </div>
          </Modal>

          {/* Харилутыг харуулж байна */}
          <Modal show={answerShow}>
            <div className="flex flex-col justify-center">
              <p className="text-center">Correct answer</p>
              <p className="text-center my-2 w-full bg-hpink border border-baseColor rounded-[10px] h-full p-2"> {question?.answerKey}</p>
            </div>
          </Modal>

        <div className="absolute w-full h-full">
          <Field power={power}/>
        </div>

        <div className="absolute z-10 w-full h-[68px] bottom-[40px]">
          <Footer currentUser={currentUser}/>
        </div> 
      </div>  
    </div>
  );
};

export default GameDetail;

  

// const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
// const chLan = queryParams.get("lan")
// const chLevel = queryParams.get("level")
// const chLesson = queryParams.get("lesson")

 {/* <button onClick={() => Lessonctx.examfun()}>exam</button> */}
   {/* <Body exam={exam} translate={translate} word={word} /> */}

// let query = useQuery();
  // function useQuery() {
  // const { search } = useLocation();
  // return React.useMemo(() => new URLSearchParams(search), [search]);
  // }