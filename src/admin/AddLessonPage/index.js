import React from "react";
import { Switch, Route} from "react-router-dom";
import LessonBase from "../component/LessonBase";
import Exam from "../component/Exam/index.js";
import Translate from "../component/Translate";
import { useHistory } from "react-router-dom";
import Word from "../component/Word";
import Grammar from "../component/Grammar";

const AddLesson = () => {
    const history = useHistory();
    const baseInfo = () => {
        history.push("/dashboard");
    };
    const translate = () => {
        history.push("/dashboard/translate");
    };
    const exam= () => {
        history.push("/dashboard/exam");
    };
    const word= () => {
        history.push("/dashboard/word");
    };
    const grammar= () => {
        history.push("/dashboard/grammar");
    };
    return (   
    <div className="flex flex-col ">
        <div className="flex justify-center" >
            <button onClick={baseInfo} 
                className={`${history.location.pathname == "/dashboard" ? "bg-baseBlue text-white" : ""} mx-1 w-[70px] h-[15px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                Мэдээлэл</button>
            <button onClick={translate} 
                className={`${history.location.pathname == "/dashboard/translate" ? "bg-baseBlue text-white" : ""} mx-1 w-[70px] h-[15px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                Орчуулга</button>
            <button onClick={exam} 
                className={`${history.location.pathname == "/dashboard/exam" ? "bg-baseBlue text-white" : ""} mx-1 w-[70px] h-[15px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                Шалгалт</button>
            <button onClick={grammar}  
                className={`${history.location.pathname == "/dashboard/grammar" ? "bg-baseBlue text-white" : ""} mx-1 w-[70px] h-[15px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >Дүрэм</button>
            <button onClick={word} 
                className={`${history.location.pathname == "/dashboard/word" ? "bg-baseBlue text-white" : ""} mx-1 w-[70px] h-[15px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                Шинэ үг</button>
        </div>                             
        <Switch>
            <Route path="/dashboard/translate"  component={Translate}/>
            <Route path="/dashboard/exam" component={Exam}/>
            <Route path="/dashboard/grammar" component={Grammar} />
            <Route path="/dashboard/word" component={Word} />
            <Route path="/dashboard" component={LessonBase} />
        </Switch>
    </div>       
)}

export default AddLesson;