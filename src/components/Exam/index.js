import React, {useState} from "react";
import AddQuestion from "../addQuestion";
import css from "./style.module.css";

const Exam = () => {

    // const questions = 
    //     {
    //         text: "What is the capital of America",
    //         options: [
    //             {id: 0, text: "New York City " , isCorrect: false},
    //             {id: 1, text: "Boston", isCorrect: false},
    //             {id: 2, text: "Santa Fe", isCorrect: false},
    //             {id: 3, text: "washington DC" , isCorrect: true},
    //         ],
    //     },

    const [sentence, setSentence] = useState({
        text: "",
        options: []

        
    });
    const changeSentence = (e) => {
        setSentence({ ...sentence, 1: e.target.value});
    };
    return (
        <div>
            <AddQuestion/>
        <input onChange={changeSentence} type="text" name="Өгүүлбэр" placeholder="Асуулт"/>
           Хариулт
   </div>
    )
}
export default Exam;