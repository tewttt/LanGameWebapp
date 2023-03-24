import React, { useContext, useState} from "react";
import css from "./style.module.css";
import Button from "../../components/Button";
import FetchLesssonContext  from "../../context/FetchLessonContext";
import Choice from "../../components/Choice";
import LessonList from "../../components/LessonList";
import Search from "../../components/Search";


const LessonPage = (props) => {
    const ctx = useContext(FetchLesssonContext);
    const [searchField, setSearchField] = useState();
   
    const onsearchChanged = (event) => {
        setSearchField ( event.target.value);
    };
   
    
   
    
    const game = () => {
        props.history.push("/");
   };
   const addlesson = () => {
    props.history.push("/addlesson");
}; 
// console.log(searchField)
console.log(ctx.state.lesson);




// const filteredLesson = ctx.state.lesson.filter( el => el.name.includes(searchField));
// const filteredLesson = lesson.filter( el => el.name().includes(searchField));
    return (

        <div className={css.lessonPage}>
            {/* hailtiin utga : {searchField} */}

            <div className={css.body}>
                <Button daragdsan={game} text="Тоглох"/>
                <Button daragdsan={addlesson} text="Хичээл нэмэх"/>
                
            </div>
            {/* <Search onSearch={onsearchChanged}/> */}
            <Choice/>
            <LessonList lessons={ctx.state.lesson}/>
            {/* <LessonList lessons={filteredLesson}/> */}

             {/* { ctx.state.lesson.map(el => <Lesson key={el[0]} Lesson={el[1]}/>)} */}

           
            
        </div>
    )
}

export default LessonPage;