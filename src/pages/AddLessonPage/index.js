import React, {useState, useContext} from "react";
import css from "./style.module.css";
import { Switch, Route, Link} from "react-router-dom";
import {Button} from "@mui/material";
import ButtonCmp from "../../components/Button";
import axios from "../../axios"
import LessonBase from "../../components/LessonBase";
import Exam from "../../components/Exam";
import Translate from "../../components/Translate";
import SendLessonContext from "../../context/sendLessonContext";

// import LessonBase from "../../components/LessonBase"

const AddLesson = (props) => {
   
    const SendLessonCtx = useContext(SendLessonContext);
   
    const baseInfo = () => {
        props.history.push("/addlesson/");
    };
    const translate = () => {
        props.history.push("/addlesson/translate");
    };
    const exam= () => {
        props.history.push("/addlesson/exam");
    };
   

    const game = () => {
        props.history.push("/");
   };
   const lesson = () => {
    props.history.push("/lesson");
};


    return (
        <div className={css.body}>
           
            <div className={css.content}>
                <Button onClick={baseInfo} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>МЭДЭЭЛЭЛ</Button>
                <Button onClick={translate} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>ОРЧУУЛГА</Button>
                <Button onClick={exam} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>ШАЛГАЛТ</Button>
              
                                                
                <Switch>
                   
                    <Route path="/addlesson/translate"  component={Translate}/>
                    <Route path="/addlesson/exam" component={Exam}/>
                    <Route path="/addlesson/" component={LessonBase} />
                </Switch>

            

               
            </div>
            <div className={css.right}>
            
            <ButtonCmp daragdsan={lesson} text="Хичээл үзэх"/>
            <ButtonCmp daragdsan={game} text="Тоглох"/>
            <ButtonCmp text="ИЛГЭЭХ" daragdsan={SendLessonCtx.sendLesson}/> 
             </div>
        </div>
    )
}

export default AddLesson;