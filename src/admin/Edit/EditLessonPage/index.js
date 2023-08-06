import React, {useState, useContext} from "react";
import css from "./style.module.css";
import { Switch, Route, Link, useParams} from "react-router-dom";
import EditBase from "../EditBase";
import EditTranslate from "../EditTranslate";
import EditExam from "../EditExam"
import {Button} from "@mui/material";
import ToolSidebar from "../../../components/ToolSidebar"
import { useHistory } from "react-router-dom";
import LessonContext from "../../../context/LessonContext";
import AdminNav from "../../AdminNav";
import TestEdit from "../TestEditBase/TestEditBase";


const EditLesson = (props) => {
    // console.log(props.lesson)
    const history = useHistory();
    const ctx = useContext(LessonContext)
    const {id} = useParams()
    const lessonId = ctx.lessonList.find(
         item =>  item.id === id
        );
        // console.log(lessonId.id)
    const baseInfo = () => {
        history.push(`/edit/${lessonId.id}/base`);
    };
    const translate = () => {
        history.push(`/edit/${lessonId.id}/translate`);
    };
    const exam= () => {
        history.push(`/edit/${lessonId.id}/exam`);
    };
    const word= () => {
        history.push(`/edit/${lessonId.id}/word`);
    };
    const grammar= () => {
        history.push(`/edit/${lessonId.id}/grammar`);
    };
    const back= () => {
        history.push("/dashboard");
    };
  


    return (
        
        <div style={{color: "white", margin:"60px" }}>
        <ToolSidebar/>
     
           <div>

                <div className={css.content}>
                    <Button onClick={baseInfo} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>МЭДЭЭЛЭЛ Засах</Button>
                    <Button onClick={translate} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>ОРЧУУЛГА</Button>
                    {/* <Button onClick={exam} variant="outlined" color="primary"  className={(Button)=>Button.isActive ? "Button.active": ""}>ШАЛГАЛТ</Button> */}
                    <Button onClick={grammar} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>grammar</Button>
                    <Button onClick={word} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>word</Button>
                    <Button onClick={back} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>back</Button>
                
                </div>                       
                    <Switch>
                    
                        <Route path="/edit/:id/translate"  component={EditTranslate}/>
                        <Route path="/edit/:id/exam" component={EditExam}/>
                        <Route path="/edit/:id/base" component={TestEdit} />
                    </Switch>
            
            </div> 
        </div>
    )
}

export default EditLesson;