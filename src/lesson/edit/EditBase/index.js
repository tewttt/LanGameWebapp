import React, {useState, useContext, useEffect} from "react";
import ButtonCmp from "../../../components/Button";
import Modal from "../../../components/General/Modal";
import { useHistory, useParams, useLocation} from "react-router-dom";
import LessonContext from "../../../context/LessonContext";
import EditVideo from "../EditVideo";
import EditImage from "../EditImage";
import useLesson from "../../../hook/useLesson";

const EditBase = () => {
    const ctx = useContext(LessonContext)
    const {languageId, topicId, lessonId} = useParams()
    const {oneLesson , getOneLesson} = useLesson(languageId, topicId, lessonId)
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
   
   
    useEffect(() => {
        getOneLesson()
    }, [])

    useEffect(() => {
        setAddLesson(oneLesson)
    } ,[oneLesson])

    const updateDB = () => {
        const base = {
            language: addlesson.language,
            level: addlesson.level,
            lessonNumber: addlesson.lessonNumber,
            name: addlesson.name,
            price: addlesson.price,
            status: addlesson.status,
            text: addlesson.text 

        };
        alert("Үндсэн мэдээллийн хэсгийг амжилттай заслаа"); 
        ctx.saveBase(base);
        closeConfirm()
    }

    const save = (e) => {
        e.preventDefault();
       updateDB();
       history.push(`/edit/${languageId}/${topicId}/${lessonId}/translate`)
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
    const changeStatus = (e) => {
        setAddLesson({ ...addlesson, status: e.target.value});
    };
    const changePrice = (e) => {
        setAddLesson({ ...addlesson, price: e.target.value});
    };
    const changeText= (e) => {
        setAddLesson({ ...addlesson, text: e.target.value});
    };
    
    return (
    <div className="md:pb-10 text-white">
        <div className="mt-3 md:w-1/2 m-auto">
            <Modal closeConfirm={closeConfirm} show={confirm} >
                <div className="text-baseBlack ">
                    <p className="text-center">Are you sure you want to save the edit?</p>
                    <div className="flex justify-around mt-4">
                        <button className="py-2 px-10 bg-green-500 text-white rounded-2xl" onClick={save}>Yes</button> 
                        <button className="py-2 px-10 bg-red-500 text-white rounded-2xl" onClick={closeConfirm}>No</button>
                    </div>
                </div>
            </Modal>
            <div className=" my-3 w-full">
                <div className="text-center mb-5"> МЭДЭЭЛЭЛ</div>
                <div className="flex justify-between my-2 mx-3 "  >
                    <p>Language</p>
                    <select 
                        onChange={changeLanguage} 
                        className="text-black rounded-[5px] w-3/4 p-1">
                        <option>{addlesson.language}</option>
                        <option>Англи хэл</option>
                        <option>Солонгос хэл</option>
                        <option>Монгол хэл</option>
                    </select>
                </div>

                <div className="flex justify-between my-1 mx-3">
                    <div> Level</div>
                    <select 
                        className="text-black rounded-[5px] w-3/4 p-1" 
                        onChange={changeLevel}
                    >
                        {/* <option value={lessonEditbase.state.base.level}>{lessonEditbase.state.base.level}</option>  */}
                       <option>{addlesson.level}</option>
                        <option>A1</option>
                        <option>A2</option>
                        <option>B1</option>
                        <option>B1+</option>
                        <option>B2</option>
                        <option>B2+</option>
                    </select>
                </div>

                <div className="flex justify-between  items-center my-1 mx-3">
                    <div> lessonNumber</div>
                    <input 
                        className="w-2/4 p-1 rounded-[5px] mx-0 text-black" 
                        onChange={changeLessonNumber} 
                        value={addlesson.lessonNumber}
                        type="text" name="Хичээлийн дугаар" 
                        placeholder="Хичээлийн дугаар" 
                    />
    
                </div>
        
                <div className="flex justify-between items-center my-1 mx-3">
                    <div>name </div>
                    <input className="w-3/4 p-1 rounded-[5px] mx-0 text-black" 
                        onChange={changeName}  
                        type="text" 
                        value={addlesson.name}
                        placeholder="хичээлийн нэр"
                    />
                </div>

                <div className="flex justify-between my-1 mx-3">
                    <div> Төлөв</div>
                    <select 
                        className="text-black rounded-[5px] w-3/4 p-1" 
                        onChange={changeStatus}
                        >
                      
                       <option>{addlesson.status}</option>
                        <option>Төлбөртэй</option>
                        <option>Төлбөргүй</option>
                    </select>
                </div>

                <div className="flex justify-between my-1 mx-3">
                    Үнэ: {addlesson.price} <br/>
                    <input 
                        className="w-3/4 p-1 rounded-[5px] mx-0 text-black" 
                        onChange={changePrice}  
                        type="number" 
                        value={addlesson.price}
                        name="Хичээлийн үнэ" 
                        placeholder="Хичээлийн үнэ"
                    />
                </div>   
                <input className="w-[90%] m-3 p-1 rounded-[5px] flex justify-center items-center text-black"
                    multline
                    numberOfLines={10}
                    placeholder="text"
                    onChange={changeText}
                    // onChange={hadnleChange} 
                   value={addlesson.text}
                />
            </div>
            <div className="flex flex-col xl:flex-row">
                <EditVideo video = {oneLesson.video}/>
                <EditImage photo={oneLesson.image}/>
            </div>
        </div>
        <button className="my-4 w-full md:w-1/2 bg-baseBlue1 hover:bg-blue-500 flex p-3 justify-center items-center m-auto" onClick={showConfirm} >Мэдээлэл засах</button>
    </div>
)}

export default EditBase;