import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import LessonBase from "../LessonBase/index.jsx";
import Exam from "../Exam/index.js";
import Translate from "../Translate/index.jsx";
import Word from "..//Word/index.js";
import Grammar from "../Grammar/index.js";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import ToolSidebar from "../../../components/ToolSidebar/index.jsx";
import pattern from "../../../assets/logo/patternWhite.png"
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
    <div className="text-white relative flex bg-baseBlack flex-col p-6 pb-60 md:p-0 ">
        <div 
            className="bg-cover absolute top-0 -left-4  z-10 "
            style={{backgroundImage: `url(${pattern})`}}>
        </div>
       
        <div className="flex py-2 justify-between pb-4 w-full">
            <div className="flex items-center">
                <IoIosArrowBack size={20} onClick={() => history.push("/teacher")}/>
                <p className="font-bold">Add lesson</p>
            </div>
            <IoIosSettings size={20}/>
        </div>
        <div className="flex justify-center sm:m-auto md:pt-10" >
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