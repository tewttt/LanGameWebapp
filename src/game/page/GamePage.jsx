import React, { useState, useContext, useEffect } from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import LessonContext from "../../context/LessonContext";
import { getAuth } from "firebase/auth";
import Modal from "../../components/General/Modal";
import { IoAddCircle } from "react-icons/io5";
import { FaCircleMinus } from "react-icons/fa6";

// TO DO 
// БҮх тоглогч гарах үед тухайн тоглоомыг устгах
// 3 tools talbar dr random -r gargah 
// 
const auth = getAuth();
let intervalIds = [];
const TIME = 10
const Game = () => {
  const [time, setTime] = useState(TIME)
  const [state, setState] = useState({});
  const Lessonctx = useContext(LessonContext);
  const Userctx = useContext(UserContext);
  const authId = auth.currentUser?.uid;

  let arrLevel = Lessonctx.levelId;
  let arrLanguage = Lessonctx.lanId;
  let arrLesson = Lessonctx.lessonsId;
  // const { examfun } = useGame(chLan, chLevel, chLesson);
  const [chChoose, setChoose] = useState("");
  const [chooseActive, setChooseActive] = useState(0);

  const [chLan, setChLan] = useState("");
  const [lanActive, setLanActive] = useState("");

  const [chLevel, setChLevel] = useState("");
  const [levelActive, setLevelActive] = useState("");

  const [chLesson, setChLesson] = useState("");
  const [lessonActive, setLessonActive] = useState("");

  const arrChoose = ["Online", "Friends"];
  const [show, setShow] = useState(false);

  
  useEffect(() => {
    intervalIds.push( setInterval(startTimer, 1000))
     return ()=>{
      clearIntervals()
    }
  }, []);

  const clearIntervals = () => {
    // console.log('====Clear',intervalIds)
    // intervalIds = ref.current
    intervalIds.map(i=>clearInterval(i))
    intervalIds = [];
  }

  const startTimer = () => {
    setTime(prev =>{
      let next = prev - 1; 
      // console.log('=========='+next , next <= 0);
      if(next <= 0) {
        next = 10
      }
      return next;
    }) 
  }

  useEffect(() => {
    if (Userctx.currentUser) {
      const newData = {
        name: Userctx.currentUser.name,
        email: Userctx.currentUser.email,
        authId: Userctx.currentUser.authId,
      };
      setState(newData);
    }
  }, [Userctx.currentUser, Lessonctx.games]);

  const closeConfirm = () => {
    // setShow(false);
    setShow({ show: false, game: null });
  };
  const showConfirm = (game) => {
    // {show:true, selectedGame: game}
    setShow({ ...show, show: true, game: game });
  };

  const selectChoose = (ch, i) => {
    // console.log(ch);
    setChooseActive(i);
    setChoose(ch);
  };
  const selectLan = (lan, i) => {
    setLanActive(i);
    setChLan(lan);
    Lessonctx.Level(lan);
  };

  const selectLevel = (level, i) => {
    setLevelActive(i);
    setChLevel(level);
    Lessonctx.Lessons(level, chLan);
  };
  // console.log(Lessonctx.chGames);
  const selectLesson = (lesson, i) => {
    setLessonActive(i);
    setChLesson(lesson);
    Lessonctx.chGames(chLan, chLevel, lesson);
  };
  const join = (game) => {
    Lessonctx.join(state, game, chLan, chLevel, chLesson);
    // examfun(game.id);
  };

  const newGame = (entry) => {
    Lessonctx.createGame(state, chLan, chLevel, chLesson , entry , authId );
  };
  const [betNumber, setBetNumber] = useState(0)
  const bet = [
    {win: 1400, entry: 500},
    {win: 5600, entry: 2000},
    {win: 28000, entry: 10000},
    {win: 140000, entry: 50000},
    {win: 560000, entry: 200000},
  ]

  const addBet = () => {
    if(betNumber === bet.length-1) 
    {
      return bet.length - 1
    } else {
      setBetNumber(prev => prev + 1)
    }
  }

  const minusBet = () => {
    if(betNumber == 0 ) {
      return 0;
    } else {
      setBetNumber(prev => prev - 1)
    }
    
  }
  return (
    // <GameStore>
    <div className="flex flex-col justify-center">
      <ToolSidebar />

      <div className="flex flex-col  border border-baseBlue  mt-16 max-w-[400px] h-screen m-auto justify-around items-center">
        <div className="flex flex-col justify-around ">
          {/* <div className="flex justify-around bg-baseColor rounded-2xl  my-3 py-5 w-[100%]">
            {arrChoose.map((ch, i) => (
              <div
                key={i}
                onClick={() => selectChoose(ch, i)}
                className={`${
                  chooseActive === i
                    ? "border border-blue-700 text-blue-600"
                    : ""
                } text-[12px]   transform hover:scale-110 hover:border-blue-500 hover:text-blue-500 text-blue-200 border border-blue-200 rounded-[10px] py-1 px-2 mx-3 my-1 w-[95px] h-[30px]  flex justify-center items-center`}
              >
                {ch}
              </div>
            ))}
          </div> */}
          <div className="flex justify-center bg-baseColor rounded-2xl my-3  py-5 w-full">
            {arrLanguage.map((lan, i) => (
              <div
                className={`${
                  lanActive === i ? "border border-blue-700 text-blue-600" : ""
                } text-[12px]    transform hover:scale-110 hover:border-blue-500 hover:text-blue-500 text-blue-200 border border-blue-200 rounded-[10px] py-1 px-2 mx-3 my-1 w-[95px] h-[30px] flex justify-center items-center`}
                //    className={`${lanActive===i ? css.laan : ""} ${css.nolan}`}
                key={i}
                onClick={() => selectLan(lan.id, i)}
              >
                {lan.id}
              </div>
            ))}
          </div>
          <div className=" flex justify-center bg-baseColor rounded-2xl my-3 py-5 w-full">
            {arrLevel.map((level, i) => (
              <div
                // className={`${levelActive===i ? css.newlevel : css.nolevel} ${css.nolevel}`}
                className={`${
                  levelActive === i
                    ? "border border-blue-700 text-blue-600"
                    : ""
                } flex justify-center items-center tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200 w-[40px] h-[40px] rounded-[5px]  `}
                key={i}
                onClick={() => selectLevel(level.id, i)}
                $
              >
                {level.id}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-10 bg-baseColor rounded-2xl my-3 py-5 w-full">
            {arrLesson.map((lesson, i) => (
              <div
                onClick={() => selectLesson(lesson.id, i)}
                key={i}
                className={`${
                  lessonActive === i
                    ? "border border-blue-700 text-blue-600"
                    : ""
                } flex justify-center items-center tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200 w-[40px] h-[40px] rounded-[5px]  `}
                // className=" w-[20px] h-[20px] rounded-[5px] tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200"
              >
                {lesson.id}
              </div>
            ))}
          </div>

          <div className="text-white ">
            <div className="flex justify-center mb-3">Choose Bet</div>
            <div className="flex justify-between">
              <div><FaCircleMinus onClick={minusBet} color="blue" size={30}/></div>
              <div>
                <div>WIN: {bet[betNumber].win}</div>
                <div>Entry: {bet[betNumber].entry}</div>
              </div>
              <div><IoAddCircle onClick={addBet} color="blue" size={34}/></div>
            </div>
          </div>
        </div>
        <Modal closeConfirm={closeConfirm} show={show.show}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            Тоглоомоо үргэлжлүүлэх үү ?
            <button
              className="border border-gray-400 mx-3"
              onClick={() => join(show.game)}
            >
              Тийм
            </button>
          </div>
        </Modal>

        <div className="grid grid-cols-4 bg-baseColor rounded-2xl w-full my-3 py-5 ">
          {Lessonctx.games.map((game, i) => {
            // console.log(game);
            return (
              <div
                key={i}
                className="border border-blue-700 text-blue-600 w-[85px] h-[50px] flex flex-col justify-center items-center p-3 m-2 rounded-xl"
              >
                <div className="text-[12px]">Players 4/{game.count}</div>
                <div>{time}</div>
                <div
                  className=" text-xl hover:text-red-500"
                  // onClick={() => showConfirm(game)}
                  onClick={() => join(game)}
                >
                  <p>join</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          // onClick={() => newGame(chLan, chLevel, chLesson )}
          onClick={() => newGame( bet[betNumber].entry)}
          className=" bg-black rounded-3xl p-3 border border-baseBlue text-white hover:border-blue-800 hover:bg-baseBlue "
        >
          New Game
        </button>
        {/* <button onClick={join} className=" bg-black rounded-3xl p-3 border border-baseBlue text-white hover:border-blue-800 hover:bg-baseBlue ">add player Game</button> */}
      </div>
    </div>
    // </GameStore>
  );
};

export default Game;

// <Modal closeConfirm={closeGame} show={showNewGame}>
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           Шинэ толооом үүсгэх үү ?
//           <button
//             className="border border-gray-400 mx-3"
//             onClick={() => newGame()}
//           >
//             Тийм
//           </button>
//         </div>
//       </Modal>

// const [english, setEnglish] = useState([])
// const [mongolia, setMongolia] = useState([])
// const [korea, setKorea] = useState([])
// const arrLanguage = [english, mongolia, korea]

// const [level, setLevel] = useState([])
// console.log(level)
// useEffect(() => {
//     Lessonctx.englishList.map((e) => {
//        setEnglish(e.state.base.language)
//     })
//     Lessonctx.koreaList.map((e) => {
//         setKorea(e.state.base.language)
//      })
//     Lessonctx.mongoliaList.map((e) => {
//         setMongolia(e.state.base.language)
//     })

//     Lessonctx.englishList.map((e) => {
//         setLevel(e.state.base.level)
//      })

// },[Lessonctx.englishList])
