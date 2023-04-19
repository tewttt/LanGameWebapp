import React, {useState, useContext} from "react";
import css from "./style.module.css";
import Button from "../../../components/Button";
import SendLessonContext from "../../../context/sendLessonContext";
import Modal from "../../../components/General/Modal";
import { useHistory } from "react-router-dom";


const AddLesson = (props) => {
    const SendLessonCtx = useContext(SendLessonContext);
    const history = useHistory();
    const [confirm , setConfirm] = useState(false);
    const [addlesson, setAddLesson] = useState(
        {
        language: "",
        level: "",
        lessonNumber: "",
        lessonName: "",
        video: "",
        photo: "",
        grammar: "",
        newWord: "",
      
    });
   const showConfirm = () => {
    setConfirm(true)
   };
   const closeConfirm = () => {
    setConfirm(false)
   };

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
        setAddLesson({ ...addlesson, photo: e.target.files[0]});
    };
   
    const changeGrammar = (e) => {
        setAddLesson({ ...addlesson, grammar: e.target.value});
    };
    const changeNewWord = (e) => {
        setAddLesson({ ...addlesson, newWord: e.target.value});
    }
   
    const save = () => {
        const base = {
                    language: addlesson.language,
                    level: addlesson.level,
                    lessonNumber: addlesson.lessonNumber,
                    name: addlesson.name,
                    video: addlesson.video,
                    photo: addlesson.photo,
                    grammar: addlesson.grammar,
                    newWord: addlesson.newWord,
          
        };
        alert("Үндсэн мэдээллийн хэсгийг амжилттай хадгаллаа"); 
        SendLessonCtx.saveBase(base);
       
        history.push("/dashboard/addlesson/translate");
        
      
       
    }

    return (
    <div className={css.body}>
        <Modal closeConfirm={closeConfirm} show={confirm} >
            <div style={{display: "flex", flexDirection: "column"}}>
            Хадгалахдаа итгэлтэй байна уу
            <div >
                <Button btn="Cont" text="Тийм" daragdsan={save}/>
                <Button  text="Үгүй" daragdsan={closeConfirm}/>
            </div>
          
            </div>
        </Modal>
            <div style={{color: "white", fontSize: "30px"}}> МЭДЭЭЛЭЛ</div>
            <div className={css.row} >
                language: {addlesson.language} 
                <br/>
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
                    <option>Сонгох</option> 
                    <option>A1</option>
                    <option>A2</option>
                    <option>B1</option>
                    <option>B1+</option>
                    <option>B2</option>
                    <option>B2+</option>
                
                </select>
                <br/>  <br/>
          
            </div>

            <div className={css.row}>
            lessonNumber: {addlesson.lessonNumber} <br/>
            <input onChange={changeLessonNumber} required type="text" name="Хичээлийн дугаар" placeholder="Хичээлийн дугаар"/>
            </div>
 
            <div className={css.row}>
            name: {addlesson.name} <br/>
            <input onChange={changeName} required type="text" name="Хичээлийн нэр" placeholder="Хичээлийн нэр"/>
            </div>
            
            <div className={css.row}> 
            video: {addlesson.video} <br/>
            <input onChange={changeVideo} required type="file" name="video" />
            </div>
           
           <div className={css.row}>
            photo: {addlesson.photo} <br/>
            <input onChange={changePhoto} required type="file" name="file" />
            </div>
         
            <div className={css.row}>
            grammar: {addlesson.grammar} <br/>
            <input onChange={changeGrammar} required type="file" name="Дүрэм" placeholder="Дүрэм сонгох"/>
            </div>

            <div className={css.row}>
            newWord: {addlesson.newWord} <br/>
            <input onChange={changeNewWord} required type="file" name="Шинэ үг" placeholder="Шинэ үг сонгох"/>
            </div>

          

            <Button text="Хадгалах" daragdsan={showConfirm}/> 
    </div>
      
    )
}

export default AddLesson;