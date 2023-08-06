import React, {useContext, useState} from "react";
import css from "./style.module.css";
import Modal from "../../../components/General/Modal";
import ButtonCmp  from "../../../components/Button"
import { useHistory} from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';

import LessonContext from "../../../context/LessonContext";


const AdminLesson = props => {
    const [confirm , setConfirm] = useState(false);
    const ctx = useContext(LessonContext)
    const history = useHistory();
    
   
   
    const showConfirm = () => {
        setConfirm(true)
       };
       const closeConfirm = () => {
        setConfirm(false)
       };
   

    const deleteLesson = async () => {
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
    <div className="flex items-center justify-between w-full bg-[#383030] h-[30px] rounded-[12px] m-2 sm:w-[80%] md:w-[600px]" >  
  

        <Modal closeConfirm={closeConfirm} show={confirm} >
            <div style={{display: "flex", flexDirection: "column"}}>
            Устгахдаа итгэлтэй байна уу
                <div >
                    <ButtonCmp btn="Cont" text="Тийм" daragdsan={deleteLesson}/>
                    <ButtonCmp  text="Үгүй" daragdsan={closeConfirm}/>
                </div>
          
            </div>
        </Modal>
        
            <div className="flex">
                    <div className="m-1"> {props.lesson.state.base.language}</div> 
                    <div className="m-1">{props.lesson.state.base.level}</div> 
                    <div className="m-1">№:{props.lesson.state.base.lessonNumber} </div>
                    <div className="m-1">{props.lesson.state.base.name} </div>
            </div>

           

        <div className="flex justify-between items-center">
            <div className="w-[60px] h-[20px] bg-blue-400 flex justify-center items-center rounded-[16px]" onClick={view}>Үзэх</div>
           
            <IconButton onClick={edit} >
                <EditIcon color="primary"/>
            </IconButton>
            <IconButton onClick={showConfirm}>
                <DeleteIcon color="primary"/>
            </IconButton>
        </div>      
    </div>
    )
};

export default AdminLesson;