import React, {useContext, useState} from "react";
import css from "./style.module.css";
import Modal from "../../../components/General/Modal";
import Button  from "../../../components/Button"
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
    <div className={css.lesson} >  
  

        {/* <Modal closeConfirm={closeConfirm} show={confirm} >
            <div style={{display: "flex", flexDirection: "column"}}>
            Устгахдаа итгэлтэй байна уу
                <div >
                    <Button btn="Cont" text="Тийм" daragdsan={deleteLesson}/>
                    <Button  text="Үгүй" daragdsan={closeConfirm}/>
                </div>
          
            </div>
        </Modal> */}
        
            <div style={{display: "flex", flexDirection: "row", padding: "3px"}}>
                    <div style={{margin: "0px 10px"}}> {props.lesson.state.base.language}</div> <br/> 
                    <div style={{margin: "0px 10px"}}>{props.lesson.state.base.level}</div>  <br/>
                    <div style={{margin: "0px 10px"}}>№:</div>{props.lesson.state.base.lessonNumber}  <br/>
                    <div style={{margin: "0px 10px"}}></div>{props.lesson.state.base.name}  <br/>
            </div>

            <div>
            <p><strong style={{fontSize: "15px"}}> </strong></p>
            </div>

        <div className={css.icon}>
            <div className={css.jump} onClick={view}>Үзэх</div>
           
                <IconButton onClick={edit} >
                    <EditIcon color="primary"/>
                </IconButton>
                <IconButton 
                // onClick={showConfirm}
                onClick={() => deleteLesson()}
                 >
                    <DeleteIcon color="primary"/>
                </IconButton>

               
             
               
        </div>      
   
       
           
    </div>
    )
};

export default AdminLesson;