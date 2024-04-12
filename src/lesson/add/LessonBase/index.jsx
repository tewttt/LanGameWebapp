import React, {useState, useContext} from "react";
import Modal from "../../../components/General/Modal";
import { useHistory } from "react-router-dom";
import LessonContext from "../../../context/LessonContext";
import VideoUpload from "../VideoUpload";
import ImageUpload from "../../../lesson/add/ImageUpload";

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
        text: "",
        coin: "",
        name: ""
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
        setAddLesson({ ...addlesson, price: e.target.value , coin: e.target.value*40});
    
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
                    text: addlesson.text,
                    coin: addlesson.coin
        };
        // alert("Үндсэн мэдээллийн хэсгийг амжилттай хадгаллаа"); 
        ctx.saveBase(base);
        history.push("/addlesson/translate");
    }

    return (
    <div className="md:pb-10 text-white m-auto md:w-[80%] lg:w-[60%]">
        <div className="mt-3  m-auto">
            <Modal closeConfirm={closeConfirm} show={confirm} >
                <div className="text-baseBlack ">
                    <p className="text-center">Are you sure you want to save?</p>
                    <div className="flex justify-around mt-4">
                        <button className="py-2 px-10 bg-green-500 text-white rounded-2xl" onClick={save}>Yes</button> 
                        <button className="py-2 px-10 bg-red-500 text-white rounded-2xl" onClick={closeConfirm}>No</button>
                    </div>
                </div>
            </Modal>
            <div className="">
                <div className="text-center"> МЭДЭЭЛЭЛ</div>
                <div className="flex justify-between my-1 mx-3" >
                    <div>  language: {addlesson.language} </div>
                    <select className="text-black rounded-[5px] p-1 w-3/4" onChange={changeLanguage}>
                        <option>Сонгох</option>
                        <option>English</option>
                        <option>Korea</option>
                        <option>Mongolia</option>
                        <option>Japan</option>
                        <option>Chinese</option>
                    </select>
                </div>

                {addlesson.language === "Англи хэл" ? (
                    <div className=" flex justify-between my-1 mx-3">
                        <div> level: {addlesson.level}</div>
                        <select className="text-black rounded-[5px] p-1 w-3/4" onChange={changeLevel}>
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
                        <select className="text-black rounded-[5px] p-1 w-3/4" onChange={changeLevel}>
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
                        <select className="text-black rounded-[5px] p-1 w-3/4" onChange={changeLevel}>
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
                    <input className="p-1 rounded-[5px] mx-0 text-gray-900" onChange={changeLessonNumber} required type="number" name="Хичээлийн дугаар" placeholder="Хичээлийн дугаар"/>
                </div>
        
                <div className="flex flex-wrap justify-between my-1 mx-3">
                    <div>name:  </div>
                    <textarea className="w-3/4 p-1 rounded-[5px] mx-0 text-gray-900" onChange={changeName} required type="text" name="Хичээлийн нэр" placeholder="Хичээлийн нэр"/>
                </div>

                <div className="flex justify-between my-1 mx-3">
                    <div> Төлөв: {addlesson.status}</div>
                    <select className="text-black w-3/4 p-1 rounded-[5px]" onChange={changeStatus}>
                        <option>Сонгох</option> 
                        <option>Төлбөртэй</option>
                        <option>Төлбөргүй</option>
                    </select>
                
                </div>

                <div className="flex justify-between my-1 mx-3">
                    Amount : {addlesson.price}₮ <br/>
                    <input className="p-1 w-3/4 rounded-[5px] mx-0 text-gray-900" onChange={changePrice} type="number" name="Хичээлийн үнэ" placeholder="Хичээлийн үнэ"/>
                </div>   
                <div className="flex justify-between my-1 mx-3">
                    Coin: {addlesson.price * 40} <br/>
                </div>   
                <textarea className="w-full m-3 p-1 rounded-[5px] flex justify-center items-center text-gray-900"
                    // multline
                    // numberOfLines={10}
                    placeholder="text"
                    required
                    onChange={changeText}
                />
            </div>
            <div className="flex flex-col" >
                <VideoUpload/>
                {/* <ImageUpload/> */}
            </div>
        
        </div>
        <button className="w-full md:w-1/2 bg-baseBlue1 hover:bg-blue-500 flex p-3 justify-center items-center m-auto"  onClick={showConfirm}>Хадгалах</button>
    </div>
)}

export default AddLesson;