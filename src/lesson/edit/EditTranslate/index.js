import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import { IconButton, MenuItem, Select} from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useParams } from "react-router-dom";
import Modal from "../../../components/General/Modal"
import { useHistory, useLocation } from "react-router-dom";
import LessonContext from "../../../context/LessonContext";
import useLesson from "../../../hook/useLesson";

const EditTranslate = (props) => {
    const history = useHistory()
    const ctx = useContext(LessonContext)
    const {languageId, topicId, lessonId} = useParams()
    const {translate , translatefun} = useLesson(languageId, topicId, lessonId)
  
    const [confirm , setConfirm] = useState(false);
    const [ questions, setQuestions] = useState(
        [{  questionText: "",
            questionAnswer: "",   
            answerKey: "",
          }]
    )
    useEffect(() => {
        translatefun()
    } ,[])

    useEffect(() => {
        if(translate?.translate){
            setQuestions(translate?.translate)
        }
       
    }, [translate?.translate])
   
    const showConfirm = () => {
        setConfirm(true)
       };
       const closeConfirm = () => {
        setConfirm(false)
       };
    const save = () => {
        // alert("Орчуулгын хэсгийг амжилттай хадгаллаа"); 
        ctx.saveTranslate(questions);
        history.push(`/edit/${languageId}/${topicId}/${lessonId}/exam`)
        closeConfirm()       
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
         <div className="mt-4">
        {
         questions.map((ques, i) => (
          
            <div className="flex justify-center">
                
                <div className="text-white text-[20px]"> </div> 
                   
                    <div className="flex w-full  m-2 md:w-[60p0x] lg:w-[900px] xl:w-[1000px] ">
                        <AccordionDetails className={css.addQuestion}>
                            <div className={css.addQuestionTop}>
                                <input type="text" className={css.question} placeholder="Question" defaultValue={ques.questionText} onChange={(e) => {changeQuestion(e.target.value, i)}}></input>
                                <input type="text" className={css.question} placeholder="Answer" defaultValue={ques.questionAnswer}  onChange={(e) => {changeAnswer(e.target.value, i)}}></input>                                                                          
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
    

export default EditTranslate;

