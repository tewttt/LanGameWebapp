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


const EditLesson = (props) => {
    const history = useHistory();
    const ctx = useContext(LessonContext)
    const {id} = useParams()
    const lessonId = ctx.lessonList.find(
         item =>  item.id === id
        );
    // const filBase = lessonId.state.base;
    // const filTranslate = lessonId.state.translate;
    // const filExam = lessonId.state.exam;

  

    // const filteredBase = ctx.lessonId.find(item => console.log(item))
    // const baseInfo = () => {
      
    //     // history.push(`/edit/${props.lesson.id}` )
    //     history.push("/edit/:id" )
      
    // };
    // const translate = () => {
    //     // history.push(`/edit/${props.lesson.id}/translate` )
    //     history.push("/edit/:id/translate");
    // };
    // const exam= () => {
    //     // history.push(`/edit/${props.lesson.id}/exam` )
    //     history.push("/edit/:id/exam");
    // };
   

  


    return (
        
        <div style={{color: "white", margin:"60px" }}>
        <ToolSidebar/>
        <div style={{display: "flex", flexDirection: "row"}}>
            <AdminNav/>
            <div style={{marginLeft: "80px"}}>
                <EditBase filBase={lessonId}/>
                {/* <EditExam filExam={filExam}/>
                <EditTranslate filTranslate={filTranslate}/> */}
            </div>
        </div>
      
          
           
      
          
           

            {/* <div className={css.content}>
                <Button onClick={baseInfo} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>МЭДЭЭЛЭЛ Засах</Button>
                <Button onClick={translate} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>ОРЧУУЛГА</Button>
                <Button onClick={exam} variant="outlined" color="primary"  className={(Button)=>Button.isActive ? "Button.active": ""}>ШАЛГАЛТ</Button>
                                                
                <Switch>
                   
                    <Route path="/edit/:id/translate"  component={EditTranslate}/>
                    <Route path="/edit/:id/exam" component={EditExam}/>
                    <Route path="/edit/:id" component={EditBase} />
                </Switch>
            </div> */}
          
        </div>
    )
}

export default EditLesson;