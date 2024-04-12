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
import Listen from "../Listen/index.js";
import Verb from "../verb/index.js";

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
    const listen= () => {
        history.push("/addlesson/listen");
    };
    const grammar= () => {
        history.push("/addlesson/grammar");
    };
    const verb = () => {
        history.push("/addlesson/verb");
    };
    return (   
      
    <div className="text-white relative flex bg-baseBlack flex-col p-6 pb-60 md:w-[80%] m-auto md:p-0 md:text-2xl">
        <div 
            className="bg-cover absolute top-0 -left-4  z-10"
            style={{backgroundImage: `url(${pattern})`}}>
        </div>
        <div className="z-30"> <ToolSidebar/></div>
       
        <div className="flex py-2 md:pt-20 justify-between pb-4 w-full">
            <div className="flex items-center">
                <IoIosArrowBack size={20} onClick={() => history.push("/teacher")}/>
                <p className="font-bold">Add lesson</p>
            </div>
            <IoIosSettings size={20}/>
        </div>
        <div className="flex  justify-center m-auto md:pt-10 md:text-2xl text-black" >
            <button onClick={baseInfo} 
                className={`${history.location.pathname == "/addlesson" ? "bg-blue-700 text-white" : ""} mx-1  p-2 bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} >
                Base</button>
            <button onClick={translate} 
                className={`${history.location.pathname == "/addlesson/translate" ? "bg-blue-700 text-white" : ""}  mx-1 p-2 bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} >
                Translate</button>
            <button onClick={exam} 
                className={`${history.location.pathname == "/addlesson/exam" ? "bg-blue-700 text-white" : ""}  mx-1 p-2 bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} >
                Exam</button>
            <button onClick={grammar}  
                className={`${history.location.pathname == "/addlesson/grammar" ? "bg-blue-700 text-white" : ""}  mx-1 p-2 bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} >
                Grammar</button>
            <button onClick={verb}  
                className={`${history.location.pathname == "/addlesson/verb" ? "bg-blue-700 text-white" : ""}  mx-1 p-2 bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} >
                Verb</button>
            <button onClick={listen}  
                className={`${history.location.pathname == "/addlesson/listen" ? "bg-blue-700 text-white" : ""}  mx-1 p-2 bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} >
                Listen</button>
            <button onClick={word} 
                className={`${history.location.pathname == "/addlesson/word" ? "bg-blue-700 text-white" : ""}  mx-1 p-2 bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} >
                Word</button>
        </div>                             
        <Switch>
            <Route path="/addlesson/translate"  component={Translate}/>
            <Route path="/addlesson/exam" component={Exam}/>
            <Route path="/addlesson/grammar" component={Grammar} />
            <Route path="/addlesson/word" component={Word} />
            <Route path="/addlesson/listen" component={Listen} />
            <Route path="/addlesson/verb" component={Verb} />
            <Route path="/addlesson" component={LessonBase} />
        </Switch>
    </div>       
)}

export default AddLesson;