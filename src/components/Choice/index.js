import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import Button from "../Button";
import LessonList from "../LessonList";
import FetchLessonContext from "../../context/FetchLessonContext";
import Spinner from "../General/Spinner";

const Choice = () => {
    const ctx = useContext(FetchLessonContext);
    // console.log(ctx.state.lesson)

    const [chLan, setChLan] = useState("");
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
        const filteredLanEng = ctx.state.lesson.filter(
            (item) => item[1].base.language === "Англи хэл"
            
        );
        
        const filteredLanOth = ctx.state.lesson.filter(
            (item) => item[1].base.language === "Бусад"
        );
       
        const filteredLessonA1 = ctx.state.lesson.filter(
            (item) => item[1].base.level === "A1"
        );
        const filteredLessonA2 = ctx.state.lesson.filter(
            (item) => item[1].base.level === "A2"
        );
        const filteredLessonB1 = ctx.state.lesson.filter(
            (item) => item[1].base.level === "B1"
        );
        const filteredLessonB1add= ctx.state.lesson.filter(
            (item) => item[1].base.level === "B1+"
        );
        const filteredLessonB2 = ctx.state.lesson.filter(
            (item) => item[1].base.level === "B2"
        );
        const filteredLessonB2add = ctx.state.lesson.filter(
            (item) => item[1].base.level === "B2+"
        );
        setLanEng(filteredLanEng);
        setLanOth(filteredLanOth);

       setLessonA1(filteredLessonA1);
       setLessonA2(filteredLessonA2);
       setLessonB1(filteredLessonB1);
       setLessonB1add(filteredLessonB1add);
       setLessonB2(filteredLessonB1);
       setLessonB2add(filteredLessonB2add);
    }, [chLan, chLevel])
    
    return (
        <div className={css.body}>
            {ctx.state.loading &&  <Spinner/>}
           
                {/* <div>Хэл сонгох</div> */}
                <div className={css.language}> 
                
                    <div className={css.tab} onClick={() => setChLan("eng")}>Англи хэл</div>
                    {/* {active ? css.activeTab : null} */}
                    {/* `css${tab === "eng" ? "activeTab" : ""}` */}
                    <div className={css.tab} onClick={() => setChLan("oth")}>Бусад хэл</div>
                   
                </div>
            

            <div className={css.level}>
                <div> Түвшин сонгох</div>

               <div className={css.levelbody}>
                    <div className={css.tab} onClick={() => setChLevel("A1")}> A1</div>
                    <div className={css.tab} onClick={() => setChLevel("A2")}> A2</div>
                    <div className={css.tab} onClick={() => setChLevel("B1")}> B1</div>
                    <div className={css.tab} onClick={() => setChLevel("B1add")}> B1+</div>
                    <div className={css.tab} onClick={() => setChLevel("B2")}> B2</div>
                    <div className={css.tab} onClick={() => setChLevel("B2add")}> B2+</div>
                </div>
            </div >
            
            { chLan === "eng" ? (
                            <div>
                                {
                                    chLevel === "A1" ? ( <div><LessonList lessons={lessonA1}/></div>) : 
                                    <div><LessonList lessons={lessonA2}/></div>
                                }
                                 
                            </div>
                        ) : (
                            <div>
                                <LessonList lessons={lanOth}/>
                            </div>
                        )}
{/* 
        { switch (eng) {
            case value:
                
                break;
         
            default:
                break;
         }} */}




           
        </div>
    )
}
export default Choice;