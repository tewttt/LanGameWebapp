import React from "react";
import axios from "../axios";

const SendLessonContext = React.createContext();

export const LessonStore = (props) => {
    const sendLesson = (NewLesson) => {

        axios
            .post("addLesson.json", NewLesson)
          
            .then(result => {
                alert("Амжилттай илгээлээ"); 
                console.log(result.data);
                
              
            })
            .catch(err => {
                alert("Илгээхэд алдаа гарлаа");
                console.log(err.response.data)  //серверээс ирж байгаа алдаа
            });
         
    }

    return (
        <SendLessonContext.Provider 
            value={{
                sendLesson
            }}>
            {props.children}
        </SendLessonContext.Provider>

    )
};

export default SendLessonContext;