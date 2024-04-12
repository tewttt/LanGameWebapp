import React from "react";
import { Switch, Route,useParams, useHistory } from "react-router-dom";
import EditBase from "../EditBase";
import EditTranslate from "../EditTranslate";
import EditExam from "../EditExam"
import EditGrammar from "../EditGrammar";
import EditNewWord from "../EditNewword";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import EditListen from "../EditListen";
import EditVerb from "../EditVerb";

const EditLesson = () => {
  
    const {languageId, topicId, lessonId} = useParams()
    const history = useHistory();
   
    const baseInfo = () => {
        history.push(`/edit/${languageId}/${topicId}/${lessonId}`);
    };
    const translate = () => {
        history.push(`/edit/${languageId}/${topicId}/${lessonId}/translate`)
    };
    const exam= () => {
        history.push(`/edit/${languageId}/${topicId}/${lessonId}/exam`)
    };
    const word= () => {
        history.push(`/edit/${languageId}/${topicId}/${lessonId}/word`)
    };
    const grammar= () => {
        history.push(`/edit/${languageId}/${topicId}/${lessonId}/grammar`)
    };
    const verb = () => {
        history.push(`/edit/${languageId}/${topicId}/${lessonId}/verb`)
    };
    const listen= () => {
        history.push(`/edit/${languageId}/${topicId}/${lessonId}/listen`)
    };
   

    return (
        <div className="text-white bg-baseBlack p-6 pb-96 md:text-2xl md:w-[80%] m-auto" > 
            <div className="flex py-2 justify-between pb-4 w-full">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push("/teacher")}/>
                    <p className="font-bold">Edit lesson</p>
                </div>
                <IoIosSettings size={20}/>
            </div>
           
            <div className="flex justify-center m-auto text-sm  md:text-2xl  text-black">
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}` ? "bg-blue-700 text-white" : ""} mx-1 p-2 w-full h-full bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} onClick={baseInfo}>Base</button>
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}/translate` ? "bg-blue-700 text-white" : ""}  mx-1 p-2 w-full h-full bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} onClick={translate}>Translate</button>
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}/exam` ? "bg-blue-700 text-white" : ""}  mx-1 p-2 w-full h-full bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} onClick={exam}>Exam</button>
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}/grammar` ? "bg-blue-700 text-white" : ""}  mx-1 p-2 w-full h-full bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} onClick={grammar} >Grammar</button>
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}/verb` ? "bg-blue-700 text-white" : ""}  mx-1 p-2 w-full h-full bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} onClick={verb} >Verb</button>
                
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}/listen` ? "bg-blue-700 text-white" : ""}  mx-1 p-2 w-full h-full bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} onClick={listen} >Listen</button>
                
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}/word` ? "bg-blue-700 text-white" : ""} mx-1 p-2  w-full h-full] bg-blue-50 flex justify-center items-center  hover:bg-blue-500 rounded-sm`} onClick={word} >Word</button>
            </div>   
                 
            <Switch>
                <Route path="/edit/:languageId/:topicId/:lessonId/word"  component={EditNewWord}/>
                <Route path="/edit/:languageId/:topicId/:lessonId/grammar"  component={EditGrammar}/>
                <Route path="/edit/:languageId/:topicId/:lessonId/translate"  component={EditTranslate}/>
                <Route path="/edit/:languageId/:topicId/:lessonId/exam" component={EditExam}/>
                <Route path="/edit/:languageId/:topicId/:lessonId/listen" component={EditListen}/>
                <Route path="/edit/:languageId/:topicId/:lessonId/verb" component={EditVerb}/>
                <Route path="/edit/:languageId/:topicId/:lessonId" component={EditBase} />
            </Switch>
          
        </div>
    )
}

export default EditLesson;

