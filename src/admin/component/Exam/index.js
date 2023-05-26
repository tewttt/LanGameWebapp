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

import ButtonCmp from "../../../components/Button"
import Spinner from "../../../components/General/Spinner";
import LessonContext from "../../../context/LessonContext";




const Exam = (props) => {
   const ctx = useContext(LessonContext);
//    console.log(ctx.createLessonDB)
    const {id} = useParams();
    const [ questions, setQuestions] = useState(
        [{questionText: "",
            questionType: "radio",
            options : [
                {optionText: ""},
             
            ],
            answer: false,
            answerKey: "",
            open: true,
            required: false}]
    )

   

  
    const changeQuestion = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
        // console.log(newQuestion)
    }
    const changeOptionValue = (text, i ,j) => {
        var optionQuestion = [...questions];
        optionQuestion[i].options[j].optionText = text;
        setQuestions(optionQuestion)
        // console.log(optionQuestion)
    }
    const addQuestionType = (i, type) => {
        let qs = [...questions];
        // console.log(type);
        qs[i].questionType = type;
        setQuestions(qs);
    }
    const removeOption = (i, j) => {
        var RemoveOptionQuestion = [...questions];
        if(RemoveOptionQuestion[i].options.length > 1){
            RemoveOptionQuestion[i].options.splice(j, 1);
            setQuestions(RemoveOptionQuestion)
            console.log(i + "__" +j);
        }
    }
    const addOption = (i) => {
        var optionsOfQuestion = [...questions];
        if(optionsOfQuestion[i].options.length < 5) {
            optionsOfQuestion[i].options.push({optionText: "Option" + (optionsOfQuestion[i].options.length + 1)})
        } else {
            console.log("Max 5 options");
        }
        setQuestions(optionsOfQuestion)
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
   

    const reOrder = (list, starIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(starIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }
    const expandCloseAll = () => {
        let qs = [...questions];
        for (let j = 0; j< qs.length; j++) {
            qs[j].open = false;
        }
        setQuestions(qs);
    }
   
    const setOptionAnswer = (ans,qno) => {
        var Questions = [...questions];
        Questions[qno].answerKey = ans;
        setQuestions(Questions)
        console.log(qno + "" + ans)
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

    const save = () => {
        // const addQuestions = {
        //     questions: questions
        // };
        alert("Шалгалтын хэсгийг амжилттай хадгаллаа"); 
        ctx.saveExam(questions);
    }

    return  questions.map((ques, i) => (
    <div style={{width: "100%",  margin: "auto" }}> 
  
                                    <div style={{color: "white", fontSize: "30px"}}></div>         
      
                                    <div className={css.questionBox}>
                                        {!questions[i].answer ? (
                                    
                                        <AccordionDetails className={css.addQuestion}>
                                            <div className={css.addQuestionTop}>
                                                <input type="text" className={css.question} placeholder="Question" value={ques.questionText} onChange={(e) => {changeQuestion(e.target.value, i)}}></input>
                                            
                                                <Select className={css.select} style={{color: "#5f6368", fontSize: "13px"}}>
                                                    <MenuItem id="text" value="Text" onClick= {() => {addQuestionType(i,"text")}}> <SubjectIcon style={{marginRight: "10px"}} />Paragraph</MenuItem>
                                                    <MenuItem id="checkbox" value="Checkbox" onClick= {() => {addQuestionType(i,"checkbox")}}> <CheckBoxIcon style={{marginRight: "10px" , color: "#70757a"}} checked  />Checkbox</MenuItem>
                                                    <MenuItem id="radio" value="Radio" onClick= {() => {addQuestionType(i,"radio")}}> <Radio style={{marginRight: "10px", color: "#70757a"}} checked />Multiple Choice</MenuItem>
                                    
                                                </Select>
                                                
                                            </div>
                                        
                                            {ques.options.map((op, j) => (
                                    
                                                <div className={css.addQuestionBody} 
                                                key={j}
                                                >
                                                        {
                                                            (ques.questionType!="text") ? 
                                                            <input type={ques.questionType} style={{marginRight: "10px"}}/> :
                                                            <ShortText style={{marginRight: "10px"}}/>
                                                        }
                                                        <div>
                                                            <input type="text" className={css.textInput} placeholder="option" 
                                                            value={ques.options[j].optionText} onChange= { (e) => {changeOptionValue(e.target.value, i, j)}}
                                                            ></input>
                                                        </div>
                                                     
                                                        <IconButton aria-label="delete">
                                                            <CloseIcon  onClick={() => {removeOption( i,j )}}/>
                                                        </IconButton>
                                    
                                                </div>
                                            ))} 
                                    
                                        {ques.options.length < 5 ? (
                                            <div className={css.addQuestionBody}>
                                                <FormControlLabel disabled control={
                                                    (ques.questionType!="text") ? 
                                                    <input type={ques.questionType} color="primary" inputProps={{"aria-label" : "secondary checkbox"}}
                                                            style={{marginLeft: "10px", marginRight: "10px"}} disabled /> : 
                                                    <ShortText style={{marginRight: "10px"}}/>
                                                    
                                                } 
                                                />
                                                <div className={css.addBorder}>
                                                    <Button size="small" onClick={() => {addOption(i)}} style={{textTransform: "none", color: "#4285f4", fontSize: "13px", fontWeight: "400"}} >Add option</Button>
                                                </div>
                                               
                                            </div>
                                        ):""}
                                    
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
                                                    {/* <input type="number" className={css.points} min="0" step="1" placeholder="0" onChange={(e) => {setOptionPoints(e.target.value, i)}} /> */}
                                                </div>
                                            </div>
                                            {ques.options.map((op, j) =>(
                                                <div className={css.addQuestionBody} key={j} style={{marginLeft: "8px" , marginBottom: "10px", marginTop: "5px"}} >
                                                    <div key={j}>
                                                        <div style={{display: "flex" }} className={{}}>
                                                            <div className={css.formCheck}>
                                                                <label style={{fontSize: "13px", color:"black"}} onClick={() => {setOptionAnswer(ques.options[j].optionText, i)}}>
                                                                    {(ques.questionType!="text") ? 
                                                                    <input
                                                                        type={ques.questionType}
                                                                        name={ques.questionText}
                                                                        value="option3"
                                                                        className={css.formCheckInput}
                                                                        required={ques.required}
                                                                        style={{marginRight: "10px", marginBottom: "10px", marginTop: "5px"}}
                                    
                                                                    /> : <ShortText style={{ marginRight: "10px"}}/>}
                                                                    {ques.options[j].optionText}
                                                                </label>
                                    
                                                            </div>
                                    
                                                        </div>
                                    
                                                    </div>
                                                </div>
                                            ))}
                                           
                                            <div className={css.addQuestionBottom}>
                                                <Button variant="outlined" color="primary" style={{textTransform: "none", color: "#4285f4", fontSize: "12px", marginTop: "12px", fontWeight: "600"}}
                                                onClick={() => {doneAnswer(i)}}
                                                > Done
                                    
                                                </Button>
                                    
                                            </div>
                                    
                                            
                                        </AccordionDetails>
                                        )}
                                        {!ques.answer ? (
                                             <div className={css.QuestionEdit}>
                                             <AddCircleIcon onClick={addMoreQuestionField} className={css.edit}/>
                                          
                                    
                                            </div> ):""}                                                                                           
                                    </div>   
                                    <ButtonCmp text="ИЛГЭЭХ" daragdsan={ctx.createLessonDB}/>
                                    <ButtonCmp text="ЗАСАХ" />
                                    <ButtonCmp text="УСТГАХ" />
                                    {/* {SendLessonCtx.state.loading ? <Spinner/> : <ButtonCmp text="ИЛГЭЭХ" daragdsan={SendLessonCtx.sendLesson}/> } */}
                                    
                                                                       
    </div>
   
))}
    

export default Exam;

