import React, {useState, useContext} from "react";
import { Switch, Route, Link, useParams} from "react-router-dom";
import EditBase from "../EditBase";
import EditTranslate from "../EditTranslate";
import EditExam from "../EditExam"
import ToolSidebar from "../../../components/ToolSidebar"
import { useHistory } from "react-router-dom";
import LessonContext from "../../../context/LessonContext";
import EditGrammar from "../EditGrammar";
import EditNewWord from "../EditNewword";
import {AiFillStepBackward} from "react-icons/ai"


const EditLesson = (props) => {
    // console.log(props.lesson)
    const history = useHistory();
    const ctx = useContext(LessonContext)
    const {id} = useParams()
    const lessonId = ctx.lessonList.find(
         item =>  item.id === id
        );
    // const findID =lessonId.id
        // console.log(lessonId.id)
    const baseInfo = () => {
        history.push(`/edit/${lessonId.id}/`);
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
//   console.log(history.location.pathname)
    return (
        <div >
        <ToolSidebar/>
           <div className=" text-white flex flex-col my-2 px-3"> 
                <div className="flex justify-between text-[12px] ">
                    <AiFillStepBackward size={20} className="text-white hover:text-baseBlue " onClick={back}/>
                    <div className="flex justify-center mb-6">
                        <button className={`${history.location.pathname == `/edit/${lessonId.id}/` ? "bg-blue-700 text-white" : ""} mx-1 w-[50px] text-[10px] lg:w-[70px] h-[15px] bg-blue-50 flex justify-center items-center md:text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={baseInfo}>Мэдээлэл</button>
                        <button className={`${history.location.pathname == `/edit/${lessonId.id}/translate` ? "bg-blue-700 text-white" : ""} mx-1 w-[50px] text-[10px] lg:w-[70px] h-[15px] bg-blue-50 flex justify-center items-center md:text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={translate}>Орчуулга</button>
                        <button className={`${history.location.pathname == `/edit/${lessonId.id}/exam` ? "bg-blue-700 text-white" : ""} mx-1 w-[50px] text-[10px] lg:w-[70px] h-[15px] bg-blue-50 flex justify-center items-center md:text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={exam}>Шалгалт</button>
                        <button className={`${history.location.pathname == `/edit/${lessonId.id}/grammar` ? "bg-blue-700 text-white" : ""} mx-1 w-[50px] text-[10px] lg:w-[70px] h-[15px] bg-blue-50 flex justify-center items-center md:text-[12px]  text-black hover:bg-blue-500 rounded-sm`} onClick={grammar} >Дүрэм</button>
                        <button className={`${history.location.pathname == `/edit/${lessonId.id}/word` ? "bg-blue-700 text-white" : ""} mx-1 w-[50px] text-[10px] lg:w-[70px] h-[15px] bg-blue-50 flex justify-center items-center md:text-[12px]  text-black hover:bg-blue-500 rounded-sm`} onClick={word} >Шинэ үг</button>
                    </div>   
                    <div className="pr-3">Засвар</div>      
                </div>              
                <Switch>
                    <Route path="/edit/:id/word"  component={EditNewWord}/>
                    <Route path="/edit/:id/grammar"  component={EditGrammar}/>
                    <Route path="/edit/:id/translate"  component={EditTranslate}/>
                    <Route path="/edit/:id/exam" component={EditExam}/>
                    <Route path="/edit/:id/" component={EditBase} />
                </Switch>
            </div> 
        </div>
    )
}

export default EditLesson;