import React, {useState, useContext} from "react";
import css from "./style.module.css";
import axios from "../../axios";
import Button from "../../components/Button";
import SendLessonContext from "../../context/sendLessonContext";
import Exam from "../../components/Exam";
import Translate from "../../components/Translate";

const AddLesson = (props) => {
    const ctx = useContext(SendLessonContext);

    const [addlesson, setAddLesson] = useState({
        language: "",
        level: "",
        lessonNumber: "",
        name: "",
        video: "",
        photo: "",
        grammar: "",
        newWord: "",
        translate: "",
        exam: "",
    });
   
    const changeLanguage = (e) => {
        setAddLesson({ ...addlesson, language: e.target.value});
    };
    const changeLevel = (e) => {
        setAddLesson({ ...addlesson, level: e.target.value});
    };
    const changeLessonNumber = (e) => {
        setAddLesson({ ...addlesson, lessonNumber: e.target.value});
    };
    const changeName = (e) => {
        setAddLesson({ ...addlesson, name: e.target.value});
    };
    const changeVideo = (e) => {
        setAddLesson({ ...addlesson, video: e.target.value});
    };
    const changePhoto = (e) => {
        setAddLesson({ ...addlesson, photo: e.target.value});
    };
   
    const changeGrammar = (e) => {
        setAddLesson({ ...addlesson, grammar: e.target.value});
    };
    const changeNewWord = (e) => {
        setAddLesson({ ...addlesson, newWord: e.target.value});
    }
    const changeTranslate = (e) => {
        setAddLesson({ ...addlesson, translate: e.target.value});
    };
    
    const changeExam = (e) => {
        setAddLesson({ ...addlesson, exam: e.target.value});
    };

    const save = () => {
        const NewLesson = {
            language: addlesson.lesson,
            level: addlesson.level,
            lessonNumber: addlesson.lessonNumber,
            name: addlesson.name,
            video: addlesson.video,
            photo: addlesson.photo,
            grammar: addlesson.grammar,
            newWord: addlesson.newWord,
            translate: addlesson.translate,
            exam: addlesson.exam,
        };

        axios
            .post("addLesson.json", NewLesson)
          
            .then(result => {
                alert("Амжилттай илгээлээ"); 
                // console.log(result.data);
                
              
            })
            .catch(err => {
                alert("Илгээхэд алдаа гарлаа");
                console.log(err.response.data)  //серверээс ирж байгаа алдаа
            });

        // ctx.sendLesson(NewLesson);
    }
   

    const game = () => {
        props.history.push("/");
   };
   const lesson = () => {
    props.history.push("/lesson");
};

    return (
        <div className={css.text}>
            AddLesson
              <div>
            
            <Button daragdsan={lesson} text="Хичээл үзэх"/>
            <Button daragdsan={game} text="Тоглох"/>
            </div>
            <div className={css.body}>

            <div className={css.row} >
            language: {addlesson.language}
            {/* <input onChange={changeLanguage} type="text" name="Хэл" placeholder="Хэл сонгох"/> */}
            <select onChange={changeLanguage}>
                <option>Сонгох</option>
                <option>Англи хэл</option>
                <option>Бусад</option>
              
            </select>
            <br/>  <br/>
            </div>

            <div className={css.row}>
            level: {addlesson.level}
            <select onChange={changeLevel}>
                <option>A1</option>
                <option>А2</option>
                <option>B1</option>
                <option>B1 +</option>
                <option>B2</option>
                <option>B2 +</option>
              
            </select>
            <br/>  <br/>
            {/* <input onChange={changeLevel} type="text" name="Түвшин" placeholder="Түвшин сонгох"/> */}
            </div>

            <div className={css.row}>
            lessonNumber: {addlesson.lessonNumber}
            <input onChange={changeLessonNumber} type="text" name="Хичээлийн дугаар" placeholder="Хичээлийн дугаар"/>
            </div>

            <div className={css.row}>
            name: {addlesson.name}
            <input onChange={changeName} type="text" name="Хичээлийн нэр" placeholder="Хичээлийн нэр"/>
            </div>
            
            <div className={css.row}>
            video: {addlesson.video}
            <input onChange={changeVideo} type="file" name="video" />
            </div>
           
           <div className={css.row}>
            photo: {addlesson.photo}
            <input onChange={changePhoto} type="file" name="file" />
            </div>
         
            <div className={css.row}>
            grammar: {addlesson.grammar}
            <input onChange={changeGrammar} type="file" name="Дүрэм" placeholder="Дүрэм сонгох"/>
            </div>

            <div className={css.row}>
            newWord: {addlesson.newWord}
            <input onChange={changeNewWord} type="file" name="Шинэ үг" placeholder="Шинэ үг сонгох"/>
            </div>

            <div className={css.row}>
            translate: {addlesson.translate}
            <Translate/>
            {/* <input onChange={changeTranslate} type="text" name="Монголоос Англи Орчуулга" placeholder="Орчуулга"/> */}
            </div>

            {/* <div className={css.row}>
            exam: {addlesson.exam}
            <Exam/>
            </div> */}

            <Button text="Хадгалах" daragdsan={save}/> 
            </div>
        </div>
    )
}

export default AddLesson;