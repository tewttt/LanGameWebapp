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
const EditLesson = (props) => {
  
    const history = useHistory();
    const ctx = useContext(LessonContext)
    const lan = ctx.lesson.language
    const level = ctx.lesson.level
    const number = ctx.lesson.lessonNumber
  
    const baseInfo = () => {
        history.push(`/edit/${lan}${level}${number}/base`);
    };
    const translate = () => {
        history.push(`/edit/${lan}${level}${number}/translate`)
    };
    const exam= () => {
        history.push(`/edit/${lan}${level}${number}/exam`)
    };
    const word= () => {
        history.push(`/edit/${lan}${level}${number}/word`)
    };
    const grammar= () => {
        history.push(`/edit/${lan}${level}${number}/grammar`)
    };
    const back= () => {
        history.push("/teacher");
    };

    return (
        <div className="mt-0" >
        <ToolSidebar/>
           <div className=" text-white flex flex-col my-2 px-3"> 
                <div className="flex mt-12 justify-between text-[12px] ">
                    <AiFillStepBackward size={20} className="text-white hover:text-baseBlue " onClick={back}/>
                    <div className="flex justify-center mb-6">
                        <button className={`${history.location.pathname == `/edit/${lan}${level}${number}/base` ? "bg-blue-700 text-white" : ""} mx-1 w-[50px] text-[10px] lg:w-[70px] h-[15px] bg-blue-50 flex justify-center items-center md:text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={baseInfo}>Мэдээлэл</button>
                        <button className={`${history.location.pathname == `/edit/${lan}${level}${number}/translate` ? "bg-blue-700 text-white" : ""} mx-1 w-[50px] text-[10px] lg:w-[70px] h-[15px] bg-blue-50 flex justify-center items-center md:text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={translate}>Орчуулга</button>
                        <button className={`${history.location.pathname == `/edit/${lan}${level}${number}/exam` ? "bg-blue-700 text-white" : ""} mx-1 w-[50px] text-[10px] lg:w-[70px] h-[15px] bg-blue-50 flex justify-center items-center md:text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={exam}>Шалгалт</button>
                        <button className={`${history.location.pathname == `/edit/${lan}${level}${number}/grammar` ? "bg-blue-700 text-white" : ""} mx-1 w-[50px] text-[10px] lg:w-[70px] h-[15px] bg-blue-50 flex justify-center items-center md:text-[12px]  text-black hover:bg-blue-500 rounded-sm`} onClick={grammar} >Дүрэм</button>
                        <button className={`${history.location.pathname == `/edit/${lan}${level}${number}/word` ? "bg-blue-700 text-white" : ""} mx-1 w-[50px] text-[10px] lg:w-[70px] h-[15px] bg-blue-50 flex justify-center items-center md:text-[12px]  text-black hover:bg-blue-500 rounded-sm`} onClick={word} >Шинэ үг</button>
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

// function useQuery() {
//     const { search } = useLocation();
//     return React.useMemo(() => new URLSearchParams(search), [search]);
// }
// let query = useQuery();
    
// let lessonId = null


// if(query.get("lang") == 'Англи хэл') {
//     lessonId = ctx.englishList.find(
//         // item => console.log(item + "item id")
//         item =>  item.id === id
//     );
// }
//  else if(query.get("lang") == 'Солонгос хэл') {
//     lessonId = ctx.koreaList.find(
//         item =>  item.id === id
//     );
// } else if(query.get("lang") == "Монгол хэл") {
//     lessonId = ctx.mongoliaList.find(
//         item =>  item.id === id
//     );
// }