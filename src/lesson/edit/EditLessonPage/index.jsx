import React from "react";
import { Switch, Route,useParams, useHistory } from "react-router-dom";
import EditBase from "../EditBase";
import EditTranslate from "../EditTranslate";
import EditExam from "../EditExam"
import EditGrammar from "../EditGrammar";
import EditNewWord from "../EditNewword";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

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
   

    return (
        <div className="text-white bg-baseBlack p-6 pb-96" > 
            <div className="flex py-2 justify-between pb-4 w-full">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push("/teacher")}/>
                    <p className="font-bold">Edit lesson</p>
                </div>
                <IoIosSettings size={20}/>
            </div>
           
            <div className="flex justify-center m-auto ">
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}` ? "bg-blue-700 text-white" : ""} mx-1  w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={baseInfo}>Мэдээлэл</button>
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}/translate` ? "bg-blue-700 text-white" : ""}  mx-1  w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={translate}>Орчуулга</button>
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}/exam` ? "bg-blue-700 text-white" : ""}  mx-1  w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={exam}>Шалгалт</button>
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}/grammar` ? "bg-blue-700 text-white" : ""}  mx-1  w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={grammar} >Дүрэм</button>
                <button className={`${history.location.pathname == `/edit/${languageId}/${topicId}/${lessonId}/word` ? "bg-blue-700 text-white" : ""} mx-1  w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} onClick={word} >Шинэ үг</button>
            </div>   
                 
            <Switch>
                <Route path="/edit/:languageId/:topicId/:lessonId/word"  component={EditNewWord}/>
                <Route path="/edit/:languageId/:topicId/:lessonId/grammar"  component={EditGrammar}/>
                <Route path="/edit/:languageId/:topicId/:lessonId/translate"  component={EditTranslate}/>
                <Route path="/edit/:languageId/:topicId/:lessonId/exam" component={EditExam}/>
                <Route path="/edit/:languageId/:topicId/:lessonId" component={EditBase} />
            </Switch>
          
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