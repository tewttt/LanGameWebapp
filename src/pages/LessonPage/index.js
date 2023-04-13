import React, { useContext, useState} from "react";
import css from "./style.module.css";
import Button from "../../components/Button";
import FetchLesssonContext  from "../../context/FetchLessonContext";
import Choice from "../../components/Choice";
import LessonList from "../../components/LessonList";
import Search from "../../components/Search";
import Toolbar from "../../components/Toolbar"
import { useEffect } from "react";

// https://www.youtube.com/watch?v=50vgpBDhEkY&list=PLEVTJcDnFDm9lpEEHTftRa9JSRV4jY_p9&index=12  
// Quiz app ийн заавар
const LessonPage = (props) => {
    // const ctx = useContext(FetchLesssonContext);

    // const [lanEng, setLanEng] = useState([]);
    // const [lanOth, setLanOth] = useState([]);

    // const [lessonA1, setLessonA1] = useState([]);
    // const [lessonA2, setLessonA2] = useState([]);
    // const [lessonB1, setLessonB1] = useState([]);
    // const [lessonB1add, setLessonB1add] = useState([]);
    // const [lessonB2, setLessonB2] = useState([]);
    // const [lessonB2add, setLessonB2add] = useState([]);
  
   

    const [searchField, setSearchField] = useState();


    const onsearchChanged = (event) => {
        setSearchField ( event.target.value);
    };
   
    // useEffect(() => {
    //     const filteredLanEng = ctx.state.lesson.filter(
    //         (item) => item[1].base.language === "Англи хэл"
    //     );
    //     const filteredLanOth = ctx.state.lesson.filter(
    //         (item) => item[1].base.language === "Бусад"
    //     );
    //     const filteredLessonA1 = ctx.state.lesson.filter(
    //         (item) => item[1].base.level === "A1"
    //     );
    //     const filteredLessonA2 = ctx.state.lesson.filter(
    //         (item) => item[1].base.level === "A2"
    //     );
    //     const filteredLessonB1 = ctx.state.lesson.filter(
    //         (item) => item[1].base.level === "B1"
    //     );
    //     const filteredLessonB1add= ctx.state.lesson.filter(
    //         (item) => item[1].base.level === "B1+"
    //     );
    //     const filteredLessonB2 = ctx.state.lesson.filter(
    //         (item) => item[1].base.level === "B2"
    //     );
    //     const filteredLessonB2add = ctx.state.lesson.filter(
    //         (item) => item[1].base.level === "B2+"
    //     );
    //     setLanEng(filteredLanEng);
    //     setLanOth(filteredLanOth);

    //    setLessonA1(filteredLessonA1);
    //    setLessonA2(filteredLessonA2);
    //    setLessonB1(filteredLessonB1);
    //    setLessonB1add(filteredLessonB1add);
    //    setLessonB2(filteredLessonB1);
    //    setLessonB2add(filteredLessonB2add);
    // }, [])
   
    
   

    return (

        <div className={css.lessonPage}>
           <Toolbar/>
           
            <Choice/>
          {/* {
            lanEng ? ( <LessonList lessons={lanEng}/>): ""
          } */}

            {/* <LessonList lessons={lanEng}/>
            <LessonList lessons={lanOth}/> */}

            {/* <LessonList lessons={lessonA1}/>
            <LessonList lessons={lessonA2}/>
            <LessonList lessons={lessonB1}/>
            <LessonList lessons={lessonB1add}/>
            <LessonList lessons={lessonB2}/>
            <LessonList lessons={lessonB2add}/> */}
        
            
        </div>
    )
}

export default LessonPage;