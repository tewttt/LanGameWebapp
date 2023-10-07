import React, {useState, useContext,useEffect} from "react";
import ToolSidebar from "../components/ToolSidebar";
import { useHistory, useParams } from "react-router-dom";
import GameContext from "../context/GameContext";
import UserContext from "../context/UserContext";
import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";

// toglogchdiin id g GameContext ru ilgeeh , medeelliig tsugluulah
// New game towchin dr darhad Togloh hvselt ilgeesen hvmvvsiig GameContext neg togloomiin collectiond tsugluulah
// New game huudas ruu shiljih
// Togloom duussanii daraa UserContext dr game iin data vvsgeh
// Rule bichih
// firebase admin sudlah
const auth = getAuth();
const Game = () => {
    const [state, setState] = useState({});
    const Gamectx = useContext(GameContext)
    const Userctx = useContext(UserContext)
    const authId = auth.currentUser?.uid
   
    const [chChoose, setChoose] = useState("");
    const [chooseActive, setChooseActive] = useState(0);
    const [chLan, setChLan] = useState("");
    const [lanActive, setLanActive] = useState(0);
    const [chLevel, setChLevel] = useState("");
    const [levelActive, setLevelActive] = useState(0);
    const [chLesson, setChLesson] = useState("");
    const [lessonActive, setLessonActive] = useState(0);

    const [lesson, setLesson] = useState(Array(30).fill(null))
    const arrLanguage =["Англи хэл", "Монгол хэл", "Солонгос хэл"]
    const arrLevel = ["A1", "A2", "B1", "B1+", "B2", "B2+"]
    const arrChoose = ["Online", "Friends"]

    const history = useHistory();

    // Хэрэглэгчийн датаг татаж авч байгаа
    useEffect(() => {
        const data = Userctx.userList.find(
            // item => console.log(item)
            item => item.id === authId
        )
        const newData = {
            email: data.email,
            authId: data.authId,
        }
        setState(newData)
    },[])  

    const join = (id, length) => {
        Gamectx.join(state, id , length)
    }
    // Шинэ тоглоом үүсгэж байна
    const newGame = () => {
        Gamectx.createGame(state)
        history.push("/newGame")
    }
    const selectLevel = (level,i) => {
        setLevelActive(i)
        setChLevel(level)
    }
    const selectLan = (lan, i) => {
        setLanActive(i)
        setChLan(lan)
    }
    const selectChoose = (lan, i) => {
        setLanActive(i)
        setChLan(lan)
    }
    const selectLesson = (lesson, i) => {
        setLessonActive(i)
        setChLesson(lesson)
    }
    return (
       
        <div className="flex flex-col justify-center"> 
            <ToolSidebar/>
            <div className="flex flex-col  border border-baseBlue  mt-16 max-w-[400px] h-screen m-auto justify-around items-center">
                <div className="flex flex-col justify-around " >
                    <div className="flex justify-around bg-baseColor rounded-2xl  my-3 py-5 w-[100%]">

                        {arrChoose.map((ch, i) => (
                            <div
                            key={i}
                            onClick={() => selectChoose(ch, i)}
                            className={`${chooseActive===i ? "border border-blue-700 text-blue-600":""} text-[12px]   transform hover:scale-110 hover:border-blue-500 hover:text-blue-500 text-blue-200 border border-blue-200 rounded-[10px] py-1 px-2 mx-3 my-1 w-[95px] h-[30px]  flex justify-center items-center`}
                            >{ch}</div>
                        ))}
                    </div>
                    <div className="flex justify-center bg-baseColor rounded-2xl my-3  py-5 w-full">
                        {arrLanguage.map((lan,i) => (
                            <div
                            className={`${lanActive===i ? "border border-blue-700 text-blue-600":""} text-[12px]    transform hover:scale-110 hover:border-blue-500 hover:text-blue-500 text-blue-200 border border-blue-200 rounded-[10px] py-1 px-2 mx-3 my-1 w-[95px] h-[30px] flex justify-center items-center`}
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
                                className={`${levelActive===i ? "border border-blue-700 text-blue-600":""} flex justify-center items-center tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200 w-[40px] h-[40px] rounded-[5px]  `}
                                key={i}
                                onClick={() => selectLevel(level,i)}$
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
                                className={`${lessonActive===i ? "border m-2 border-blue-700 text-blue-600 w-[20px] h-[20px] rounded-[5px]  ":"w-[20px] h-[20px] rounded-[5px] tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200"} `}
                                // className=" w-[20px] h-[20px] rounded-[5px] tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200"
                                >
                            {lesson}
                            </div>
                        ))}
                    </div>
                    
                </div>
                <div className="grid grid-cols-4 bg-baseColor rounded-2xl w-full my-3 py-5 ">
                    {Object.entries(Gamectx.games).map((game, i) => (
                        // console.log(game[1].id)
                        // console.log(game[1].players.length)
                        <div  className="border border-blue-700 text-blue-600 w-[85px] h-[50px] flex flex-col justify-center items-center p-3 m-2 rounded-xl">
                            <div className="text-[12px]">Players 3/{game[1].players.length}</div>
                            <div 
                                className=" text-xl hover:text-red-500"
                                onClick={() => join (game[1].id , game[1].players.length)}
                            >Join
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={newGame} className=" bg-black rounded-3xl p-3 border border-baseBlue text-white hover:border-blue-800 hover:bg-baseBlue ">New Game</button>
                {/* <button onClick={join} className=" bg-black rounded-3xl p-3 border border-baseBlue text-white hover:border-blue-800 hover:bg-baseBlue ">add player Game</button> */}
            
            
            </div>
        </div>
      
    )
}

export default Game;