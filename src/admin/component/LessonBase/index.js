import React, {useState, useContext, useEffect} from "react";
import css from "./style.module.css";
import Button from "../../../components/Button";

import Modal from "../../../components/General/Modal";
import { useHistory } from "react-router-dom";

import fairy from "../../../assets/video/1.mp4"
import VideoUpload from "../VideoUpload";
import ImageUpload from "../ImageUpload";
import { getAuth } from "firebase/auth";
import LessonContext from "../../../context/LessonContext";
import Grammar from "../Grammar";
import NewWord from "../NewWord";
const auth = getAuth();

const AddLesson = () => {

    const ctx = useContext(LessonContext)
    
    const history = useHistory();
    const [confirm , setConfirm] = useState(false);
    const [addlesson, setAddLesson] = useState(
        {
        language: "",
        level: "",
        lessonNumber: "",
        lessonName: "", 
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
        };
        alert("Үндсэн мэдээллийн хэсгийг амжилттай хадгаллаа"); 
        ctx.saveBase(base);
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
            <VideoUpload />
            {/* <ImageUpload />
            <Grammar/>
            <NewWord/> */}
               
               
            </div>
            <Button text="Хадгалах" daragdsan={showConfirm}/> 
    </div>
      
    )
}

export default AddLesson;