import React, { useState,  useEffect , useRef, useContext } from "react";
import Head from "../components/Head";
import Dice from "../components/Dice";
import zur from "../../assets/img/1.jpg"
import Field from "../components/Field";
import Modal from "../../components/General/Modal";
import Footer from "../components/Footer";
import Spinner from "../../components/General/Spinner";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import useGame from "../../hook/useGame";
import UserContext from "../../context/UserContext";
import { MdOutlineLogout } from "react-icons/md";

const auth = getAuth();
let intervalIds = [];
const TIME = 10
// TO DO
// vvssen togloomiin toglogchid 10 minutand bvrdehgvi bol tohloomii ustgana
// game tools iig random r talbar dr gargah
// end game Model dr toglogchdiin niit heden asuultand zow hariulsaniig haruulah
// bairiig ezlvvlj haruulah
// 1, 2 bairnii toglogchdod coin nemeh
// sound oruulah
// БҮх тоглогч гарах үед тухайн тоглоомыг устгах
// express game ustgah 
// frontend

const GameDetail = () => {
 const ctx = useContext(UserContext)
  // const currentUser = auth.currentUser.uid;
  const currentUser = ctx?.currentUser?.authId
  const { id } = useParams();
  // console.log(ctx.currentUser)
  const { addAnswer, game, players, addPoint,deletePlayer ,isGameEnded, showGameEnd} = useGame(id);
  // console.log(players)
  const [loader, setLoader] = useState(false);
  const [time, setTime] = useState(TIME)
  const [questionShow, setQuestionShow] = useState(true); 
  const [answerShow, setAnswerShow] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0);
  const [turn, setTurn] = useState(0);
  const [answeredPlayers, setAnsweredPlayers] = useState([])
  const questions = useRef([])
 
  const question = questions.current[questionNumber] || {} 

const [playerAnswer, setPlayerAnswer] = useState("")
//  const playerAnswer = answeredPlayers.find(
//   item => item.authId === currentUser
 
// );
 console.log(playerAnswer);

  const positions = [
    { position: "absolute", top: 150, left: 10 },
    { position: "absolute", top: 230, left: 10 },
    { position: "absolute", top: 310, left: 10 },
    { position: "absolute", top: 390, left: 10 },
   
  ];
 
  const logout = () => {
    deletePlayer(id, currentUser);
  };

  useEffect(() => {
    // Асуултын хугацаа харуулж байна
    intervalIds.push( setInterval(startTimer, 1000))
     return ()=>{
      // console.log(intervalId);
      clearIntervals()
    }
  }, []);

  const clearIntervals = () => {
    // console.log('====Clear',intervalIds)
    // intervalIds = ref.current
    intervalIds.map(i=>clearInterval(i))
    intervalIds = [];
  }
  // console.log(intervalIds)


  // Нийлүүлсэн асуултуудаа хольж , байрыг сольж байна
  useEffect(() => {
    if (game.questions) {
    const shuffledQ =  shuffleArray(game.questions);
    // setQuestions(shuffledQ)
    questions.current = shuffledQ
    }
  }, [game.questions]);

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
    let sort = correctAnswers?.sort((a , b) => a.time.localeCompare(b.time))
    // console.log(question,correctAnswers);
    // console.log(sort)
    sort && setAnsweredPlayers(sort)
   
      // if (sort?.length === 0 || "undefined" ) {
        if (sort?.length === 0 ) {
        setTimeout(() => {
          getQuestionShow()   
          addQuestionnumber()
        }, 3000)
     
      // clearIntervals()
      intervalIds.push( setInterval(startTimer, 1000))
      onDiceChange()
      autoTurn()
      sort && setAnsweredPlayers(sort)
  }}}

  // Тоглогчын ээлжийг шилжүүлэх 1000ms дараа эхлэнэ
   // Шоо хаяхад тоглогчын оноог нэмж, ээлжийг шилжүүлж байна
const onDiceChange =async (val) => {
  const activeUser = players?.find((item) => item.id === currentUser)
  const pointCount = activeUser.pointCount
  if(val === 2 && pointCount < 2  ) {
    addPoint(id, val)
    // alert("dahiad hay")
  } else {
  addPoint(id, val, true);
  autoTurn();
  }
};

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


// Асуултанд хариулах хугацаа харагдана
// Асуултанд хариулсны дараа Хариултыг харуулаад Шоо хаях эхийн тоглогч дээр шоо харагдана
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

// Асуултын хариултыг Question -ий Answerd нэмж байна
const saveAnswer = (answer) => {
addAnswer(answer, currentUser, questionNumber);
setPlayerAnswer(answer)
// Тоглогч хариулсан бол хариултын товчыг идэвхигүй болгох
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
const answer = question?.answers?.find(item => item.authId === currentUser)
  
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

          {/* Head */}
          <div className="h-[30px] z-10 absolute flex items-center justify-between w-full">
              <MdOutlineLogout
                onClick={logout}
                size={18}
                className=" md:w-[30px] md:h-[30px] mx-1 lg:mx-5 hover:text-blue-500 transform duration-500 ease-in-out hover:scale-125"
              />
              <div>{ctx?.currentUser?.coins}</div>
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
                  !answerShow &&    
                  <button
                      key={i}
                      onClick={() => saveAnswer(choice.optionText)}
                      disabled={playerAnswer?.answer}
                      className= {`${
                        (choice.optionText === playerAnswer?.answer &&  playerAnswer?.answer === question?.answerKey) ? 
                          'bg-green-600 ' : ""} hover:bg-orange-400 my-1 p-2 border border-baseColor rounded-2xl`}
                      // className ={`${answer?.authId === currentUser ? "hidden" : "mx-3 border border-hpink my-1 p-2 rounded-2xl"} `}
                    
                    >
                    
                    <p > {choice.optionText}</p>
                  </button>
                  );
                })}
              </div>
            </div>
          </Modal>

        
        <div className="absolute w-full h-full">
          <Field players={players} />
        </div>
        
      
      </div>  
    </div>
  );
};

export default GameDetail;

  {/* Харилутыг харуулж байна */}
          {/* <Modal show={answerShow}>
            <div className="flex flex-col justify-center">
              <p className="text-center">Correct answer</p>
              <p className="text-center my-2 w-full bg-hpink border border-baseColor rounded-[10px] h-full p-2"> {question?.answerKey}</p>
            </div>
          </Modal> */}

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