import React, { useState, useContext} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import css from "./style.module.css"
import { useHistory } from "react-router-dom";
import useLesson from "../../hook/useLesson";
import LessonContext from "../../context/LessonContext";
import { getAuth } from "firebase/auth";
import Modal from "../../components/General/Modal";
import backImage from "../../assets/logo/backgroundSmall.png"

const auth = getAuth();
const Teacher = () => {
    const { addTeacher , cancelTeacher} = useLesson()
    const ctx = useContext(UserContext)
    const LessonCtx = useContext(LessonContext)
    let arrLevel =  LessonCtx.levelId;
    let arrLanguage =  LessonCtx.lanId;
    let Lesson =  LessonCtx.userLesson;

    const arrLesson = Lesson.filter(
        // item => console.log(item?.userAuthId)
     item =>  item?.userAuthId === auth?.currentUser?.uid
    );
    const [lanActive, setLanActive] = useState("");
    const [chLan, setChLan] = useState("");
    const [levelActive, setLevelActive] = useState("");
    const [chLevel, setChLevel] = useState("");
    const [show, setShow] = useState(false)
  

    const selectLan = (lan, i) => {
        setLanActive(i);
        setChLan(lan);
        LessonCtx.Level(lan);
      };
    
      const selectLevel = (level, i) => {
        setLevelActive(i);
        setChLevel(level);
        LessonCtx.Lessons(level, chLan); 
        LessonCtx.userLessons(level, chLan); 
      };
  
    const history = useHistory();
    const [teacher , setData] = useState({
        language: "",
        experience: "",
    })
    const add = () => {
        addTeacher(teacher)
        setShow(false)
    }

    const handleChange = (event) => {
        setData({ ...teacher, [event.target.name]: event.target.value })
    }

    const view = (number) => {
        LessonCtx.Lesson(number, chLan, chLevel);
        // console.log(id)
        history.push(`/lesson/${chLan}${chLevel}${number}`);
    };
    const edit = (number) => {
        LessonCtx.Lesson(number, chLan, chLevel);
        // console.log(id)
        history.push(`/edit/${chLan}${chLevel}${number}`);
    };
    const remove = (number) => {
        LessonCtx.deleteDB(chLan, chLevel, number );
    };
    
    return (
        <div className="bg-baseBlack text-white h-screen relative">
            <ToolSidebar/>
            <div 
                className="bg-cover absolute top-0 left-0 -z-20 opacity-80 w-screen h-screen"
                style={{backgroundImage: `url(${backImage})`}}>
            </div>
            {ctx?.currentUser?.teacherStatus ? 
            (
            <div className="flex flex-col pt-10 px-6 items-center h-full md:pt-20">
                <div 
                    className="bg-baseBlue1 hover:bg-blue-700 py-2 px-4 text-white rounded-2xl text-2xl font-bold "
                    onClick={() => history.push("/addlesson")}>Хичээл нэмэх</div>
                <div className="flex justify-center  my-2">
                    {arrLanguage.map((lan, i) => {
                    return (
                        <div
                        className={`${lanActive === i ? css.laan : ""} ${css.nolan}`}
                        key={i}
                        onClick={() => selectLan(lan.id, i)}
                        >
                        {lan.id}
                        </div>
                    );
                    })}
                </div>
                <div className="flex justify-center my-2">
                    {arrLevel.map((e, i) => {
                        return (
                        <div
                            className={`${levelActive === i ? css.laan : ""} ${css.nolan}`}
                            key={i}
                            onClick={() => selectLevel(e.id, i)}
                            >
                            {e.id}
                        </div>
                        );
                        })}
                </div>
                <div className="flex justify-center ">
                    {arrLesson.map((e, i) => {
                        // setNumber(e.lessonNumber)
                        // console.log(e)
                        return (
                            <div
                            className="m-1"
                            // className={`${levelActive === i ? css.laan : ""} ${css.nolan}`}
                            key={i}
                            >
                                <div
                                    className={css.hoverButton}
                                    // className="flex flex-col py-3 items-center border border-blue-500 w-[200px]  hover:border-blue-300  rounded-[5px] "
                                    >
                                    <div className="flex mb-2">
                                        <div className="mx-3"> {e.language}</div>
                                        <div className="mx-3">{e.level}</div>
                                        <div className="mx-3">№{e.lessonNumber}</div>
                                    </div>

                                    <div
                                        onClick={() => view(e.lessonNumber)}
                                        className="text-white w-[140px] h-[40px] bg-blue-500 rounded-[5px] my-3 flex justify-center items-center text-[20px] p-2 hover:bg-blue-600 hover:scale-110 "
                                    >
                                        Үзэх
                                    </div>
                                    <div
                                        onClick={() => edit(e.lessonNumber)}
                                        className="text-white w-[140px] h-[40px] bg-blue-500 rounded-[5px] my-3 flex justify-center items-center text-[20px] p-2 hover:bg-blue-600 hover:scale-110 "
                                    >
                                        Edit
                                    </div>
                                    <div
                                        onClick={() => remove(e.lessonNumber)}
                                        className="text-white w-[140px] h-[40px] bg-blue-500 rounded-[5px] my-3 flex justify-center items-center text-[20px] p-2 hover:bg-blue-600 hover:scale-110 "
                                    >
                                        Delete
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            ) : ( 
            <div className="md:pt-20 pt-10 px-6 flex flex-col w-[300px] m-auto">
            <Modal show={show} >
                <div className="flex flex-col justify-between">
                    <p className="text-red-500 text-lg my-3 text-center">Submit a request to become a teacher</p>
                    <div className="flex justify-between">
                        <button  
                            className="bg-green-500 py-3 px-5 rounded-2xl text-white"
                            onClick={() => setShow(false)}>NO</button>
                        <button 
                        className="bg-red-500 text-white py-3 px-5 rounded-2xl"
                        onClick={add}>Yes , send request</button>
                    </div>
                </div>
            </Modal>
            {ctx?.currentUser?.teacherMessage === "request" ? (
                null
            ) : (
                <div className="flex flex-col justify-center">
                    <p className="text-center pb-4 font-bold">TEACHER</p>
                    <div className="mb-2 text-justify w-full">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium hic magni nemo dolore assumenda architecto perferendis vitae vero omnis! Quam!</div>
                        <div className=" w-full mt-4">
                            <p>Хичээл заах хэл: </p>
                            <select name="language" onChange={handleChange} className="w-full text-baseBlack p-1 rounded-xl">
                                <option>choose</option>
                                <option>English</option>
                                <option>Mongolia</option>
                                <option>Korea</option>
                            </select>
                        </div>
                        <div className=" w-full  ">
                            <p>Хичээл заасан туршлага</p>
                            <input 
                                className="p-1 my-1 rounded-xl w-full"
                                type="text" 
                                name="experience" 
                                placeholder="wrire..." 
                                onChange={handleChange}/>
                        </div>
                        <div className=" w-full ">
                            <p>Хэлний түвшин</p>
                            <input 
                                className="p-1 my-1 rounded-xl w-full"
                                type="text" 
                                name="experience" 
                                placeholder="write..." 
                                onChange={handleChange}/>
                        </div>
                </div>          
            )}
                
            {ctx?.currentUser?.teacherMessage === "request" ? (
            <div className="bg-helpGray text-baseBlack p-4 my-2 rounded-2xl font-bold">
                <p className="text-center pb-4 font-bold">TEACHER</p>
                <p>Sent a request to become a teacher</p>
                <button 
                onClick={() => cancelTeacher()}
                className="bg-red-500 w-full py-2 px-4 text-white rounded-2xl my-2">Cancellation of request</button>
            </div>) 
            : (
                <button onClick={() => setShow(true)} className={css.towch}>
                    <p className="text-sm">Send request a teacher</p>
                </button>
            )}
            </div>
            )}
          
        </div>
    )
}

export default Teacher;



    // useEffect(() => {
    //     const profile = ctx.userList.find(
    //         // item => console.log(item.authId)
    //         item => item.authId === auth?.currentUser?.uid
    //     )
    //     setId(profile?.id)
    //    }, [])