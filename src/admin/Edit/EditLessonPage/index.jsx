import React, {useState, useContext} from "react";
import { Switch, Route, Link, useParams, useLocation, useHistory } from "react-router-dom";
import EditBase from "../EditBase";
import EditTranslate from "../EditTranslate";
import EditExam from "../EditExam"
import ToolSidebar from "../../../components/ToolSidebar"

import LessonContext from "../../../context/LessonContext";
import EditGrammar from "../EditGrammar";
import EditNewWord from "../EditNewword";
import {AiFillStepBackward} from "react-icons/ai"

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const EditLesson = (props) => {
  
    const history = useHistory();
    const ctx = useContext(LessonContext)
    const {id} = useParams();
    let query = useQuery();
    
    let lessonId = null
   
    
    if(query.get("lang") == 'Англи хэл') {
        lessonId = ctx.englishList.find(
            // item => console.log(item + "item id")
            item =>  item.id === id
        );
    }
     else if(query.get("lang") == 'Солонгос хэл') {
        lessonId = ctx.koreaList.find(
            item =>  item.id === id
        );
    } else if(query.get("lang") == "Монгол хэл") {
        lessonId = ctx.mongoliaList.find(
            item =>  item.id === id
        );
    }
    // console.log(query.get("lang"))
    const baseInfo = () => {
        // history.push(`/edit/${lessonId.id}/`);
        history.push(`/edit/${lessonId.id}?lang=${query.get("lang")}` )
    };
    const translate = () => {
        history.push(`/edit/${lessonId.id}/translate?lang=${query.get("lang")}`);  
    };
    const exam= () => {
        history.push(`/edit/${lessonId.id}/exam?lang=${query.get("lang")}`);
    };
    const word= () => {
        history.push(`/edit/${lessonId.id}/word?lang=${query.get("lang")}`);
    };
    const grammar= () => {
        history.push(`/edit/${lessonId.id}/grammar?lang=${query.get("lang")}`);
    };
    const back= () => {
        history.push("/dashboard");
    };
//   console.log(history.location.pathname)
    return (
        <div className="mt-0" >
        <ToolSidebar/>
           <div className=" text-white flex flex-col my-2 px-3"> 
                <div className="flex mt-12 justify-between text-[12px] ">
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