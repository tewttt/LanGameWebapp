import React, {useState, useContext} from "react";
import css from "./style.module.css";
import { Switch, Route, Link, useParams} from "react-router-dom";
import EditBase from "../EditBase";
import EditTranslate from "../EditTranslate";
import EditExam from "../EditExam"

import ToolSidebar from "../../../components/ToolSidebar"
import { useHistory } from "react-router-dom";
import LessonContext from "../../../context/LessonContext";

import EditGrammar from "../EditGrammar";
import EditNewWord from "../EditNewword";


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
  


    return (
        
        <div >
        <ToolSidebar/>
        {/* <AdminNav/> */}
     
           <div className="mt-0 text-gray-300 text-center flex flex-col"> Засвар оруулах

                <div className="flex justify-center">
                    <button className="mx-1 w-[70px] h-[15px] bg-blue-200 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm" onClick={baseInfo}>Мэдээлэл</button>
                    <button className="mx-1 w-[70px] h-[15px] bg-blue-200 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm" onClick={translate}>Орчуулга</button>
                    <button className="mx-1 w-[70px] h-[15px] bg-blue-200 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm" onClick={exam}>Шалгалт</button>
                    {/* <Button onClick={exam} variant="outlined" color="primary"  className={(Button)=>Button.isActive ? "Button.active": ""}>ШАЛГАЛТ</Button> */}
                    <button className="mx-1 w-[70px] h-[15px] bg-blue-200 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm" onClick={grammar} >Дүрэм</button>
                    <button className="mx-1 w-[70px] h-[15px] bg-blue-200 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm" onClick={word} >Шинэ үг</button>
                    {/* <button className="w-[60px] mx-1 h-[20px] bg-blue-500 flex justify-center items-center text-[10px]" onClick={back} >Буцах</button> */}
                
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