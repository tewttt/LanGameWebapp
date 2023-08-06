import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import Button from "../Button";
import LessonList from "../LessonList";
import LessonContext from "../../context/LessonContext";
import Spinner from "../General/Spinner";


const Choice = () => {
   
  const ctx = useContext(LessonContext)
  
    // console.log(ctx.lessonList)
  
    const arrLanguage =["Англи хэл", "Монгол хэл", "Солонгос хэл"]
    const [chLan, setChLan] = useState("");

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
 
    // console.log(lessonA1)

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

    const selectLevel = (level) => {
        setChLevel(level)
    }
    const selectLan = (lan) => {
        setChLan(lan)
    }
    
    return (
        <div className=" flex flex-col m-1 w-ful items-center">
            {ctx.state.loading &&  <Spinner/>}
        <div className="text-gray-400">Хэл сонгох</div>
        <div className="flex justify-center">
           {arrLanguage.map((lan,i) => (
            <div
                className= "text-[12px] sm:text-[18px] hover:border-blue-300 hover:text-blue-300 text-blue-500 border border-blue-500 rounded-[10px] py-1 px-2 mx-3 my-1 w-[90px] h-[30px] sm:w-[130px] sm:h-[40px] flex justify-center items-center"
                // className={[...css.tab, {color: lan ? "red" :"black"} ]}
                active
                key={i}
                onClick={() => selectLan(lan)} 
            >
                {lan}
            </div> 
           ))}
        </div>
                {/* <div>Хэл сонгох</div> */}
                {/* <div className={css.language}> 
                
                    <div className={css.tab} active
                    isSelected={chLan === "eng" ? "css.tab:active" : ""}
                    onClick={() => setChLan("eng")}>Англи хэл</div>
                 
                    <div className={css.tab} onClick={() => setChLan("oth")}>Бусад хэл</div>
                    
                </div> */}
            

            <div className={css.level}>
                <div className="text-gray-400"> Түвшин сонгох</div>

 
               <div className=" flex justify-center">
                    {arrLevel.map((level, i) => (
                        <div  
                            // isSelected = {level === chLevel}
                            className="flex justify-center items-center hover:border-blue-300 hover:text-blue-300 border border-blue-500 m-2 text-blue-500 w-[40px] h-[40px] rounded-[5px] md:w-[60px] md:h-[60px] "
                         
                            key={i}
                            onClick={() => selectLevel(level)}
                        >
                           {level}
                        </div>
                    ))}

                    {/* <div className={css.tabLevel} onClick={() => setChLevel("A1")}> A1</div>
                    <div className={css.tabLevel} onClick={() => setChLevel("A2")}> A2</div>
                    <div className={css.tabLevel} onClick={() => setChLevel("B1")}> B1</div>
                    <div className={css.tabLevel} onClick={() => setChLevel("B1add")}> B1+</div>
                    <div className={css.tabLevel} onClick={() => setChLevel("B2")}> B2</div>
                    <div className={css.tabLevel} onClick={() => setChLevel("B2add")}> B2+</div>
                 */}
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
    )
}
export default Choice;