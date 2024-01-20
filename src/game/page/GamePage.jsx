import React, { useState, useContext, useEffect } from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import LessonContext from "../../context/LessonContext";
import { getAuth } from "firebase/auth";
import Modal from "../../components/General/Modal";
import { IoAddCircle } from "react-icons/io5";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCoins } from "react-icons/fa";
import GameNavbar from "../components/GameNavbar";

const auth = getAuth();
let intervalIds = [];
const TIME = 600
const Game = () => {
  const bet = [
    {win: 1400, entry: 500, second: 500},
    {win: 5600, entry: 2000 , second: 2000},
    {win: 28000, entry: 10000 , second: 10000},
    {win: 140000, entry: 50000, second: 50000},
    {win: 560000, entry: 200000 , second: 200000},
  ]

  
  const [time, setTime] = useState(TIME)
  const [state, setState] = useState({});
  const Lessonctx = useContext(LessonContext);
  const Userctx = useContext(UserContext);
  const authId = auth.currentUser?.uid;
  const [getPlayers, setGetPlayers] = useState([])
  let arrLevel = Lessonctx.levelId;
  let arrLanguage = Lessonctx.lanId;
  let arrLesson = Lessonctx.lessonsId;
 
  const [chChoose, setChoose] = useState("");
  const [chooseActive, setChooseActive] = useState(0);

  const [chLan, setChLan] = useState("");
  const [lanActive, setLanActive] = useState(0);

  const [chLevel, setChLevel] = useState("");
  const [levelActive, setLevelActive] = useState(0);

  const [chLesson, setChLesson] = useState("");
  const [lessonActive, setLessonActive] = useState(0);

  const arrChoose = ["Online", "Friends"];
  const [show, setShow] = useState(false);
  const [showEnterGame, setShowEnterGame] = useState(false)
  const [betNumber, setBetNumber] = useState(0)

  const entry = bet[betNumber].entry
  const second = bet[betNumber].second
  const win = bet[betNumber].win

  
  // console.log(coinStatus)
  // console.log(Userctx.currentUser.coins)
  
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
    game?.players.map((e, i) => {
      if(e?.state?.authId === authId || Userctx?.currentUser?.coins > entry) {
      // if( Userctx?.currentUser?.coins > entry) {
        Lessonctx.join(state, game, chLan, chLevel, chLesson, entry, win , second);
      } 
      else {
        setShowEnterGame(true)
      }
    })
  };

  const newGame = () => {
   
    if(Userctx?.currentUser?.coins >= entry) {
      Lessonctx.createGame(state, chLan, chLevel, chLesson , entry , authId, win, second );
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
    <div className="flex flex-col justify-center h-screen">
      <ToolSidebar />
      {/* <GameNavbar/>  */}
      <div className="flex flex-col mt-24 w-[400px] rounded-t-3xl bg-gradient-to-b from-baseColor to-hpink m-auto">
      <GameNavbar className=""/> 
          <div className="flex justify-center rounded-t-3xl py-5 w-full 
          bg-gradient-to-b from-baseColor to-hpink
          ">
            {arrLanguage.map((lan, i) => (
              <div
                className={`${
                  lanActive === i ? "border border-baseColor bg-white text-baseColor" : ""
                } text-[12px] transform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 rounded-[10px] py-1 px-2 mx-3 my-1 w-[95px] h-[30px] flex justify-center items-center`}
                //    className={`${lanActive===i ? css.laan : ""} ${css.nolan}`}
                key={i}
                onClick={() => selectLan(lan.id, i)}
              >
                {lan.id}
              </div>
            ))}
          </div>

          <div className=" flex justify-center bg-gradient-to-b from-baseColor to-hpink rounded-t-3xl py-5 w-full">
            {arrLevel.map((level, i) => (
              <div
                // className={`${levelActive===i ? css.newlevel : css.nolevel} ${css.nolevel}`}
                className={`${
                  levelActive === i
                    ? "border border-baseColor bg-white text-baseColor"
                    : ""
                } flex justify-center items-center tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border w-[40px] h-[40px] rounded-[5px]  `}
                key={i}
                onClick={() => selectLevel(level.id, i)}
                $
              >
                {level.id}
              </div>
            ))} 
          </div>

          <div className="grid grid-cols-10 rounded-t-3xl py-5 w-full bg-gradient-to-b from-baseColor to-hpink">
            {arrLesson.map((lesson, i) => (
              <div
                onClick={() => selectLesson(lesson.id, i)}
                key={i}
                className={`${
                  lessonActive === i
                    ? "border border-baseColor bg-white text-baseColor"
                    : ""
                } flex justify-center items-center tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 w-[40px] h-[40px] rounded-[5px]  `}
                // className=" w-[20px] h-[20px] rounded-[5px] tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200"
              >
                {lesson.id}
              </div>
            ))}
          </div>
            {/* bet choose */}
          <div className="bg-gradient-to-b from-baseColor to-hpink">
            <div className="flex justify-center mb-3 text-white">Choose Bet</div>
            <div className="flex justify-around">
              <div><FaCircleMinus onClick={minusBet} className="text-baseColor" size={30}/></div>
              <div>
                < FaCoins size={20} color="yellow"/>
                <div className="text-yellow-400">WIN: {bet[betNumber].win}</div>
                <div className="">Entry: {bet[betNumber].entry}</div>
              </div>
              <div><IoAddCircle onClick={addBet} className="text-baseColor" size={34}/></div>
            </div>
          </div>

          <div className="grid grid-cols-4 bg-hpink rounded-2xl my-3 py-5 ">
          {Lessonctx.games.map((game, i) => {
            const logoutPlayer =  game?.players.find(item => item.id === authId)
            // console.log(logoutPlayer.logoutGame)
            return (
              <div>
               {logoutPlayer?.logoutGame ? null : (
                <div
                  key={i}
                  className="relative bg-baseColor text-hpink w-[90px] h-[60px] flex flex-col justify-center items-center p-3 m-2 rounded-xl"
                >
                  <div className="absolute bg-baseColor rounded-[50%] w-[25px] h-[25px] text-white left-0">{time}</div>
                  <div className="text-[12px]">Players 4/{game.count}</div>
                
                  <div
                    className=" text-xl hover:text-red-500"
                    onClick={() => join(game)}
                  >
                    <p className="text-base text-center font-bold">Join game</p>
                  </div>
                </div>
               )}
              </div>
              
            );
          })}
          </div>

          <button
            // onClick={() => newGame(chLan, chLevel, chLesson )}
            onClick={() => newGame()}
            className=" bg-black rounded-3xl p-3 border border-baseBlue text-white hover:border-blue-800 hover:bg-baseBlue "
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
    // </GameStore>
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
