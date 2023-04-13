import React, {useState, useContext} from "react";
import css from "./style.module.css";
import { Switch, Route, Link} from "react-router-dom";
import {Button} from "@mui/material";
import ButtonCmp from "../../components/Button";
import axios from "../../axios"
import LessonBase from "../../components/add/LessonBase";
import Exam from "../../components/add/Exam";
import Translate from "../../components/add/Translate";
import SendLessonContext from "../../context/sendLessonContext";
import { useHistory } from "react-router-dom";
// import LessonBase from "../../components/LessonBase"

const AddLesson = (props) => {
    const history = useHistory();
   
    const SendLessonCtx = useContext(SendLessonContext);
   
    const baseInfo = () => {
        history.push("/dashboard/addlesson");
    };
    const translate = () => {
        history.push("/dashboard/addlesson/translate");
    };
    const exam= () => {
        history.push("/dashboard/addlesson/exam");
    };
   

    const game = () => {
        history.push("/");
   };
   const lesson = () => {
    history.push("/lesson");
};


    return (
        <div className={css.body}>
           
            <div className={css.content}>
                <Button onClick={baseInfo} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>МЭДЭЭЛЭЛ</Button>
                <Button onClick={translate} variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}}>ОРЧУУЛГА</Button>
                <Button onClick={exam} variant="outlined" color="primary"  className={(Button)=>Button.isActive ? "Button.active": ""}>ШАЛГАЛТ</Button>
              {/* <div><Link to="dashboard/addlesson/translate">Translate</Link></div> */}
                                                
                <Switch>
                   
                    <Route path="/dashboard/addlesson/translate"  component={Translate}/>
                    <Route path="/dashboard/addlesson/exam" component={Exam}/>
                    <Route path="/dashboard/addlesson/" component={LessonBase} />
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