import React, { useEffect, useState, useContext } from "react";
import zur from "../assets/img/1.jpg";
import Dice from "./Dice";
import Field from "./Field";
import { getAuth } from "firebase/auth";
import { useParams, useLocation } from "react-router-dom";
import useGame from "../hook/useGame";
import LessonContext from "../context/LessonContext";
import Modal from "../../src/components/General/Modal";
import moment from "moment";
const auth = getAuth();
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
let intervalId;
const TIME = 10
const Body = (props) => {
  const authId = auth?.currentUser?.uid;
  // console.log(auth?.currentUser?.uid)
  // console.log(props.exam.exam);
  // console.log(props.translate.translate);
  // console.log(props.word.word);
   
  let query = useQuery();
  const [start, setStart] = useState(false);
  const [show, setShow] = useState(true);
  const Lessonctx = useContext(LessonContext);
  const { id } = useParams();
  const { players, addPoint, addAnswer } = useGame(id);
  // const [allPlayers , setAllPlayers] = useState(players)
  // console.log(players)
  // console.log(allPlayers)
 
  const positions = [
    { position: "absolute", top: 100, left: 0 },
    { position: "absolute", top: 100, right: 0 },
    { position: "absolute", bottom: 100, right: 0 },
    { position: "absolute", bottom: 100, left: 0 },
  ];

  const questionShow = () => {
    setShow(true);
  };
  const questionClose = () => {
    setShow(false); 
  };

  let questions = [].concat(
    props.exam.exam
    // props.translate.translate,
    // props.word.word
  );
  // console.log(questions[0].options);
  const [questionNumber, setQuestionNumber] = useState(0);
  const addQuestionnumber = () => {
    // let next = prev +1
    setQuestionNumber((prev) => prev + 1);
  };

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
  const [turn, setTurn] = useState(0);
  console.log(turn)
  const autoTurn = () => {
    setTimeout(() => {
      setTurn((prev) => {
        let next = prev + 1;
        if (next > 2) next = 0;
        return next;
      });
    }, 500);
  };

  const onDiceChange = (val) => {
    addPoint(id, val);
    autoTurn();
  };
  const saveAnswer = (answer) => {
    addAnswer(answer, authId, questionNumber);
    // Тоглогч хариулсан бол хариултын товчыг идэвхигүй болгох
  };

  useEffect(() => {

    setTimeout(() => {
      
    }, 1000);
       
      // questionClose()
    
    // playerCheck()

    // return ()=>{
    //   console.log(intervalId);
    //   clearInterval(intervalId)
       
    // }
  }, [])
 
  const [time, setTime] = useState(TIME)
  const startTimer = () => {
    

  intervalId = setInterval(
      setTime(prev =>{
        let next = prev - 1; 

        console.log('=========='+next , next <= 0);
        if(next <= 0) {
          clearInterval(intervalId)
          next = 5
        }
        return next;
      }),
      1000
    )

    

     
  }
  const playerCheck = () => {
    const playerCount = Lessonctx.games[0].questions[questionNumber].answers.length
    const oneCorrectAnswer = Lessonctx.games[0].questions[questionNumber].answerKey
    const allAnswer = Lessonctx.games[0].questions[questionNumber].answers
    let correctAnswers=  allAnswer.filter(el => el.answer === oneCorrectAnswer)
    let sort = correctAnswers.sort((a , b) => a.time.localeCompare(b.time))
    console.log(sort)
    return sort;
    // setTurn(sort)
  }
//  console.log(sort)
 // 0.001s = 1ms
    // 10 сек тоолно
    // Нийт хэдэн тоглогч хариулсныг олно
    // Харилусан тоглогчдын хариултыг хугацаа, зөв хариултаар дарааллыг тогтооно
    // Зөв хариулт
    // Хугацаа
    // Дараалллын дагуу шоо хаяж, нүүнэ
    // Хариулаагүй тоглогчид нүүдэл хийхгүй
    // нүүж дууссаны дараа , дараагын асуулт гарна
  return (
    // <div className="flex flex-col m-auto  ">
    <div className="relative w-full h-full">
      {players?.map((e, i) => {
        // console.log(e);
        return (
          <>
            <div
              id={e}
              style={{ ...positions[i] }}
              className="flex flex-col items-center "
              key={i}
            >
              <p className="text-[10px]">{e.state.name}</p>
              <img src={zur} className="w-[50px] h-[50px] rounded-[50%] " />
              <p className="text-[10px]">Level</p>

              {turn === i && <Dice id={i} onDiceChange={onDiceChange} />}
            </div>
          </>
        );
      })}
      <Modal show={show}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>time {time}</p>
          <div className="flex">
            {/* <p className="mx-3">Question </p> */}
            <p>{questions[questionNumber]?.questionText} </p>
          </div>
          <div className="flex">
            {questions[questionNumber]?.options.map((e, i) => {
              // console.log(e.optionText);
              return (
                <button
                  key={i}
                  onClick={() => saveAnswer(e.optionText)}
                  className="mx-3 border border-red-400 p-2 rounded-2xl"
                >
                  <p>{e.optionText}</p>
                </button>
              );
            })}
          </div>
          <button onClick={addQuestionnumber}>add number</button>
          <button onClick={questionClose}>cancel</button>
        </div>
      </Modal>

      <div className="absolute top-6 left-11">
        <Field players={props?.players} />
      </div>
      {/* <button onClick={() => Lessonctx.examfun()}>exam</button> */}
    </div>

    // </div>
  );
};

export default Body;

  // const time = new Date().getTime()
    // const value = moment(time).format('YYYY-MM-DD HH:mm:ss:SSS')
    // let shortTime = correctAnswers.filter(el => el.time < value)

    // console.log(correctAnswers)
   
  //  correctAnswers.map((e,i) => {
  //   let short = e.time.sort()
  //   console.log(short)
    
  //  })


// useEffect(() => {
//   setQuestions(
//     [].concat(
//       Lessonctx.exam.exam,
//       Lessonctx.word.word,
//       Lessonctx.translate.translate
//     )
//   );
//   // shuffleArray(questions);
// }, []);

// useEffect(() => {
//   if (ctx.games) {
//     const game = ctx.games.find((item) => item.id === id);
//     setGame(game);
//   }
// }, [ctx.games]);

{
  /* {turn === i && (
              <div className="absolute top-6 left-11">
                <Field point={e.point} playerId={i} />
              </div>
            )} */
}
{
  /* <Field dice={dice} /> */
}
{
  /* <Horse move={move}/> */
}
// Тоглогчид тоглох хүсэлт илгээх
// Идэвхитэй 4 тоглогчыг
// Тоглогч дээр дарахад тоглогчын мэдээллийг харуулах. Оноо , нэр ...selection:
// Асуултанд түрүүлж хариулсан дарааллыг тогтоох
// Идэвхитэй тоглогчыг ялгаруулж харуулах
// Асуултанд хариулсан дарааллаар Тоглогчид дарааллын дагуу шоо хаях

// Шооны ээлжийг тогтоох, дараагын тоглогч руу шилжүүлэх
// Тоглогчын морь шооны дагуу урагшаа нүүх

// Дахин асуултанд хариулж шоо хаях дарааллыг тогтоох
// Түрүүлж барианд орсон тоглогчыг тогтоох
// Тоглоом дуусхад тоглогчдын оноо, байрыг харуулах

// Busad toglogchiig 30sec hvleeh spinner vzvvleh
// Game iin olon shiree vvsgeh
// toglolt duussanii daraa shireeg tsewerleh
// toglogchiin ner, zurgiiig haruulah
// 4 toglogchiin medeelliig db tsugluulaad , haruulah
// toglogchdiin medeelliig haruulah
// Active toglogchiig haruulah
// Active toglogch shoo hayh
// Active toglogchiin moriig nvdnii dugaaar dr awaachih
// Active toglogchiin onoog hadgalah , daraagiin togloltond haruulah

// useEffect(() => {
//     if(props.game.players){
//         setPlayers(props.game.players)
//     }
// }, [props.game.players])

// console.log(players)

// const redPlayer = {
//   bg: "red",
//   path: [1, 2, 3, 4],
//   currentPosition: 0,
//   curretStep: null,
//   // control: "#",
// };
// const bluePlayer = {
//   bg: "blue",
//   path: [1, 2, 3, 4],
//   currentPosition: 1,
//   curretStep: null,
//   // control: "#",
// };
// const purplePlayer = {
//   bg: "purple",
//   path: [1, 2, 3, 4],
//   currentPosition: 2,
//   curretStep: null,
//   // control: "#",
// };
// const orangePlayer = {
//   bg: "orange",
//   path: [1, 2, 3, 4],
//   currentPosition: 3,
//   curretStep: null,
//   // control: "#",
// };
