import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import {Accordion, Button, FormControlLabel, IconButton, MenuItem, Select} from "@mui/material";
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
import SendLessonContext from "../../context/sendLessonContext";




const Translate = (props) => {
    const SendLessonCtx = useContext(SendLessonContext);
    const {id} = useParams();
    const [ questions, setQuestions] = useState(
        [{  questionText: "",
            questionAnswer: "",   
            answer: false,
            answerKey: "",
            open: true,
            required: false}]
    )
    const save = () => {
       
        SendLessonCtx.saveTranslate(questions)

            
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
   
   
   
    const doneAnswer = (i) => {
        var answerOfQuestion = [...questions];
        answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
        setQuestions(answerOfQuestion)
    }
    const addAnswer = (i) => {
        var answerOfQuestion = [...questions];
        answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
        setQuestions(answerOfQuestion)
    }

   
    return questions.map((ques, i) => (
    <div style={{width: "1000px",  margin: "auto" }}>
                                <div style={{color: "white", fontSize: "30px"}}> </div>
      
                                    <div className={css.questionBox}>
                                        {!questions[i].answer ? (
                                    
                                        <AccordionDetails className={css.addQuestion}>
                                            <div className={css.addQuestionTop}>
                                                <input type="text" className={css.question} placeholder="Question" value={ques.questionText} onChange={(e) => {changeQuestion(e.target.value, i)}}></input>
                                                <input type="text" className={css.question} placeholder="Answer" value={ques.questionAnswer} onChange={(e) => {changeAnswer(e.target.value, i)}}></input>
                                                                                                                          
                                                
                                            </div>
                                                                                                             
                                      
                                        <div className={css.addFooter}>
                                            <div className={css.addQuestionBottomLeft}>
                                                <Button size="small" style={{textTransform: "none", color: "#4285f4", fontSize: "13px", fontWeight: "400"}} onClick={() => {addAnswer(i )}} >
                                                <OutboundIcon style={{border: "2px solid #4285f3", padding: "2px", marginRight: "8px"}} /> Answer key</Button>
                                            </div>
                                            <div className={css.addQuestionBottom}>
                                                        <IconButton aria-label="Copy" onClick={() => {copyQuestion(i)}}>
                                                            <FilterNoneIcon/>
                                                        </IconButton>
                                                        <IconButton aria-label="Delete"  onClick={() => {deleteQuestion(i)}}>
                                                            <RestoreFromTrashIcon />   
                                                        </IconButton>
                                                      
                                                        <Button onClick={save}>Save</Button> 
                                            </div>
                                            
                                    
                                        </div>
                                        </AccordionDetails>
                                        ):(
                                        <AccordionDetails className={css.addQuestion}>
                                            
                                            <div className={css.topHeader}> 
                                                Choose Correct Answer
                                                                                    
                                            </div>
                                            <div>
                                                <div className={css.addQuestionTop}>
                                                    <input type="text" className={css.question} placeholder="Question" value={ques.questionText} disabled/>
                                                    <input type="text" className={css.question} placeholder="Answer" value={ques.questionAnswer} disabled/>
                                                
                                                </div>
                                            </div>
                                          
                                            <div className={css.addQuestionBottom}>
                                                <Button variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "12px", marginTop: "12px", fontWeight: "600"}}
                                                onClick={() => {doneAnswer(i)}}
                                                > Done </Button>
                                                                          
                                            </div>
                                    
                                            
                                        </AccordionDetails>
                                        )}

                                        {!ques.answer ? (
                                             <div className={css.QuestionEdit}>
                                             <AddCircleIcon onClick={addMoreQuestionField} className={css.edit}/>
                                                                              
                                            </div> ):""}                                                                                           
                                    </div>     
                                                     
    </div>
))}
    

export default Translate;

