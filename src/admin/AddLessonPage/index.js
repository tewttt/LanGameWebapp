import React, {useState, useContext} from "react";
import css from "./style.module.css";
import { Switch, Route, Link} from "react-router-dom";
import {Button} from "@mui/material";
import ButtonCmp from "../../components/Button";

import LessonBase from "../../admin/component/LessonBase";
import Exam from "../../admin/component/Exam";
import Translate from "../component/Translate";

import { useHistory } from "react-router-dom";


const AddLesson = (props) => {
    const history = useHistory();
   
   
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
            {/* <div className={css.right}>
            
        
            <ButtonCmp text="ИЛГЭЭХ" daragdsan={SendLessonCtx.sendLesson}/> 
             </div> */}
        </div>
    )
}

export default AddLesson;