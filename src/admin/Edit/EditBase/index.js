import React, {useState, useContext} from "react";
import ButtonCmp from "../../../components/Button";
import Modal from "../../../components/General/Modal";
import { useHistory, useParams } from "react-router-dom";
import LessonContext from "../../../context/LessonContext";
import EditVideo from "../EditVideo";
import EditImage from "../EditImage";

const EditBase = () => {
    const ctx = useContext(LessonContext)
    const {id} = useParams()
    const lessonEditbase = ctx.lessonList.find(
        item =>  item.id === id
       );
    console.log(ctx.state.base.language)
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
    const [newData, setNewData] = useState({
        language: addlesson.language,
        level: addlesson.level,
        lessonNumber: addlesson.lessonNumber,
        name: addlesson.name,
        price: addlesson.price,
        status: addlesson.status,
        text: addlesson.text
    })
    const [oldData, setOldData] = useState({
        language: ctx.state.base.language,
        level: ctx.state.base.level,
        lessonNumber: ctx.state.base.lessonNumber,
        name: ctx.state.base.name,
        price: ctx.state.base.price,
        status: ctx.state.base.status,
        text: ctx.state.base.text
    })
    const updateDB = () => {
        // {addlesson ? (newData) : (oldData)} 
        const base = {
           
            language: addlesson.language,
            level: addlesson.level,
            lessonNumber: addlesson.lessonNumber,
            name: addlesson.name,
            price: addlesson.price,
            status: addlesson.status,
            text: addlesson.text

        };
        // alert("Үндсэн мэдээллийн хэсгийг амжилттай заслаа"); 
        ctx.saveBase(base);
        // ctx.updateDB(id)
        closeConfirm()
        // history.push("/dashboard/addlesson/translate");
    }
    const save = () => {
       updateDB();
       history.push(`/edit/${id}/translate`)
    }
   const showConfirm = () => {
    setConfirm(true)
   };
   const closeConfirm = () => {
    setConfirm(false)
   };
   const back = () => {
    history.push('/dashboard')
   }
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
    <div className="flex flex-col  items-center">
        <div className=" flex flex-col items-center xl:flex-row justify-center py-3 text-gray-200 ">
            <Modal closeConfirm={closeConfirm} show={confirm} >
                <div style={{display: "flex", flexDirection: "column"}}>
                Засварыг Хэладгалахдаа итгэлтэй байна уу
                    <div >
                        <ButtonCmp btn="Cont" text="Тийм" daragdsan={save}/>
                        <ButtonCmp  text="Үгүй" daragdsan={closeConfirm}/>
                    </div>
                </div>
            </Modal>
            <div className="bg-baseColor w-[350px]  mx-5 p-3 rounded-lg border border-gray-500">
                <div className="text-center mb-5"> МЭДЭЭЛЭЛ</div>
                <div className="flex justify-between my-2 mx-3 "  >
                    <div> language: {addlesson.language} </div>
                    <select onChange={changeLanguage} className="text-black rounded-[5px] h-[30px] w-[170px]">
                        <option>{lessonEditbase.state.base.language}</option>
                        <option>Англи хэл</option>
                        <option>Солонгос хэл</option>
                        <option>Монгол хэл</option>
                    </select>
                </div>

                <div className="flex justify-between my-1 mx-3">
                    <div> level: {addlesson.level}</div>
                    <select className="text-black rounded-[5px] w-[170px] h-[30px]" onChange={changeLevel}>
                        <option defaultValue={lessonEditbase.state.base.level}>{lessonEditbase.state.base.level}</option> 
                        <option>A1</option>
                        <option>A2</option>
                        <option>B1</option>
                        <option>B1+</option>
                        <option>B2</option>
                        <option>B2+</option>
                    </select>
                </div>

                <div className="flex justify-between  items-center my-0 mx-3">
                    <div> lessonNumber: {addlesson.lessonNumber}</div>
                    <input className="w-[170px] h-[15px] rounded-[5px] mx-0 text-black" onChange={changeLessonNumber} defaultValue={lessonEditbase.state.base.lessonNumber}  type="text" name="Хичээлийн дугаар" placeholder="Хичээлийн дугаар" />
                </div>
        
                <div className="flex justify-between items-center my-0 mx-3">
                    <div>name: {addlesson.name} </div>
                    <input className="w-[170px] h-[20px] rounded-[5px] mx-0 text-black" onChange={changeName}  type="text" defaultValue={lessonEditbase.state.base.name} placeholder="хичээлийн нэр"/>
                </div>

                <div className="flex justify-between my-1 mx-3">
                    <div> Төлөв: {addlesson.status}</div>
                    <select className="text-black rounded-[5px] w-[170px] h-[30px]" onChange={changeStatus}>
                        <option>{lessonEditbase.state.base.status}</option> 
                        <option>Төлбөртэй</option>
                        <option>Төлбөргүй</option>
                    </select>
                </div>

                <div className="flex justify-between my-1 mx-3">
                    Үнэ: {addlesson.price} <br/>
                    <input className="w-[170px] h-[20px] rounded-[5px] mx-0 text-black" onChange={changePrice}  type="number" defaultValue={lessonEditbase.state.base.price} name="Хичээлийн үнэ" placeholder="Хичээлийн үнэ"/>
                </div>   
                <input className="w-[90%] m-3 h-[20px] rounded-[5px] flex justify-center items-center text-black"
                    multline
                    numberOfLines={10}
                    placeholder="text"
                    
                    onChange={changeText}
                    defaultValue={lessonEditbase.state.base.text}
                />
            </div>
            <div className="flex flex-col xl:flex-row">
                <EditVideo/>
                <EditImage/>
            </div>
        </div>
        <button className="my-1 w-[150px] h-[20px] bg-blue-500 flex text-[12px] justify-center items-center m-auto" onClick={showConfirm} >Мэдээлэл засах</button>
    </div>
)}

export default EditBase;