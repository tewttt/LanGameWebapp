import React, { useState,  useEffect , useRef } from "react";
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

const auth = getAuth();
let intervalIds = [];
const TIME = 3

const GameDetail = () => {
 
  const currentUser = auth.currentUser.uid;
  const { id } = useParams();
  // console.log(id)
  const { addAnswer, game, players, addPoint,deletePlayer ,isGameEnded, showGameEnd} = useGame(id);

  const [loader, setLoader] = useState(false);
  const [time, setTime] = useState(TIME)
  const [questionShow, setQuestionShow] = useState(true); 
  const [answerShow, setAnswerShow] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0);
  const [turn, setTurn] = useState(0);
  const [answeredPlayers, setAnsweredPlayers] = useState([])
  const questions = useRef([])

  // const [questions,setQuestions] = useState([])
 
  const question = questions.current[questionNumber] || {} 
//  console.log(question,questions);
  const positions = [
    { position: "absolute", top: 100, left: 0 },
    { position: "absolute", top: 100, right: 0 },
    { position: "absolute", bottom: 100, right: 0 },
    { position: "absolute", bottom: 100, left: 0 },
  ];
 
  const logout = () => {
    deletePlayer(id, currentUser);
  };

  useEffect(() => {
    // Асуултыг хугацаа харуулж байна
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
      next = 3
    }
    return next;
  }) 
}

// Асуултын хариултыг Question -ий Answerd нэмж байна
const saveAnswer = (answer) => {
addAnswer(answer, currentUser, questionNumber);
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
  <div className="flex flex-col justify-center m-auto text-white h-[660px]  max-w-[400px] ">
    <div>
      <header className="fixed flex h-[50px] w-screen  z-10 items-center justify-between  bg-baseColor ">
        {/* <Logo/> */}
        <div className="flex justify-between " onClick={logout}>
          Гарах
        </div>
      </header>
    </div>

    <div className="flex flex-col  relative  bg-green-600 w-full h-full ">
      {loader && (
        <div className="absolute bg-baseColor">
          <Spinner />
          <div className="text-sm w-full text-center">
            Waiting for other players... 30sec
          </div>
        </div>
      )}
      <Head />
      {/* Body */}
      <div className="relative w-full h-full">
        {/* Тоглогчдыг харуулж байна */}
        {players?.map((e, i) => {
          return (
            <>
              <div
                id={e}
                style={{ ...positions[i] }}
                className="flex flex-col items-center "
                key={i}
              >
                {/* <p>answeredPlayers {answeredPlayers[turn]?.authId === e.state.authId ? turn +1 : ''}</p> */}
                <p>order </p>
                <p className="text-[10px]">{e.state.name}</p>
                <img src={zur} className="w-[50px] h-[50px] rounded-[50%] " />
                <p className="text-[10px]">Level</p>

                {answeredPlayers[turn]?.authId === e.state.authId && <Dice id={i} onDiceChange={onDiceChange} />}
              </div>
            </>
          );
        })}
        {/* game end  */}
        <Modal show={isGameEnded}>
          <div>togloom duuslaa
          </div>
        </Modal>
        {/* Асуултыг харуулж байна */}
        <Modal show={questionShow}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>time {time}</p>
            <div className="flex">
              {/* <p className="mx-3">Question </p> */}
              <p>{question?.questionText} </p>
            </div>
            <div className="flex">
              {question?.options?.map((e, i) => {
                // console.log(e);
                return (
               !answerShow &&    
               <button
                    key={i}
                    onClick={() => saveAnswer(e.optionText)}
                    // className={`${lanActive === i ? css.laan : ""} ${css.nolan}`}
                    className ={`${answer?.authId === currentUser ? "hidden" : "mx-3 border border-red-400 p-2 rounded-2xl"} `}
                    // className="mx-3 border border-red-400 p-2 rounded-2xl"
                  >
                    <p>{e.optionText}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </Modal>

        {/* Харилутыг харуулж байна */}
        <Modal show={answerShow}>
          <p>correct answer : {question?.answerKey}</p>
        </Modal>

        <div className="absolute top-6 left-11">
          <Field players={players} />
        </div>
      </div>
      <Footer />
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