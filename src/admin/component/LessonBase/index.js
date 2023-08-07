import React, {useState, useContext} from "react";
import css from "./style.module.css";
import Button from "../../../components/Button";
import Modal from "../../../components/General/Modal";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import LessonContext from "../../../context/LessonContext";
import VideoUpload from "../VideoUpload";
import ImageUpload from "../ImageUpload";
import TestEdit from "../../Edit/TestEditBase/TestEditBase";
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
        price: "",
        status: "",
        text: ""
    }); 
    
    const showConfirm = () => {setConfirm(true)};
    const closeConfirm = () => {setConfirm(false)};

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
    const changeStatus = (e) => {
        setAddLesson({ ...addlesson, status: e.target.value});
    };
    const changePrice = (e) => {
        setAddLesson({ ...addlesson, price: e.target.value});
    };
    const changeText= (e) => {
        setAddLesson({ ...addlesson, text: e.target.value});
    };
   
    const save = () => {
        const base = {
                    language: addlesson.language,
                    level: addlesson.level,
                    lessonNumber: addlesson.lessonNumber,
                    name: addlesson.name,
                    price: addlesson.price,
                    status: addlesson.status,
                    text: addlesson.text
        };
        // console.log(base)
        alert("Үндсэн мэдээллийн хэсгийг амжилттай хадгаллаа"); 
        ctx.saveBase(base);
        history.push("/dashboard/addlesson/translate");
    }

    return (
    <div className="bg-[#383030] w-[350px] h-[80%] flex flex-col m-auto md:m-0 text-gray-200">
        <Modal closeConfirm={closeConfirm} show={confirm} >
            <div style={{display: "flex", flexDirection: "column"}}>
            Хадгалахдаа итгэлтэй байна уу
                <div >
                    <Button btn="Cont" text="Тийм" daragdsan={save}/>
                    <Button  text="Үгүй" daragdsan={closeConfirm}/>
                </div>
          
            </div>
        </Modal>
        
        <div className="text-center"> МЭДЭЭЛЭЛ</div>
        <div className="flex justify-between my-1 mx-3" >
            <div>  language: {addlesson.language} </div>
            <select className="text-black rounded-[5px]" onChange={changeLanguage}>
                <option>Сонгох</option>
                <option>Англи хэл</option>
                <option>Солонгос хэл</option>
                <option>Монгол хэл</option>
            </select>
        </div>

        <div className="flex justify-between my-1 mx-3">
            <div> level: {addlesson.level}</div>
            <select className="text-black rounded-[5px]" onChange={changeLevel}>
                <option>Сонгох</option> 
                <option>A1</option>
                <option>A2</option>
                <option>B1</option>
                <option>B1+</option>
                <option>B2</option>
                <option>B2+</option>
            </select>
          
        </div>

        <div className="flex justify-between my-1 mx-3">
            <div> lessonNumber: {addlesson.lessonNumber}</div>
            <input className="w-[150px] h-[20px] rounded-[5px] mx-0" onChange={changeLessonNumber} required type="text" name="Хичээлийн дугаар" placeholder="Хичээлийн дугаар"/>
        </div>
 
        <div className="flex justify-between my-1 mx-3">
            <div>name: {addlesson.name} </div>
            <input className="w-[150px] h-[20px] rounded-[5px] mx-0" onChange={changeName} required type="text" name="Хичээлийн нэр" placeholder="Хичээлийн нэр"/>
        </div>

        <div className="flex justify-between my-1 mx-3">
            <div> Төлөв: {addlesson.status}</div>
            <select className="text-black rounded-[5px]" onChange={changeStatus}>
                <option>Сонгох</option> 
                <option>Төлбөртэй</option>
                <option>Төлбөргүй</option>
            </select>
           
        </div>

        <div className="flex justify-between my-1 mx-3">
            Үнэ: {addlesson.price} <br/>
            <input className="w-[150px] h-[20px] rounded-[5px] mx-0" onChange={changePrice} type="number" name="Хичээлийн үнэ" placeholder="Хичээлийн үнэ"/>
        </div>   
        <input className="w-[90%] m-3 h-[20px] rounded-[5px] flex justify-center items-center"
            multline
            numberOfLines={10}
            placeholder="text"
            required
            onChange={changeText}
        />
       
        <VideoUpload/>
        <ImageUpload/>
      
        <buttone className="w-[150px] h-[20px] bg-blue-500 flex text-[12px] justify-center items-centr m-auto"  onClick={showConfirm}>Хадгалах</buttone>
    </div>
)}

export default AddLesson;