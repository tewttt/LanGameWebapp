import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import LessonList from "../LessonList";
import LessonContext from "../../context/LessonContext";
import Spinner from "../General/Spinner";

const Choice = () => {   
    const ctx = useContext(LessonContext)
    const arrLanguage =["Англи хэл", "Монгол хэл", "Солонгос хэл"]
    const [chLan, setChLan] = useState("");
    const [lanActive, setLanActive] = useState("");
    const [levelActive, setLevelActive] = useState("");
    const arrLevel = ["A1", "A2", "B1", "B1+", "B2", "B2+"]
    const [chLevel, setChLevel] = useState("");

    const [lanEng, setLanEng] = useState([]);
    const [lanOth, setLanOth] = useState([]);

    const [lessonA1, setLessonA1] = useState([]);
    const [lessonA2, setLessonA2] = useState([]);
    const [lessonB1, setLessonB1] = useState([]);
    const [lessonB1add, setLessonB1add] = useState([]);
    const [lessonB2, setLessonB2] = useState([]);
    const [lessonB2add, setLessonB2add] = useState([]);
  
    useEffect(() => {
        const filteredLanEng = ctx.lessonList.filter(
            (item) => item.state.base.language === "Англи хэл"
            // (item) => console.log(item.state.base.language)
        );
        const filteredLanOth = ctx.lessonList.filter(
            (item) =>item.state.base.language === "Бусад"
        );
        const filteredLessonA1 = ctx.lessonList.filter(
            //  (item) => console.log(item.state.base.level)
            (item) => item.state.base.level === "A1"
        );
        const filteredLessonA2 = ctx.lessonList.filter(
            (item) => item.state.base.level === "A2"
        );
        const filteredLessonB1 = ctx.lessonList.filter(
            (item) => item.state.base.level === "B1"
        );
        const filteredLessonB1add= ctx.lessonList.filter(
            (item) => item.state.base.level === "B1+"
        );
        const filteredLessonB2 = ctx.lessonList.filter(
            (item) => item.state.base.level === "B2"
        );
        const filteredLessonB2add = ctx.lessonList.filter(
            (item) => item.state.base.level === "B2+"
        );
        setLanEng(filteredLanEng);
        setLanOth(filteredLanOth);

        setLessonA1(filteredLessonA1);
        setLessonA2(filteredLessonA2);
        setLessonB1(filteredLessonB1);
        setLessonB1add(filteredLessonB1add);
        setLessonB2(filteredLessonB2);
        setLessonB2add(filteredLessonB2add);
    }, [chLan, chLevel])

    const selectLevel = (level,i) => {
        setLevelActive(i)
        setChLevel(level)
    }
    const selectLan = (lan, i) => {
        setLanActive(i)
        setChLan(lan)
    }
    
    return (
        <div className=" flex flex-col m-1 w-ful items-center">
            {ctx.state.loading &&  <Spinner/>}
            <div className="text-gray-400">Хэл сонгох</div>
            <div className="flex justify-center">
                {arrLanguage.map((lan,i) => (
                    <div
                        className={`${lanActive===i ? "border border-blue-700 text-blue-600":""} text-[12px] sm:text-[18px]   transform hover:scale-110 hover:border-blue-500 hover:text-blue-500 text-blue-200 border border-blue-200 rounded-[10px] py-1 px-2 mx-3 my-1 w-[90px] h-[30px] sm:w-[130px] sm:h-[40px] flex justify-center items-center`}
                        key={i}
                        onClick={() => selectLan(lan, i)} 
                    >
                        {lan}
                    </div> 
                ))}
            </div>
               
            <div className={css.level}>
                <div className="text-gray-400"> Түвшин сонгох</div>
                <div className=" flex justify-center">
                    {arrLevel.map((level, i) => (
                        <div  
                            className={`${levelActive===i ? "border border-blue-700 text-blue-600":""} flex justify-center items-center tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200 w-[40px] h-[40px] rounded-[5px] md:w-[60px] md:h-[60px] `}
                            key={i}
                            onClick={() => selectLevel(level,i)}$
                        >
                           {level}
                        </div>
                    ))}
                </div>
            </div >
            
            { chLan === "Англи хэл" ? (
                <div>
                    {
                        chLevel === "A1" ? ( 
                            <div><LessonList lessons={lessonA1}/></div>) 
                        : chLevel === "A2" ? (
                            <div><LessonList lessons={lessonA2}/></div>
                        ) : chLevel === "B1" ? (
                            <div><LessonList lessons={lessonB1}/></div>
                        ) : chLevel === "B1add" ? (
                            <div><LessonList lessons={lessonB1add}/></div>
                        ) : chLevel === "B2" ? (
                            <div><LessonList lessons={lessonB2}/></div>
                        ) : (
                            <div><LessonList lessons={lessonB2add}/></div>
                        )
                    }
                </div>
                ) :  (
                    <div>
                        <LessonList lessons={lanOth}/>
                    </div>
                )}
        </div>
)}
export default Choice;