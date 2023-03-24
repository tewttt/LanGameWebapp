import React, {useState} from "react";
import css from "./style.module.css";

const AddQuestion = () => {
    const [sentence, setSentence] = useState({
        text: "",
        options: []

        
    });
    const changeSentence = (e) => {
        setSentence({ ...sentence, text: e.target.value});
    };
    const changeAnswer = (e) => {
        setSentence({ ...sentence, options: e.target.value});
    };
    return ( 
        <div>
           
        <input onChange={changeSentence} type="text" name="Өгүүлбэр" placeholder="Асуулт"/>
           Хариулт
           <select onChange={changeAnswer}>
                <option>Сонгох</option>
                <option> <input type="text" placeholder="хариулт"/></option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
               
            </select>
        </div>
    )
}
export default AddQuestion;