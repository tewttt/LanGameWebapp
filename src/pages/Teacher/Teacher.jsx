import React, { useState, useContext} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import css from "./style.module.css"
import { useHistory } from "react-router-dom";
import useLesson from "../../hook/useLesson";
import LessonContext from "../../context/LessonContext";
import { getAuth } from "firebase/auth";
import Modal from "../../components/General/Modal";
const auth = getAuth();
const Teacher = () => {
    const { addTeacher} = useLesson()
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
        <div >
            <ToolSidebar/>
            {ctx?.currentUser?.teacherStatus ? 
            (
            <div className="flex flex-col pt-20">
                <div onClick={() => history.push("/addlesson")}>Хичээл нэмэх</div>
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
            <div className="pt-20 flex flex-col w-[300px] m-auto">
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
                <div className="mb-6 w-full">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium hic magni nemo dolore assumenda architecto perferendis vitae vero omnis! Quam!</div>
                <div className="border border-baseColor w-full rounded-xl p-2 my-2">
                    <p>Хичээл заах хэл: </p>
                    <select name="language" onChange={handleChange} className="w-full">
                        <option>choose</option>
                        <option>English</option>
                        <option>Mongolia</option>
                        <option>Korea</option>
                    </select>
                </div>
                <div className="border border-baseColor w-full rounded-xl p-2 my-2">
                    <p>Хичээл заасан туршлага</p>
                    <input 
                        className=""
                        type="text" 
                        name="experience" 
                        placeholder="Жилээр бичих" 
                        onChange={handleChange}/>
                </div>
                <div className="border border-baseColor w-full rounded-xl p-2 my-2">
                    <p>Хэлний түвшин</p>
                    <input 
                        className=""
                        type="text" 
                        name="experience" 
                        placeholder="Жилээр бичих" 
                        onChange={handleChange}/>
                </div>

                {ctx?.currentUser?.message === "request" ? (<div>Request a teacher</div>) : (
                    <button onClick={() => setShow(true)} className={css.towch}
                        >
                        <p className="text-sm">Request a teacher</p>
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