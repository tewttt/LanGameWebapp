import React, {useContext, useState} from "react";
import Modal from "../../../components/General/Modal";
import { useHistory} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import LessonContext from "../../../context/LessonContext";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"

const AdminLesson = (props) => {
    const [confirm , setConfirm] = useState(false);
    const ctx = useContext(LessonContext)
    const history = useHistory();
    // console.log(props)
    const showConfirm = () => {
        setConfirm(true)
       };
       const closeConfirm = () => {
        setConfirm(false)
       };
  
    const deleteLesson = () => {
        const id = props.lesson.id;
        ctx.deleteDB(id)
    }
    const view = () => {
        history.push(`/lesson/${props.lesson.id}`)
    }
    const edit = () => {
    history.push(`/edit/${props.lesson.id}` )
   }
  
return (
    <div className="flex items-center justify-between w-[full] bg-[#383030] h-[30px] border border-gray-500 rounded-[12px] m-2 sm:w-[350px]  " >  
        <Modal closeConfirm={closeConfirm} show={confirm} >
            <div style={{display: "flex", flexDirection: "column"}}>
            Устгахдаа итгэлтэй байна уу
                <div >
                    <button btn="Cont" text="Тийм" daragdsan={deleteLesson}></button>
                    <button  text="Үгүй" daragdsan={closeConfirm}></button>
                </div>
            </div>
        </Modal>
        <div className="flex">
                <div className="m-1"> {props.lesson.state.base.language}</div> 
                <div className="m-1">{props.lesson.state.base.level}</div> 
                <div className="m-1">№:{props.lesson.state.base.lessonNumber} </div>
                <div className="m-1">{props.lesson.state.base.name} </div>
        </div>
        <div className="flex justify-between items-center w-[150px] px-1">
            <div className="w-[60px] h-[20px] bg-blue-400 flex justify-center items-center rounded-[16px] hover:bg-blue-500" onClick={view}>Үзэх</div>
            <AiFillEdit  size={20} className="hover:text-baseBlue  hover:scale-125" onClick={edit}/>
            <AiFillDelete size={20} className="hover:text-baseBlue hover:rotate-12" onClick={showConfirm} />
        </div>      
    </div>
    )
};

export default AdminLesson;