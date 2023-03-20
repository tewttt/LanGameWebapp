import React, {useState, useContext} from "react";
import css from "./style.module.css";
import axios from "../../axios";
import Button from "../../components/Button";
import SendLessonContext from "../../context/sendLessonContext";

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
              <div>
            AddLesson
            <Button daragdsan={lesson} text="Хичээл үзэх"/>
            <Button daragdsan={game} text="Тоглох"/>
            </div>
            
            <div className={css.body}>
            language: {addlesson.language}
            <input onChange={changeLanguage} type="language" name="Хэл" placeholder="Хэл сонгох"/>

            level: {addlesson.level}
            <input onChange={changeLevel} type="level" name="Түвшин" placeholder="Түвшин сонгох"/>

            lessonNumber: {addlesson.lessonNumber}
            <input onChange={changeLessonNumber} type="lessonNumber" name="Хичээлийн дугаар" placeholder="Хичээлийн дугаар"/>

            name: {addlesson.name}
            <input onChange={changeName} type="name" name="Хичээлийн нэр" placeholder="Хичээлийн нэр"/>

            video: {addlesson.video}
            <input onChange={changeVideo} type="video" name="Видео" placeholder="Видео"/>

            photo: {addlesson.photo}
            <input onChange={changePhoto} type="photo" name="Зураг" placeholder="Зураг сонгох"/>

            grammar: {addlesson.grammar}
            <input onChange={changeGrammar} type="grammar" name="Дүрэм" placeholder="Дүрэм сонгох"/>

            newWord: {addlesson.newWord}
            <input onChange={changeNewWord} type="newWord" name="Шинэ үг" placeholder="Шинэ үг сонгох"/>

            translate: {addlesson.translate}
            <input onChange={changeTranslate} type="translate" name="Монголоос Англи Орчуулга" placeholder="Орчуулга"/>

            exam: {addlesson.exam}
            <input onChange={changeExam} type="exam" name="Шалгалт" placeholder="Шалгалт"/>

            <Button text="Хадгалах" daragdsan={save}/> 
            </div>
        </div>
    )
}

export default AddLesson;