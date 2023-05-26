import React, {useState, useContext, useEffect} from "react";
import css from "./style.module.css";
import Button from "../../../components/Button";

import Modal from "../../../components/General/Modal";
import { useHistory } from "react-router-dom";
import {DefaultPlayer as Video} from "react-html5video";
import "react-html5video/dist/styles.css";

import fairy from "../../../assets/video/1.mp4"
import VideoUpload from "../../../admin/component/VideoUpload";
import ImageUpload from "../../../admin/component/ImageUpload";
import { getAuth } from "firebase/auth";
import LessonContext from "../../../context/LessonContext";
import Grammar from "../../../admin/component/Grammar";
import NewWord from "../../../admin/component/NewWord";
import EditVideo from "../EditVideo";
const auth = getAuth();

const EditBase = (props) => {
    const id = props.filBase.id
    console.log(props.filBase.state.video)

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
    
    const updateDB = () => {
        ctx.updateDB(id)
    }
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
        closeConfirm()
        // history.push("/dashboard/addlesson/translate");
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
                language: {props.filBase.state.base.language} 
                <br/>
                {/* <input onChange={changeLanguage} type="text" name="Хэл" placeholder="Хэл сонгох"/> */}
                <select onChange={changeLanguage}>
                    <option>{props.filBase.state.base.language}</option>
                    <option>Англи хэл</option>
                    <option>Бусад</option>
                
                </select>
                <br/>  <br/>
            </div>

            <div className={css.row}>
                level: {props.filBase.state.base.level}
                <select onChange={changeLevel}>
                    <option>{props.filBase.state.base.level}</option> 
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
            lessonNumber: {props.filBase.state.base.lessonNumber} <br/>
            <input onChange={changeLessonNumber}  type="text" name="Хичээлийн дугаар" placeholder={props.filBase.state.base.lessonNumber}/>
            </div>
 
            <div className={css.row}>
            name: {props.filBase.state.base.name} <br/>
            <input onChange={changeName}  type="text"  placeholder={props.filBase.state.base.name}/>
            </div>
            
            <div className={css.row}> 
        
            <EditVideo data={props.filBase.state.video}/>
            {/* <ImageUpload data={props.filBase.state.image}/>
            <Grammar/>
            <NewWord/> */}
               
               
            </div>
            <Button text="Хадгалах" daragdsan={showConfirm}/> 
            <Button text="Засах" daragdsan={updateDB}/> 
    </div>
      
    )
}

export default EditBase;