import React, {useEffect, useState} from "react";
import axios from "../axios";

const SendLessonContext = React.createContext("kjjkj");

export const SendLessonStore = (props) => {
    const [state, setState] = useState({
        base: [],
        translate: [],
        exam: []
    });
   

    const saveBase = (base) => {
        setState({ ... state, base: base});
        // console.log(state.base)
    };
    const saveTranslate = (addtranslate) => {
        setState({ ... state, translate: addtranslate});
        // console.log(state.translate)
    };
    const saveExam = (addQuestions) => {
        setState({ ... state, exam: addQuestions}); 
       // console.log(state.exam)
    };
    

   
    const sendLesson = () => {
            axios
                .post("addLesson.json", state)
              
                .then(result => {
                    alert("Амжилттай илгээлээ"); 
                    // console.log(result.data); 
                    
                  
                })
                .catch(err => {
                    alert("Илгээхэд алдаа гарлаа");
                    console.log(err.response.data)  //серверээс ирж байгаа алдаа
                })
           
    }
   

    return (
        <SendLessonContext.Provider 
            value={{
                sendLesson,
                state,
                saveBase,
                saveTranslate,
                saveExam
            }}>
            {props.children}
        </SendLessonContext.Provider>

    )
};

export default SendLessonContext;