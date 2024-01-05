import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import LessonBase from "../LessonBase/index.jsx";
import Exam from "../Exam/index.js";
import Translate from "../Translate/index.jsx";
import Word from "..//Word/index.js";
import Grammar from "../Grammar/index.js";

const AddLesson = () => {
    const history = useHistory();
    const baseInfo = () => {
        history.push("/addlesson");
    };
    const translate = () => {
        history.push("/addlesson/translate");
    };
    const exam= () => {
        history.push("/addlesson/exam");
    };
    const word= () => {
        history.push("/addlesson/word");
    };
    const grammar= () => {
        history.push("/addlesson/grammar");
    };
    return (   
    <div className="flex flex-col mt-12 text-white">
        <button onClick={() => history.push("/teacher")}>back</button>
        <div className="flex" >
            <button onClick={baseInfo} 
                className={`${history.location.pathname == "/addlesson" ? "bg-blue-700 text-white" : ""} mx-1  w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                Мэдээлэл</button>
            <button onClick={translate} 
                className={`${history.location.pathname == "/addlesson/translate" ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                Орчуулга</button>
            <button onClick={exam} 
                className={`${history.location.pathname == "/addlesson/exam" ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                Шалгалт</button>
            <button onClick={grammar}  
                className={`${history.location.pathname == "/addlesson/grammar" ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >Дүрэм</button>
            <button onClick={word} 
                className={`${history.location.pathname == "/addlesson/word" ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                Шинэ үг</button>
        </div>                             
        <Switch>
            <Route path="/addlesson/translate"  component={Translate}/>
            <Route path="/addlesson/exam" component={Exam}/>
            <Route path="/addlesson/grammar" component={Grammar} />
            <Route path="/addlesson/word" component={Word} />
            <Route path="/addlesson" component={LessonBase} />
        </Switch>
    </div>       
)}

export default AddLesson;