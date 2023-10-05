import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import LessonList from "../LessonList";
import LessonContext from "../../context/LessonContext";
import Spinner from "../General/Spinner";
import BackgroundAnimation from "../../UI/BackgroundAnimation";

const Choice = () => {   
    const ctx = useContext(LessonContext)
    const arrLanguage =["Англи хэл", "Монгол хэл", "Солонгос хэл"]
    const arrLevel = ["A1", "A2", "B1", "B1+", "B2", "B2+"]

    const [chLan, setChLan] = useState("");
    const [lanActive, setLanActive] = useState("");
    const [levelActive, setLevelActive] = useState("");
    const [chLevel, setChLevel] = useState("");

    const [lessonA1, setLessonA1] = useState([]);
    const [lessonA2, setLessonA2] = useState([]);
    const [lessonB1, setLessonB1] = useState([]);
    const [lessonB1add, setLessonB1add] = useState([]);
    const [lessonB2, setLessonB2] = useState([]);
    const [lessonB2add, setLessonB2add] = useState([]);
    const eng = [lessonA1, lessonA2, lessonB1, lessonB1add, lessonB2, lessonB2add]

    const [lessonKorA1, setLessonKorA1] = useState([]);
    const [lessonKorA2, setLessonKorA2] = useState([]);
    const [lessonKorB1, setLessonKorB1] = useState([]);
    const [lessonKorB1add, setLessonKorB1add] = useState([]);
    const [lessonKorB2, setLessonKorB2] = useState([]);
    const [lessonKorB2add, setLessonKorB2add] = useState([]);

    const [lessonMonA1, setLessonMonA1] = useState([]);
    const [lessonMonA2, setLessonMonA2] = useState([]);
    const [lessonMonB1, setLessonMonB1] = useState([]);
    const [lessonMonB1add, setLessonMonB1add] = useState([]);
    const [lessonMonB2, setLessonMonB2] = useState([]);
    const [lessonMonB2add, setLessonMonB2add] = useState([]);
  
    useEffect(() => {
        const filteredLessonA1 = ctx.englishList.filter(
            //  (item) => console.log(item.state.base.level)
            (item) => item.state.base.level === "A1"
        );
        const filteredLessonA2 = ctx.englishList.filter(
            (item) => item.state.base.level === "A2"
        );
        const filteredLessonB1 = ctx.englishList.filter(
            (item) => item.state.base.level === "B1"
        );
        const filteredLessonB1add= ctx.englishList.filter(
            (item) => item.state.base.level === "B1+"
        );
        const filteredLessonB2 = ctx.englishList.filter(
            (item) => item.state.base.level === "B2" 
        );
        const filteredLessonB2add = ctx.englishList.filter(
            (item) => item.state.base.level === "B2+"
        );

        setLessonA1(filteredLessonA1);
        setLessonA2(filteredLessonA2);
        setLessonB1(filteredLessonB1);
        setLessonB1add(filteredLessonB1add);
        setLessonB2(filteredLessonB2);
        setLessonB2add(filteredLessonB2add);

        const filteredLessonKorA1 = ctx.koreaList.filter(
            //  (item) => console.log(item.state.base.level)
            (item) => item.state.base.level === "A1"
        );
        const filteredLessonKorA2 = ctx.koreaList.filter(
            (item) => item.state.base.level === "A2"
        );
        const filteredLessonKorB1 = ctx.koreaList.filter(
            (item) => item.state.base.level === "B1"
        );
        const filteredLessonKorB1add= ctx.koreaList.filter(
            (item) => item.state.base.level === "B1+"
        );
        const filteredLessonKorB2 = ctx.koreaList.filter(
            (item) => item.state.base.level === "B2"
        );
        const filteredLessonKorB2add = ctx.koreaList.filter(
            (item) => item.state.base.level === "B2+"
        );

        setLessonKorA1(filteredLessonKorA1);
        setLessonKorA2(filteredLessonKorA2);
        setLessonKorB1(filteredLessonKorB1);
        setLessonKorB1add(filteredLessonKorB1add);
        setLessonKorB2(filteredLessonKorB2);
        setLessonKorB2add(filteredLessonKorB2add);

        const filteredLessonMonA1 = ctx.mongoliaList.filter(
            //  (item) => console.log(item.state.base.level)
            (item) => item.state.base.level === "A1"
        );
        const filteredLessonMonA2 = ctx.koreaList.filter(
            (item) => item.state.base.level === "A2"
        );
        const filteredLessonMonB1 = ctx.koreaList.filter(
            (item) => item.state.base.level === "B1"
        );
        const filteredLessonMonB1add= ctx.koreaList.filter(
            (item) => item.state.base.level === "B1+"
        );
        const filteredLessonMonB2 = ctx.koreaList.filter(
            (item) => item.state.base.level === "B2"
        );
        const filteredLessonMonB2add = ctx.koreaList.filter(
            (item) => item.state.base.level === "B2+"
        );

        setLessonMonA1(filteredLessonMonA1);
        setLessonMonA2(filteredLessonMonA2);
        setLessonMonB1(filteredLessonMonB1);
        setLessonMonB1add(filteredLessonMonB1add);
        setLessonMonB2(filteredLessonMonB2);
        setLessonMonB2add(filteredLessonMonB2add);
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
        <div className=" flex flex-col mt-10 m-1 w-ful items-center">
           
            {ctx.state.loading &&  <Spinner/>}
            <div className={css.text}>Хэл сонгох</div>
           
            <div className="flex justify-center">
                {arrLanguage.map((lan,i) => (
                    <div
                        // className={`${lanActive===i ? "border border-blue-700 text-blue-600":""} text-[12px] sm:text-[18px]   transform hover:scale-110 hover:border-blue-500 hover:text-blue-500 text-blue-200 border border-blue-200 rounded-[10px] py-1 px-2 mx-3 my-1 w-[90px] h-[30px] sm:w-[130px] sm:h-[40px] flex justify-center items-center`}
                       className={`${lanActive===i ? css.laan : ""} ${css.nolan}`}
                        key={i}
                        onClick={() => selectLan(lan, i)} 
                    >
                        {lan}
                    </div> 
                ))}
            </div> 

            {chLan ? 
             (
                <div className={css.level}>
                <div className="text-gray-400 m-2"> Түвшин сонгох</div>
                <div className=" flex justify-center">
                    {arrLevel.map((level, i) => (
                        <div  
                        className={`${levelActive===i ? css.newlevel : css.nolevel} ${css.nolevel}`}
                            // className={`${levelActive===i ? "border border-blue-700 text-blue-600":""} flex justify-center items-center tranform hover:scale-110 hover:border-blue-500 hover:text-blue-500 border border-blue-200 m-2 text-blue-200 w-[40px] h-[40px] rounded-[5px] md:w-[60px] md:h-[60px] `}
                            key={i}
                            onClick={() => selectLevel(level,i)}$
                        >
                           {level}
                        </div>
                    ))}
                </div>
            </div >
             ) : ("")
            }
  
            { chLan === "Англи хэл" ? (
                <div>
                    {/* { eng.map((lessons, i) => (
                         <div><LessonList lessons={lessons} lang={chLan}/></div>
                    ))} */}
                        {
                         chLevel === "A1" ? ( 
                            <div><LessonList lessons={lessonA1} lang={chLan}/></div>) 
                         : chLevel === "A2" ? (
                            <div><LessonList lessons={lessonA2} lang={chLan}/></div>
                         ) : chLevel === "B1" ? (
                             <div><LessonList lessons={lessonB1} lang={chLan}/></div>
                         ) : chLevel === "B1add" ? (
                             <div><LessonList lessons={lessonB1add} lang={chLan}/></div>
                         ) : chLevel === "B2" ? (
                             <div><LessonList lessons={lessonB2} lang={chLan}/></div>
                         ) : (
                             <div><LessonList lessons={lessonB2add} lang={chLan}/></div>
                        )}
                    
                </div>
            ) : chLan === "Монгол хэл"  ? (
                <div>
                {
                    chLevel === "A1" ? ( 
                        <div><LessonList lessons={lessonMonA1} lang={chLan}/></div>) 
                    : chLevel === "A2" ? (
                        <div><LessonList lessons={lessonMonA2} lang={chLan}/></div>
                    ) : chLevel === "B1" ? (
                        <div><LessonList lessons={lessonMonB1} lang={chLan}/></div>
                    ) : chLevel === "B1add" ? (
                        <div><LessonList lessons={lessonMonB1add} lang={chLan}/></div>
                    ) : chLevel === "B2" ? (
                        <div><LessonList lessons={lessonMonB2} lang={chLan}/></div>
                    ) : (
                        <div><LessonList lessons={lessonMonB2add} lang={chLan}/></div>
                    )
                }
            </div>
            ) : (
                <div>
                {
                    chLevel === "A1" ? ( 
                        <div><LessonList lessons={lessonKorA1} lang={chLan}/></div>) 
                    : chLevel === "A2" ? (
                        <div><LessonList lessons={lessonKorA2} lang={chLan}/></div>
                    ) : chLevel === "B1" ? (
                        <div><LessonList lessons={lessonKorB1} lang={chLan}/></div>
                    ) : chLevel === "B1add" ? (
                        <div><LessonList lessons={lessonKorB1add} lang={chLan}/></div>
                    ) : chLevel === "B2" ? (
                        <div><LessonList lessons={lessonKorB2} lang={chLan}/></div>
                    ) : (
                        <div><LessonList lessons={lessonKorB2add} lang={chLan}/></div>
                    )
                }
            </div>
            ) }
        </div>
)}
export default Choice;