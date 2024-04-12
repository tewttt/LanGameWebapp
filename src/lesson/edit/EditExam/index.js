import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import {Accordion, Button,  IconButton} from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import CloseIcon from '@mui/icons-material/Close';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import LessonContext from "../../../context/LessonContext";
import Modal from "../../../components/General/Modal";
import { useHistory, useParams } from "react-router-dom";
import useLesson from "../../../hook/useLesson";

const EditExam = (props) => {
    const history = useHistory()
    const {languageId, topicId, lessonId} = useParams()
    const {exam, examfun} = useLesson(languageId, topicId, lessonId)
  
    const ctx = useContext(LessonContext);
    const [confirm , setConfirm] = useState(false);

    const [ questions, setQuestions] = useState(
        [{questionText: "",
            questionType: "radio",
            options : [
                {optionText: ""},
             
            ],
            // answer: false,
            answerKey: "",
            explain: ""
            // open: true,
            // required: false
        }]
    )
    useEffect(() => {
        examfun()
    }, [])

    useEffect(() => {
        if(exam?.exam){
            setQuestions(exam?.exam)
        }
    },[exam?.exam])
    
    const showConfirm = () => {
        setConfirm(true)
       };
       const closeConfirm = () => {
        setConfirm(false)
       };
    const save = () => {
        // alert("Шалгалтын хэсгийг амжилттай хадгаллаа"); 
        ctx.saveExam(questions);
        history.push(`/edit/${languageId}/${topicId}/${lessonId}/grammar`)
        closeConfirm()
    }

  
    const changeQuestion = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
        // console.log(newQuestion)
    }
    const changeExplain = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].explain = text;
        setQuestions(newQuestion); 
    }
    const changeOptionValue = (text, i ,j) => {
        var optionQuestion = [...questions];
        optionQuestion[i].options[j].optionText = text;
        setQuestions(optionQuestion)
        // console.log(optionQuestion)
    }
  
    const removeOption = (i, j) => {
        var RemoveOptionQuestion = [...questions];
        if(RemoveOptionQuestion[i].options.length > 1){
            RemoveOptionQuestion[i].options.splice(j, 1);
            setQuestions(RemoveOptionQuestion)
            console.log(i + "__" +j);
        }
    }
    
    // const removeOption = (i, j) => {
    //     var RemoveOptionQuestion = [...questions];
    //     if(RemoveOptionQuestion[i].options.length > 1){
    //         RemoveOptionQuestion[i].options.splice(j, 1);
    //         setQuestions(RemoveOptionQuestion)
    //         console.log(i + "__" +j);
    //     }
    // }
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
            {questionText: "Question",  options: [{optionText: "Option1"}], answerKey: "", explain: "" }
            ]);
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
   
   

    
return ( 
<div className="mt-4 m-auto md:w-[80%] text-2xl">
     {questions.map((ques, i) => (
    <div style={{width: "100%",  margin: "auto" }}> 
         <Modal closeConfirm={closeConfirm} show={confirm} >
                <div style={{display: "flex", flexDirection: "column"}}>
                Хадгалахдаа итгэлтэй байна уу
                <div >
                    <Button btn="Cont" text="Тийм" daragdsan={save}/>
                    <Button  text="Үгүй" daragdsan={closeConfirm}/>
                </div>
            
                </div>
        </Modal>
                
        <div className=" flex my-1 justify-center">
            <AccordionDetails className={css.addQuestion}>
                <div className={css.addQuestionTop}>
                    <input type="text" className={css.question} placeholder="Question" defaultValue={ques.questionText} onChange={(e) => {changeQuestion(e.target.value, i)}}></input>
                </div>
                <div className={css.addQuestionTop}>
                    <input type="text" className={css.question} placeholder="Explain" value={ques.explain} onChange={(e) => {changeExplain(e.target.value, i)}}></input>                                                                          
                </div>  
                    {ques.options.map((op, j) => (
                        // console.log(op)
            
                        <div className="flex items-center justify-between" 
                        key={j} 
                        >
                                
                        <div>
                            <input type="text" className="w-[180px] p-1 border md:w-[300px] text-black" placeholder="option" 
                            defaultValue={op.optionText} onChange= { (e) => {changeOptionValue(e.target.value, i, j)}}
                            ></input>
                        </div>
                        <div className="flex justify-center items-center">
                                <label style={{fontSize: "13px", color:"black"}} onClick={() => {setOptionAnswer(op.optionText, i)}}>
                                    
                                    <input
                                    type="checkbox"
                                        // type={ques.questionType}
                                        // name={ques.questionText}
                                        // value="option3"
                                        className="w-[25px] h-[25px]"
                                        // required={ques.required}
                                      
                                    />
                                        {/* : "" } */}
                                    
                                </label>
                                <IconButton aria-label="delete">
                                    <CloseIcon  onClick={() => {removeOption( i,j )}}/>
                                </IconButton>
    
                            </div>
                            
                           
            
                        </div>

                    ))} 
                
                    {/* {5 <= 4 ? ( */}
                          {ques.options.length <= 4 ? (
                        <div className={css.addQuestionBody}>
                            
                            <div className={css.addBorder}>
                                <Button size="small" onClick={() => {addOption(i)}} style={{textTransform: "none", color: "#4285f4", fontSize: "13px", fontWeight: "400"}} >Add option</Button>
                            </div>
                            
                        </div>
                    ):""}
                
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
   <button className="w-[150px] p-3 rounded-lg bg-blue-500 flex  justify-center items-center m-auto" onClick={save}>Save</button> 
</div>
)
    
}
    

export default EditExam;

 