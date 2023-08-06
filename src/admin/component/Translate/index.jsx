import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import { Button,IconButton, MenuItem, Select} from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import SubjectIcon from '@mui/icons-material/Subject';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Radio from "@mui/material/Radio";
import { ShortText } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import OutboundIcon from '@mui/icons-material/Outbound';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useParams } from "react-router-dom";

import { useHistory } from "react-router-dom";
import LessonContext from "../../../context/LessonContext";


const Translate = (props) => {
    const history = useHistory()
    const ctx = useContext(LessonContext)
    const {id} = useParams();
    const [ questions, setQuestions] = useState(
        [{  questionText: "",
            questionAnswer: "",   
            // answer: false,
            answerKey: "",
            // open: true,
            // required: false
        }]
    )
    const save = () => {
        alert("Орчуулгын хэсгийг амжилттай хадгаллаа"); 
        ctx.saveTranslate(questions);
        history.push("/dashboard/addlesson/exam");

            
    }
  
    const changeQuestion = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
        
    }
    const changeAnswer = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].questionAnswer = text;
        setQuestions(newQuestion);
        
    }
   
    const copyQuestion = (i) => {
        expandCloseAll()
        let qs = [...questions]
        var newQuestion = {...qs[i]}
        setQuestions([...questions, newQuestion])
    }
    const deleteQuestion = (i) => {
        let qs = [...questions];
        if(questions.length > 1){
            qs.splice(i, 1);
        }
        setQuestions(qs)
    }
   
    const addMoreQuestionField = () => {
        expandCloseAll();
        setQuestions([...questions, 
            {questionText: "Question", questionType: "radio", options: [{optionText: "Option1"}], open:true, required: false }
            ]);
    }
    
    const expandCloseAll = () => {
        let qs = [...questions];
        for (let j = 0; j< qs.length; j++) {
            qs[j].open = false;
        }
        setQuestions(qs);
    }

    return (
    <div className="">
    {
        questions.map((ques, i) => (
            <div className="flex">
                
                <div className="text-white text-[20px]"> </div> 
                   
                    <div className="flex w-full  m-2 md:w-[60p0x] lg:w-[900px] xl:w-[1000px] ">
                        <AccordionDetails className={css.addQuestion}>
                            <div className={css.addQuestionTop}>
                                <input type="text" className={css.question} placeholder="Question" value={ques.questionText} onChange={(e) => {changeQuestion(e.target.value, i)}}></input>
                                <input type="text" className={css.question} placeholder="Answer" value={ques.questionAnswer} onChange={(e) => {changeAnswer(e.target.value, i)}}></input>                                                                          
                            </div>
                        <div className={css.addFooter}>
                            <div className={css.addQuestionBottom}>
                                        <IconButton aria-label="Copy" onClick={() => {copyQuestion(i)}}>
                                            <FilterNoneIcon/>
                                        </IconButton>
                                        <IconButton aria-label="Delete"  onClick={() => {deleteQuestion(i)}}>
                                            <RestoreFromTrashIcon />   
                                        </IconButton>
                            </div>
                            
                    
                        </div>
                        </AccordionDetails>
                        <div className={css.QuestionEdit}>
                            <AddCircleIcon onClick={addMoreQuestionField} className={css.edit}/>                              
                        </div>                                                                                          
                    </div>                                            
            </div>
    ))}
        <button className="w-[150px] h-[20px] bg-blue-500 flex text-[12px] justify-center items-center m-auto" onClick={save}>Хадгалах</button> 
    </div>
)}
    

export default Translate;

