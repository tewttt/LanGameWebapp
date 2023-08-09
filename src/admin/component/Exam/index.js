import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import {Accordion, Button, FormControlLabel, IconButton, MenuItem, Select} from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import { useHistory } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import OutboundIcon from '@mui/icons-material/Outbound';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useParams } from "react-router-dom";
import ButtonCmp from "../../../components/Button"
import Spinner from "../../../components/General/Spinner";
import LessonContext from "../../../context/LessonContext";
// import ButtonCmp from "../../../components/Button";
import Modal from "../../../components/General/Modal";


const Exam = (props) => {
   const ctx = useContext(LessonContext);
   const history = useHistory();
   const [confirm , setConfirm] = useState(false);  
    const {id} = useParams();
    const [ questions, setQuestions] = useState(
        [{questionText: "",
            options : [
                {optionText: ""},
            ],
            answerKey: "",
        }]
    )
    const showConfirm = () => {
        setConfirm(true)
       };
       const closeConfirm = () => {
        setConfirm(false)
       };
       const save = () => {      
        alert("Шалгалтын хэсгийг амжилттай хадгаллаа"); 
        ctx.saveExam(questions);
        history.push("/dashboard/addlesson/grammar");
    }

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
        if(optionsOfQuestion[i].options.length < 4) {
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
            {questionText: "Question",  options: [{optionText: "Option1"}],  }
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
        // console.log(qno + "" + ans)
    }
   

return ( 
<div>
    { questions.map((ques, i) => (
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
        <div style={{color: "white", fontSize: "30px"}}></div>         
        <div className={css.questionBox}>
            <AccordionDetails className={css.addQuestion}>
                <div className={css.addQuestionTop}>
                    <input type="text" className={css.question} placeholder="Question" value={ques.questionText} onChange={(e) => {changeQuestion(e.target.value, i)}}></input>
                </div>
                    
                    {ques.options.map((op, j) => (
            
                        <div className="flex items-center justify-between" 
                        key={j}
                        >
                                
                        <div>
                            <input type="text" className="w-[180px] h-[30px] border" placeholder="option" 
                            value={ques.options[j].optionText} onChange= { (e) => {changeOptionValue(e.target.value, i, j)}}
                            ></input>
                        </div>
                        <div className={css.formCheck}>
                                <label style={{fontSize: "13px", color:"black"}} onClick={() => {setOptionAnswer(ques.options[j].optionText, i)}}>
                                    {/* {(ques.questionType!="text") ?  */}
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
    
                            </div>
                            
                            <IconButton aria-label="delete">
                                <CloseIcon  onClick={() => {removeOption( i,j )}}/>
                            </IconButton>
            
                        </div>
                    ))} 
                
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
<Button onClick={save}>Save</Button> 
{/* <ButtonCmp text="ИЛГЭЭХ" daragdsan={ctx.createLessonDB}/> */}
</div>
)
}
    

export default Exam;

