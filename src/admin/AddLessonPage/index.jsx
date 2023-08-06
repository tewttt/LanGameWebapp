import React, {useState, useContext} from "react";
import css from "./style.module.css";
import { Switch, Route, Link} from "react-router-dom";
import {Button} from "@mui/material";


import LessonBase from "../component/LessonBase";
import Exam from "../component/Exam/index.js";
import Translate from "../component/Translate";
import CreateQuiz from "../component/Quiz";
import { useHistory } from "react-router-dom";
import Word from "../component/Word";


import Grammar from "../component/Grammar";


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
    const word= () => {
        history.push("/dashboard/addlesson/word");
    };
    const grammar= () => {
        history.push("/dashboard/addlesson/grammar");
    };
    // const quiz= () => {
    //     history.push("/dashboard/addlesson/Createquiz");
    // };
   

    const game = () => {  
        history.push("/");
   };
   const lesson = () => {
    history.push("/lesson");
};

 
    return (
        
           
            <div className="flex flex-col ">
                <div className="flex justify-center" >
                    <button onClick={baseInfo} className="mx-1 w-[70px] h-[15px] bg-blue-200 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm" >Мэдээлэл</button>
                    <button onClick={translate} className="mx-1 w-[70px] h-[15px] bg-blue-200 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm" >Орчуулга</button>
                    <button onClick={exam} className="mx-1 w-[70px] h-[15px] bg-blue-200 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm"  >Шалгалт</button>
                    <button onClick={grammar}  className="mx-1 w-[70px] h-[15px] bg-blue-200 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm" >Дүрэм</button>
                    <button onClick={word} className="mx-1 w-[70px] h-[15px] bg-blue-200 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm" >Шинэ үг</button>
           
                </div>                             
                <Switch>
                   
                    <Route path="/dashboard/addlesson/translate"  component={Translate}/>
                    <Route path="/dashboard/addlesson/exam" component={Exam}/>
                    {/* <Route path="/dashboard/addlesson/word" component={TestWord} /> */}
                    <Route path="/dashboard/addlesson/grammar" component={Grammar} />
                    {/* <Route path="/dashboard/addlesson/word" component={NewWord} /> */}
                    <Route path="/dashboard/addlesson/word" component={Word} />
                    {/* <Route path="/dashboard/addlesson/Createquiz" component={CreateQuiz} /> */}
                    <Route path="/dashboard/addlesson/" component={LessonBase} />
                    
                </Switch>
               
            </div>
          
       
    )
}

export default AddLesson;