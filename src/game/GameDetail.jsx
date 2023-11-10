import React, { useState, useContext, useEffect } from "react";
import Head from "./Head";
import Dice from "./Dice";
import zur from "../assets/img/1.jpg"
import Field from "./Field";
import Modal from "../components/General/Modal";
import Footer from "./Footer";
import Spinner from "../components/General/Spinner";
import { useParams, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import useGame from "../hook/useGame";
import LessonContext from "../context/LessonContext";

const auth = getAuth();
let intervalIds = [];
const TIME = 3

const GameDetail = () => {
  const currentUser = auth.currentUser.uid;
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [loader, setLoader] = useState(false);
  const [chLan, setChLan] = useState(queryParams.get("lan"));
  const [chLevel, setChLevel] = useState(queryParams.get("level"));
  const [chLesson, setChLesson] = useState(queryParams.get("lesson"));
  const [time, setTime] = useState(TIME)
  const [start, setStart] = useState(false);
  const [show, setShow] = useState(true);
  const [answerShow, setAnswerShow] = useState(false)
  const Lessonctx = useContext(LessonContext);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [turn, setTurn] = useState(0);
  const [order, setOrder] = useState([])

  const positions = [
    { position: "absolute", top: 100, left: 0 },
    { position: "absolute", top: 100, right: 0 },
    { position: "absolute", bottom: 100, right: 0 },
    { position: "absolute", bottom: 100, left: 0 },
  ];

  const { addAnswer, game, players, addPoint, exam, deletePlayer, examfun, translatefun, translate, wordfun, word } = useGame(
    id,
    chLan,
    chLevel,
    chLesson
  );
  const logout = () => {
    deletePlayer(id, currentUser);
  };

  // Questions асуултуудыг татаж авчирж байна
  useEffect(() => {
    examfun();
    translatefun();
    wordfun()

    // Асуултыг хугацаа харуулж байна
  intervalIds.push( setInterval(startTimer, 1000))
     return ()=>{
      // console.log(intervalId);
      clearIntervals()
    }
  }, []);

  const clearIntervals = () => {
    // console.log('====Clear',intervalIds)
    intervalIds.map(i=>clearInterval(i))
  }
  
  // Авчирсан асуултуудаа нийлүүлж байна
  let questions = [].concat(
    exam.exam
    // props.translate.translate,
    // props.word.word
  );  
    
  // Нийлүүлсэн асуултуудаа хольж , байрыг сольж байна
  useEffect(() => {
    if (questions) {
      shuffleArray(questions);
    }
  }, [questions]);

  function shuffleArray(questionsToShuffle) {
    for (let i = questionsToShuffle.length - 1; i > 0; i--) {
      let randomPosition = Math.floor(Math.random() * (i + 1));
      let temp = questionsToShuffle[i];
      questionsToShuffle[i] = questionsToShuffle[randomPosition];
      questionsToShuffle[randomPosition] = temp;
    }
    return questionsToShuffle;
  }

  // Асуултыг нэг нэгээр нэмэгдүүлж байна
  const addQuestionnumber = () => {
    setQuestionNumber((prev) => prev + 1);
  };
  // Асуулт харуулах Modal
  const questionShow = () => {
    setShow(true);
  };
  const questionClose = () => {
    setShow(false); 
  };
  // Хариулт харуулах Modal
  const ansShow = () => {
    setAnswerShow(true);
  };
  const answerClose = () => {
    setAnswerShow(false); 
  };
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
 // Шоо хаяхад тоглогчын оноог нэмж, ээлжийг шилжүүлж байна
  const onDiceChange = (val) => {
     addPoint(id, val);
    autoTurn(); 
    // console.log(val)
    // if(val < 6) {
    //    // addPoint(id, val);
    // // autoTurn(); 
    // } else if ( val == 6 ) {
    //   console.log("")
    // }
   
  };

  // console.log(time)
  // Тоглогчын ээлжийг шилжүүлэх
  const autoTurn = () => {
    setTimeout(() => {
      setTurn((prev) => {
        let next = prev + 1;
        // console.log(next > order.length, next , order.length);
        if (next == order.length)
        {      
          //Бүх тоглогчид шоо хаяж, морь нүүсний дараа, дараагийн асуултыг харуулах
          // console.log(next)
          next = 0;    
          questionShow()   
          addQuestionnumber()

          clearIntervals()
          intervalIds.push( setInterval(startTimer, 1000))
        }   
        return next;
      });
     
    }, 5000)};

// Нийт хариулсан тоглогчдын хариултыг зөв болон хугацаагаар шүүж байна
  

  // console.log(Lessonctx.games[0]?.questions[questionNumber])
  // console.log(questionNumber + "question number")
  const playerCheck = () => {
    // const playerCount = Lessonctx.games[0].questions[questionNumber].answers.length
    const oneCorrectAnswer = Lessonctx.games[0].questions[questionNumber].answerKey
    const allAnswer = Lessonctx.games[0]?.questions[questionNumber].answers
    let correctAnswers=  allAnswer?.filter(el => el.answer === oneCorrectAnswer)
    let sort = correctAnswers?.sort((a , b) => a.time.localeCompare(b.time))
    console.log(sort,correctAnswers)
    // setOrder(sort)
    if (sort?.length === 0  ) {
      // асуулт , хариулт , шоо хаях
      questionShow()   
      addQuestionnumber()
    
      clearIntervals()
      intervalIds.push( setInterval(startTimer, 1000))
      // // onDiceChange()
      // autoTurn()
      sort && setOrder(sort)
    } else {
      sort && setOrder(sort)
    }
   
   
  }
 // Асуултын хариултыг Question -ий Answerd нэмж байна
  const saveAnswer = (answer) => {
    addAnswer(answer, currentUser, questionNumber);
    // Тоглогч хариулсан бол хариултын товчыг идэвхигүй болгох
  };
  const aaAnswer = Lessonctx.games[0]?.questions[questionNumber]?.answers
  const answer = aaAnswer?.find(item => item.authId === currentUser)
  // console.log(answers.authId)
  
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
          // console.log(e.state.authId);
          return (
            <>
              <div
                id={e}
                style={{ ...positions[i] }}
                className="flex flex-col items-center "
                key={i}
              >
                {/* <p>order {order[turn]?.authId === e.state.authId ? turn +1 : ''}</p> */}
                <p>order </p>
                <p className="text-[10px]">{e.state.name}</p>
                <img src={zur} className="w-[50px] h-[50px] rounded-[50%] " />
                <p className="text-[10px]">Level</p>

                {order[turn]?.authId === e.state.authId && <Dice id={i} onDiceChange={onDiceChange} />}
              </div>
            </>
          );
        })}

        {/* Асуултыг харуулж байна */}
        <Modal show={show}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>time {time}</p>
            <div className="flex">
              {/* <p className="mx-3">Question </p> */}
              <p>{questions[questionNumber]?.questionText} </p>
            </div>
            <div className="flex">
              {questions[questionNumber]?.options.map((e, i) => {
                // console.log(e);
                return (
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
            {/* <button onClick={addQuestionnumber}>add number</button> */}
            {/* <button onClick={questionClose}>cancel</button> */}
          </div>
        </Modal>

        {/* Харилутыг харуулж байна */}
        <Modal show={answerShow}>
          <p>correct answer : {questions[questionNumber]?.answerKey}</p>

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

 {/* <button onClick={() => Lessonctx.examfun()}>exam</button> */}
   {/* <Body exam={exam} translate={translate} word={word} /> */}

// let query = useQuery();
  // function useQuery() {
  // const { search } = useLocation();
  // return React.useMemo(() => new URLSearchParams(search), [search]);
  // }