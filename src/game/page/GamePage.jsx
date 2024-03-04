import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import LessonContext from "../../context/LessonContext";
import { getAuth } from "firebase/auth";
import Modal from "../../components/General/Modal";
import { IoAddCircle } from "react-icons/io5";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCoins } from "react-icons/fa";
import GameNavbar from "../components/GameNavbar";
import useLesson from "../../hook/useLesson";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import pattern from "../../assets/logo/patternWhite.png"
const auth = getAuth();
let intervalIds = [];
const TIME = 600

const Game = () => {
  const {createGame, join, games, chGames, lanId , levelId, lessonsId,  getLevelId, getLessonId,} = useLesson()
  // console.log(lanId)
  const bet = [
    {win: 1400, entry: 500, second: 500},
    {win: 5600, entry: 2000 , second: 2000},
    {win: 28000, entry: 10000 , second: 10000},
    {win: 140000, entry: 50000, second: 50000},
    {win: 560000, entry: 200000 , second: 200000},
  ]

  const history = useHistory();
  const [time, setTime] = useState(TIME)
  const [state, setState] = useState({});
  const Lessonctx = useContext(LessonContext);
  const Userctx = useContext(UserContext);
  const authId = auth.currentUser?.uid;

  let arrLevel = levelId;
  let arrLanguage = lanId;
  let arrLesson = lessonsId;

  const [chLan, setChLan] = useState("");
  const [chLevel, setChLevel] = useState("");
  const [chLesson, setChLesson] = useState("");


  const [show, setShow] = useState(false);
  const [showEnterGame, setShowEnterGame] = useState(false)
  const [betNumber, setBetNumber] = useState(0)

  const entry = bet[betNumber].entry
  const second = bet[betNumber].second
  const win = bet[betNumber].win
  
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
        photo: Userctx.currentUser.photo,
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

  const selectLan = (lan, i) => {
    setChLan(lan);
    getLevelId(lan);
  };

  const selectLevel = (level, i) => {
    setChLevel(level);
    getLessonId(level, chLan);
  };
 
  const selectLesson = (lesson, i) => {
    setChLesson(lesson);
    chGames(chLan, chLevel, lesson)
    
  };

  const joinGame = (game) => {
    game?.players.map((e, i) => {
      if(e?.state?.authId === authId || Userctx?.currentUser?.coins > entry) {
        join(state, game, chLan, chLevel, chLesson, entry, win , second)
        // Lessonctx.join(state, game, chLan, chLevel, chLesson, entry, win , second);
      } 
      else {
        setShowEnterGame(true)
      }
    })
  };

  const newGame = () => {
   
    if(Userctx?.currentUser?.coins >= entry) {
      createGame(state, chLan, chLevel, chLesson , entry , authId, win, second );
    } else {
      setShowEnterGame(true)
    }
  };

  

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
    <div className="relative flex text-white bg-baseBlack flex-col px-6 pt-6 pb-20 md:p-0">
       <ToolSidebar />
      <div className="flex m-auto py-2 md:mt-20 justify-between pb-4 w-full sm:w-[80%] md:w-[50%] xl:w-[30%]">
          <div className="flex items-center">
              <IoIosArrowBack size={20} onClick={() => history.push("/gameHome")}/>
              <p>Choose game</p>
          </div>
          <IoIosSettings onClick={() => history.push("/settings")} size={20}/>
      </div>
     
      
      <GameNavbar /> 
      <div className="flex text-white flex-col w-full md:w-[40%] pt-2 pb-28 px-2 m-auto">
          
          <p className="text-center">Choose language</p>
          <div className="h-[60px] flex my-1 justify-between rounded-2xl p-2 w-full bg-white ">
            {arrLanguage.map((lan, i) => (
              <div
                className={`${
                  chLan === lan ? "bg-baseBlue1 text-white" 
                  // lanActive === i ? "bg-baseBlue1 text-white" 

                  : ""
                } bg-helpGray text-baseBlack hover:text-white hover:bg-baseBlue1 rounded-[10px]  w-[90px] h-full flex justify-center items-center`}
                  //  className={`${lanActive===i ? css.laan : ""} ${css.nolan}`}
                key={i}
                onClick={() => selectLan(lan.id, i)}
              >
                {lan.id}
              </div>
            ))}
          </div>

          <p className="text-center mt-2">Choose level</p>
          <div className="h-[60px] flex justify-between my-1 rounded-2xl p-2 w-full bg-white">
            {arrLevel.map((level, i) => (
              <div
                className={`${
                  // levelActive === i
                  chLevel === level
                    ? " bg-baseBlue1 text-white"
                    : ""
                } flex justify-center items-center bg-helpGray text-baseBlack hover:scale-110 hover:bg-baseBlue1 hover:text-white w-[40px] full rounded-[5px]  `}
                key={i}
                onClick={() => selectLevel(level.id, i)}
                
              >
                {level.id}
              </div>
            ))} 
          </div>

          <p className="text-center mt-2">Choose lesson</p>
          <div className="h-[60px] flex flex-wrap gap-1 rounded-2xl bg-white my-1 p-2 w-full">
            {arrLesson.map((lesson, i) => (
              <div
                onClick={() => selectLesson(lesson.id, i)}
                key={i}
                className={`${
                  chLesson === lesson
                    ? " bg-baseBlue1 text-white"
                    : ""
                } flex justify-center items-center  bg-helpGray text-baseBlack hover:bg-baseBlue1 hover:text-white w-[40px] h-full rounded-[5px]  `}
                // className=" w-[20px] h-[20px] rounded-[5px] tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200"
              >
                {lesson.id}
              </div>
            ))}
          </div>

            {/* bet choose */}
          <div className="border border-helpGray p-2 my-3 rounded-2xl ">
            <div className="flex justify-center mb-3 text-white">Choose Bet</div>
            <div className="flex justify-around">
              <div><FaCircleMinus onClick={minusBet} className="text-baseBlue1" size={30}/></div>
              <div className="flex flex-col items-center">
                <div className="flex my-1">
                  <FaCoins size={20} color="yellow"/>
                  <p className="text-yellow-400 mx-3">WIN: {bet[betNumber].win}</p>
                </div>
                <p className="">Entry: {bet[betNumber].entry}</p>
              </div>
              <div><IoAddCircle onClick={addBet} className="text-baseBlue1" size={34}/></div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-baseBlack border border-helpGray rounded-2xl my-3 py-5 ">
          {games.map((game, i) => {
            const logoutPlayer =  game?.players.find(item => item.id === authId)
            // console.log(logoutPlayer.logoutGame)
            return (
              <div key={i}>
               {logoutPlayer?.logoutGame ? null : (
                <div
                  className="relative bg-white w-[120px] h-[90px] flex flex-col justify-between items-center p-1 m-2 rounded-xl"
                >
                  {/* <div className="absolute bg-baseColor rounded-[50%] w-[25px] h-[25px] text-white left-0">{time}</div> */}
                  <div className="text-[12px]">Players 4/{game.count}</div>
                  <div className="text-[12px]">{chLan} {chLevel} {chLesson}</div>
                  <button
                    className="bg-baseBlue1 text-white text-sm p-2 rounded-lg"
                    onClick={() => joinGame(game)}
                  >
                   Join game
                  </button>
                </div>
               )}
              </div>
              
            );
          })}
          </div>

          <button
            // onClick={() => newGame(chLan, chLevel, chLesson )}
            onClick={() => newGame()}
            className=" bg-baseBlue1 text-white  rounded-3xl p-3  hover:text-white hover:bg-baseBlue "
          >
            New Game
          </button>
      </div>

      {/* coin hvrehgvi ved */}
      <Modal show={showEnterGame} closeConfirm={() => setShowEnterGame(false)}>
        <div className="text-black">Not enough coins to enter the game</div>
      </Modal>
      
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
    </div>
   
  );
};

export default Game;


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
