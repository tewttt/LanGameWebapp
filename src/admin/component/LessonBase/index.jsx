import React, {useState, useContext} from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/General/Modal";
import { useHistory } from "react-router-dom";
import LessonContext from "../../../context/LessonContext";
import VideoUpload from "../VideoUpload";
import ImageUpload from "../ImageUpload";

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
        alert("Үндсэн мэдээллийн хэсгийг амжилттай хадгаллаа"); 
        ctx.saveBase(base);
        history.push("/dashboard/translate");
    }

    return (
    <div className="flex flex-col ">
        <div className="bg-baseColor  w-[350px] h-[80%] flex flex-col md:flex md:flex-row md:h-[500px] md:w-[400px]  md:my-5 text-gray-200 md:p-10">
            <Modal closeConfirm={closeConfirm} show={confirm} >
                <div style={{display: "flex", flexDirection: "column"}}>
                Хадгалахдаа итгэлтэй байна уу
                    <div >
                        <Button btn="Cont" text="Тийм"  daragdsan={save}/>
                        <Button  text="Үгүй" daragdsan={closeConfirm}/>
                    </div>
            
                </div>
            </Modal>
            <div className="md:flex flex-col md:w-[320px] ">
                <div className="text-center md:mb-10"> МЭДЭЭЛЭЛ</div>
                <div className="flex justify-between my-1 mx-3" >
                    <div>  language: {addlesson.language} </div>
                    <select className="text-black rounded-[5px] w-[170px]" onChange={changeLanguage}>
                        <option>Сонгох</option>
                        <option>English</option>
                        <option>Korea</option>
                        <option>Mongolia</option>
                    </select>
                </div>

                {addlesson.language === "Англи хэл" ? (
                    <div className=" flex justify-between my-1 mx-3">
                        <div> level: {addlesson.level}</div>
                        <select className="text-black rounded-[5px] w-[170px]" onChange={changeLevel}>
                            <option>Сонгох</option> 
                            <option>A1</option>
                            <option>A2</option>
                            <option>B1</option>
                            <option>B1+</option>
                            <option>B2</option>
                            <option>B2+</option>
                        </select>
                    </div>
                ) : addlesson.language === "Солонгос хэл" ? (
                    <div className="flex justify-between my-1 mx-3">
                        <div> level: {addlesson.level}</div>
                        <select className="text-black rounded-[5px] w-[170px]" onChange={changeLevel}>
                            <option>Сонгох</option> 
                            <option>A1</option>
                            <option>A2</option>
                            <option>B1</option>
                            <option>B1+</option>
                                    <option>B2</option>
                            <option>B2+</option>
                        </select>
                    </div>
                    
                ) : (
                    <div className="flex justify-between my-1 mx-3">
                        <div> level: {addlesson.level}</div>
                        <select className="text-black rounded-[5px] w-[170px]" onChange={changeLevel}>
                            <option>Сонгох</option> 
                            <option>A1</option>
                            <option>A2</option>
                            <option>B1</option>
                            <option>B1+</option>
                            <option>B2</option>
                            <option>B2+</option>
                        </select>
                    </div>
                )}
              

                <div className="flex justify-between my-1 mx-3 ">
                    <div> lessonNumber: {addlesson.lessonNumber}</div>
                    <input className="w-[170px] h-[20px] rounded-[5px] mx-0 text-gray-900" onChange={changeLessonNumber} required type="text" name="Хичээлийн дугаар" placeholder="Хичээлийн дугаар"/>
                </div>
        
                <div className="flex justify-between my-1 mx-3">
                    <div>name: {addlesson.name} </div>
                    <input className="w-[170px] h-[20px] rounded-[5px] mx-0 text-gray-900" onChange={changeName} required type="text" name="Хичээлийн нэр" placeholder="Хичээлийн нэр"/>
                </div>

                <div className="flex justify-between my-1 mx-3">
                    <div> Төлөв: {addlesson.status}</div>
                    <select className="text-black rounded-[5px] w-[170px]" onChange={changeStatus}>
                        <option>Сонгох</option> 
                        <option>Төлбөртэй</option>
                        <option>Төлбөргүй</option>
                    </select>
                
                </div>

                <div className="flex justify-between my-1 mx-3">
                    Үнэ: {addlesson.price} <br/>
                    <input className="w-[170px] h-[20px] rounded-[5px] mx-0 text-gray-900" onChange={changePrice} type="number" name="Хичээлийн үнэ" placeholder="Хичээлийн үнэ"/>
                </div>   
                <input className="w-[300px] m-3 h-[20px] rounded-[5px] flex justify-center items-center text-gray-900"
                    multline
                    numberOfLines={10}
                    placeholder="text"
                    required
                    onChange={changeText}
                />
            </div>
            <div className="md:flex md:flex-row" >
                <VideoUpload/>
                <ImageUpload/>
            </div>
        
        </div>
        <button className="w-[150px] h-[20px] bg-blue-400 hover:bg-blue-500 flex text-[12px] justify-center items-center m-auto"  onClick={showConfirm}>Хадгалах</button>
    </div>
)}

export default AddLesson;