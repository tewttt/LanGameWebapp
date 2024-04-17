import React, { useState, useContext} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import css from "./style.module.css"
import { useHistory } from "react-router-dom";
import useTeacher from "../../hook/useTeacher";
import LessonContext from "../../context/LessonContext";
import { getAuth } from "firebase/auth";
import Modal from "../../components/General/Modal";
import pattern from "../../assets/logo/patternWhite.png"
import useLesson from "../../hook/useLesson"
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { ref, uploadBytes,  getDownloadURL } from "firebase/storage";
import {storage} from  "../../firebase";
import Tooltip from "@mui/material/Tooltip";
import SaveIcon from '@mui/icons-material/Save';
import { IconButton } from "@mui/material";

const auth = getAuth();
const Teacher = () => {
    const [chLan, setChLan] = useState("");
    const [photo, setPhoto] = useState("")
    const [chLevel, setChLevel] = useState("");
    const [chLessonId, setChLessonId] = useState("")
    const [show, setShow] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const {lanId, levelId, getLevelId , getLessonId , getOneLesson} = useLesson(chLan, chLevel, chLessonId)
    const { addTeacher , cancelTeacher} = useTeacher()
    const ctx = useContext(UserContext)
    // console.log(ctx.currentUser.name === "")
    const LessonCtx = useContext(LessonContext)
    let arrLevel =  levelId;
    let arrLanguage = lanId;
    let userLesson =  LessonCtx.userLesson;
   

    const selectLan = (lan, i) => {
        setChLan(lan);
        getLevelId(lan)
      };
    
      const selectLevel = (level, i) => {
        setChLevel(level);
        getLessonId(level, chLan)
        LessonCtx.getUserLessons(level, chLan); 
      };
  
    const history = useHistory();
    const [teacher , setData] = useState({
        language: "",
        experience: "",
        photo: ""
    })
    const add = () => {
        addTeacher(teacher)
        setShow(false)
    }

    const handleChange = (event) => {
        setData({ ...teacher, [event.target.name]: event.target.value })
    }
    const changePhoto = (event) => {
        setPhoto(event.target.files[0])
    };

    const uploadImage = () =>{
        if (photo === null) return;
        const imageRef = ref(storage, `profiles/${photo.name}`);
        uploadBytes(imageRef, photo).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setData({ ...teacher, photo: url })
            })
        })
        alert("photo amjilttai") 
    }

    const view = (number) => {
        setChLessonId(number)
        getOneLesson()
        history.push(`/lesson/${chLan}/${chLevel}/${number}`);
    };
    const edit = (number) => {
        setChLessonId(number)
        getOneLesson()
        history.push(`/edit/${chLan}/${chLevel}/${number}`);
    };
    const remove = (number) => {
        setChLessonId(number)
        setShowDelete(true)
    };
    const sendRequest = () => {
        if(ctx?.currentUser?.name === "" || ctx?.currentUser?.age === "" || ctx?.currentUser?.phone === "" || ctx?.currentUser?.gender === ""){
            setShowInfo(true)
        } else {
            setShow(true)
        }
    }

    const del = () => {
         LessonCtx.deleteDB(chLan, chLevel, chLessonId )
         setShowDelete(false)
    }
  
    
    return (
        <div className="bg-baseBlack flex flex-col text-white   relative">
             <div 
                className="bg-cover bg-center opacity-10 absolute top-0 left-0 bg-repeat w-screen h-full"
                style={{backgroundImage: `url(${pattern})`}}>
            </div>
            <div className="z-30">
                <ToolSidebar />
            </div>
            

            {/* add lesson */}
            {ctx?.currentUser?.teacherStatus ? 
            (
            <div className="z-20 flex flex-col items-center pb-96 px-6 pt-10 md:pt-20  m-auto w-full">
                <button 
                    className="w-full md:w-1/2 bg-helpGreen hover:bg-blue-700 py-2 px-4 text-white rounded-2xl text-2xl font-bold "
                    onClick={() => history.push("/addlesson")}>
                    Хичээл нэмэх
                </button>

                <p className="text-2xl font-bold mt-6 mb-2">Таны оруулсан хичээлүүд</p>
                <div className="flex flex-wrap place-content-center gap-2  md:mt-10 mb-2  w-full sm:w-[80%] xl:w-[60%]">
                    {arrLanguage.map((lan, i) => {
                    return (
                        <div
                        className={`${chLan === lan ?  "bg-baseBlue1 text-white" : "" } w-[90px] sm:w-1/3 mx-1 hover:bg-baseBlue1 hover:text-white md:text-2xl bg-white font-bold text-baseBlack p-5 flex items-center justify-center rounded-2xl m-2` }
                        key={i}
                        onClick={() => selectLan(lan.id, i)}
                        >
                        {lan.id}
                        </div>
                    );
                    })}
                </div>
                <div className="flex flex-wrap place-content-center gap-2 w-full sm:w-[80%] xl:w-[60%]">
                    {arrLevel.map((e, i) => {
                        return (
                        <div
                            className={`${chLevel === e ?  "bg-baseBlue1 text-white" : ""  }w-[40px] h-[40px] sm:w-[60px] sm:h-[50px] hover:bg-baseBlue1 hover:text-white md:text-2xl bg-white font-bold text-baseBlack md:p-5 flex items-center justify-center rounded-2xl m-1 md:m-2` }
                            key={i}
                            onClick={() => selectLevel(e.id, i)}
                            >
                            {e.id}
                        </div>
                        );
                    })}
                </div>
                {(chLan != "" && chLevel != "") && 
                    <div className="flex flex-wrap gap-2 place-content-center w-full">
                    {userLesson.map((e, i) => {
                        // console.log(e.name)
                        return (
                            <div className="flex flex-col w-full sm:w-[300px] my-2 border border-helpGray p-2 rounded-2xl" key={i}>
                                <div className="flex  items-center justify-between p-1">
                                    <div className="flex justify-between w-[130px]">
                                        <div> {e.language}</div>
                                        <div>{e.level}</div>
                                        <div>№{e.lessonNumber}</div>
                                    </div>
                                   
                                    <button
                                        onClick={() => view(e.lessonNumber)}
                                        className=" bg-blue-500 rounded-[5px] mx-2 flex justify-center items-center px-4 py-1 hover:bg-blue-600 hover:scale-110 "
                                    >
                                        Watch
                                    </button>
                                    <div className="flex w-[60px] justify-between">
                                        <AiFillEdit size={20} onClick={() => edit(e.lessonNumber)}/>
                                        <MdDelete size={20}  onClick={() => remove(e.lessonNumber) }/>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between mt-2 p-1">
                                    <p>{e.name}</p>
                                    <p>accept: <span className="text-red-500 mx-2 font-bold uppercase">{e.acceptStatus}</span></p>
                                    <p>reason: <span className="text-green-500 mx-2">{e.reason}</span></p>
                                </div>
                            </div>
                            
                        );
                    })}
                    </div>
                }
                
                <Modal show={showDelete}>
                    <div className="p-6 flex flex-col justify-center">
                        <p>Are you sure you want to delete a lesson?</p>
                        <div className="flex my-2 justify-between">
                            <button className="py-2 px-6 rounded-2xl bg-red-500 text-white" onClick={del}>Yes, delete</button>
                            <button className="py-2 px-6 rounded-2xl bg-green-500 text-white" onClick={() => setShowDelete(false)}>No </button>
                        </div>
                    </div>
                </Modal>
            </div>
            ) : ( 
                //request  teacher 
            <div className="z-20 flex flex-col  items-center  pb-96 px-6 pt-10 md:pt-20 m-auto w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <Modal show={show} >
                    <div className="flex flex-col justify-between">
                        <p className="text-baseBlack text-lg my-3 text-center">Submit a request to become a teacher</p>
                        <div className="flex justify-between">
                            <button  
                                className="bg-green-500 py-3 px-10 rounded-2xl text-white"
                                onClick={() => setShow(false)}>NO</button>
                            <button 
                            className="bg-red-500 text-white py-3 px-5 rounded-2xl"
                            onClick={add}>Yes , send request</button>
                        </div>
                    </div>
                </Modal>
                <Modal show={showInfo} >
                    <div className="">
                        <p className="mb-4 text-center">Please complete your profile information</p>
                        <p className="mb-4 text-center">Профайл мэдээллээ гүйцэт бөглөнө үү</p>
                        <div className="flex justify-between">
                            <button className="bg-green-500 p-2 w-1/2 mx-1 rounded-2xl text-white" onClick={() => history.push("/profile")}>Fill in information</button>
                            <button className="bg-red-600 text-white p-2 w-1/2 mx-1 rounded-xl" onClick={()=> setShowInfo(false)}> Close</button>
                        </div>
                    </div>
                </Modal>
                {ctx?.currentUser?.teacherMessage === "request" ? (
                    null
                ) : (
                    <div className="flex flex-col justify-center w-full">
                        <p className="text-center pb-4 font-bold">TEACHER</p>
                        <p className="mb-2 text-lg font-bold w-full text-center">
                            Гэрээт багшаар ажиллах нөхцөл
                        </p>
                        <p>
                            Зааврын дагуу хичээл бэлдэж оруулна. Таны мэдээллэлтэй танилцсаны дараа холбогдож , гэрээ байгуулна. 
                            Гэрээт багшаар ажиллах сонирхолтой бол МЭДЭЭЛЛЭЭ ГҮЙЦЭТ БӨГЛӨН ИЛГЭЭНЭ ҮҮ. БАЯРЛАЛАА
                        </p>
                        <div className=" w-full mt-4">
                            <p>Хичээл заах хэл: </p>
                            <select name="language" onChange={handleChange} className="w-full text-baseBlack p-1 rounded-xl">
                                <option>choose</option>
                                <option>English</option>
                                <option>Mongolia</option>
                                <option>Korea</option>
                                <option>Japan</option>
                                <option>Chinese</option>
                            </select>
                        </div>
                        <div className=" w-full  ">
                            <p>Хичээл заасан туршлага</p>
                            <input 
                                className="p-1 my-1 rounded-xl w-full text-black"
                                type="text" 
                                name="experience" 
                                placeholder="wrire..." 
                                onChange={handleChange}/>
                        </div>
                       
                        <div className="flex flex-col items-center">
                            <p className="text-center">CV илгээх</p>
                            <img src={teacher?.photo} className="w-[150px] h-[150px] rounded-[18px] border border-gray-300"/>
                            <div>
                                <input onChange={changePhoto} 
                                    className="w-[150px] h-[40px] text-[10px] p-2" 
                                    required type="file" 
                                    // hidden="hidden"  
                                    accept="image/*"
                                    id="imageInput" 
                                />
                                <Tooltip title="Save" placement="bottom">
                                    <IconButton  onClick={uploadImage}>
                                            <SaveIcon color="primary"/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                           
                        </div>
                    </div>          
                )}
                    
                {ctx?.currentUser?.teacherMessage === "request" ? (
                <div className="bg-helpGray text-baseBlack p-4 my-2 rounded-2xl font-bold w-full">
                    <p className="text-center pb-4 font-bold">TEACHER</p>
                    <p>Sent a request to become a teacher</p>
                    <button 
                    onClick={() => cancelTeacher()}
                    className="bg-red-500 w-full py-2 px-4 text-white rounded-2xl my-2">Cancellation of request</button>
                </div>) 
                : (
                    <button onClick={sendRequest} className={css.towch}>
                        <p className="text-sm">Send request a teacher</p>
                    </button>
                )}
            </div>
            )}
          
        </div>
    )
}

export default Teacher;
