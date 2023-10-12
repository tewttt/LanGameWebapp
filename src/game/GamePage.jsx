import React, { useState, useContext, useEffect } from "react";
import ToolSidebar from "../components/ToolSidebar";
import { useHistory, useParams } from "react-router-dom";
import GameContext from "../context/GameContext";
import UserContext from "../context/UserContext";
import LessonContext from "../context/LessonContext";
import { getAuth } from "firebase/auth";
import Modal from "../components/General/Modal";

// toglogchdiin id g GameContext ru ilgeeh , medeelliig tsugluulah
// New game towchin dr darhad Togloh hvselt ilgeesen hvmvvsiig GameContext neg togloomiin collectiond tsugluulah
// New game huudas ruu shiljih
// Togloom duussanii daraa UserContext dr game iin data vvsgeh
// Rule bichih
// firebase admin sudlah
const auth = getAuth();
const Game = () => {
  const [state, setState] = useState({});
  const Lessonctx = useContext(LessonContext);
  const Gamectx = useContext(GameContext);
  const Userctx = useContext(UserContext);
  const authId = auth.currentUser?.uid;

  const [chChoose, setChoose] = useState("");
  const [chooseActive, setChooseActive] = useState(0);

  const [chLan, setChLan] = useState("");
  const [lanActive, setLanActive] = useState("");

  const [chLevel, setChLevel] = useState("");
  const [levelActive, setLevelActive] = useState("");

  const [chLesson, setChLesson] = useState("");
  const [lessonActive, setLessonActive] = useState("");

  // const [LessonCount, setLessonCount] = useState([]);

  // useEffect(() => {
  //   for (let i = 0; i <= Lessonctx.lessons.length; i++) {
  //     // console.log(i)
  //     setLessonCount(i);
  //   }
  // });
  
  // const lesson = [LessonCount];

  const [lesson, setLesson] = useState(Array(30).fill(null))
  const arrChoose = ["Online", "Friends"];
  const arrLanguage = ["Англи хэл", "Монгол хэл", "Солонгос хэл"];
  const arrLevel = ["A1", "A2", "B1", "B1+", "B2", "B2+"];

  const history = useHistory();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Userctx.currentUser) {
   
      const newData = {
        name: Userctx.currentUser.name,
        email: Userctx.currentUser.email,
        authId: Userctx.currentUser.authId,
      };
      setState(newData);
    }
  }, [Userctx.currentUser]);



  const join = (game) => {
    Gamectx.join(state, game);
  };

  const closeConfirm = () => {
    setShow(false);
    // setModal({show:false,game:null})
  };
  const showConfirm = (game) => {
    // {show:true, selectedGame: game}
    setShow({ ...show, show: true, game: game });
  };
  // Шинэ тоглоом үүсгэж байна
  const newGame = (chLan, chLevel, chLesson) => {
    if (chLan === "") {
    }
    Gamectx.createGame(state, chLan, chLevel, chLesson);
  };
  const selectLevel = (level, i) => {
    setLevelActive(i);
    setChLevel(level);
  };
  const selectLan = (lan, i) => {
    setLanActive(i);
    setChLan(lan);
  };
  const selectChoose = (lan, i) => {
    setChooseActive(i);
    setChoose(lan);
  };
  const selectLesson = (lesson, i) => {
    setLessonActive(i);
    setChLesson(lesson);
  };

  console.log(chLan);
  console.log(chLevel);
  console.log(chLesson);
  return (
    <div className="flex flex-col justify-center">
      <ToolSidebar />

      <div className="flex flex-col  border border-baseBlue  mt-16 max-w-[400px] h-screen m-auto justify-around items-center">
        <div className="flex flex-col justify-around ">
          <div className="flex justify-around bg-baseColor rounded-2xl  my-3 py-5 w-[100%]">
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
          </div>
          <div className="flex justify-center bg-baseColor rounded-2xl my-3  py-5 w-full">
            {arrLanguage.map((lan, i) => (
              <div
                className={`${
                  lanActive === i ? "border border-blue-700 text-blue-600" : ""
                } text-[12px]    transform hover:scale-110 hover:border-blue-500 hover:text-blue-500 text-blue-200 border border-blue-200 rounded-[10px] py-1 px-2 mx-3 my-1 w-[95px] h-[30px] flex justify-center items-center`}
                //    className={`${lanActive===i ? css.laan : ""} ${css.nolan}`}
                key={i}
                onClick={() => selectLan(lan, i)}
              >
                {lan}
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
                onClick={() => selectLevel(level, i)}
                $
              >
                {level}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-10 bg-baseColor rounded-2xl my-3 py-5 w-full">
            {lesson.map((lesson, i) => (
              <div
                onClick={() => selectLesson(lesson, i)}
                key={i}
                className={`${
                  lessonActive === i
                    ? "border border-blue-700 text-blue-600"
                    : ""
                } flex justify-center items-center tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200 w-[40px] h-[40px] rounded-[5px]  `}
                // className=" w-[20px] h-[20px] rounded-[5px] tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200"
              >
                {lesson}
              </div>
            ))}
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
          {Gamectx.games.map((game, i) => {
            // console.log(game);
            return (
              <div className="border border-blue-700 text-blue-600 w-[85px] h-[50px] flex flex-col justify-center items-center p-3 m-2 rounded-xl">
                <div className="text-[12px]">
                  Players 3/{game.players.length}
                </div>

                <div
                  className=" text-xl hover:text-red-500"
                  onClick={() => showConfirm(game)}
                  // onClick={() => join(game[1])}
                >
                  <p>join</p>
                </div>
              </div>
            );
          })}
          {/* {Object.entries(Gamectx.games).map((game, i) => (
                        <div  className="border border-blue-700 text-blue-600 w-[85px] h-[50px] flex flex-col justify-center items-center p-3 m-2 rounded-xl">
                            <div className="text-[12px]">Players 3/{game[1].players.length}</div>
                              
                            <div 
                                className=" text-xl hover:text-red-500"
                                onClick={ ()=>showConfirm(game)}
                                // onClick={() => join(game[1])}
                            >
                                <p>join</p>
                               
                            </div>
                        </div>
                    ))} */}
        </div>

        <button
          onClick={() => newGame(chLan, chLevel, chLesson)}
          className=" bg-black rounded-3xl p-3 border border-baseBlue text-white hover:border-blue-800 hover:bg-baseBlue "
        >
          New Game
        </button>
        {/* <button onClick={join} className=" bg-black rounded-3xl p-3 border border-baseBlue text-white hover:border-blue-800 hover:bg-baseBlue ">add player Game</button> */}
      </div>
    </div>
  );
};

export default Game;

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
