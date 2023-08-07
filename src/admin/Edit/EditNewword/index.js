import React, {useState, useEffect, useContext} from "react";
import css from "./style.module.css";
import {Accordion, Button, FormControlLabel, IconButton, MenuItem, Select} from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';

import CloseIcon from '@mui/icons-material/Close';
import OutboundIcon from '@mui/icons-material/Outbound';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useParams } from "react-router-dom";
import ButtonCmp from "../../../components/Button"
import Spinner from "../../../components/General/Spinner";
import LessonContext from "../../../context/LessonContext";
import { useHistory } from "react-router-dom";
import Modal from "../../../components/General/Modal";
import { storage} from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const Word = (props) => {
   const ctx = useContext(LessonContext);
   const [confirm , setConfirm] = useState(false);
   const history = useHistory();
    const {id} = useParams();
    const lessonEditWord = ctx.lessonList.find(
        item => item.id === id
    )
    const [ questions, setQuestions] = useState(
        [{  word: "",
            options : [
                {optionText: ""},
            ],
            answerKey: "",
            desc: "",
            image:"",
            trans: "",
            sound: ""
        }]
    )
 
    const [photo, setPhoto] = useState([])
 
    const showConfirm = () => {
        setConfirm(true)
       };
       const closeConfirm = () => {
        setConfirm(false)
       };
  
       const save = () => {      
        alert("Шалгалтын хэсгийг амжилттай хадгаллаа"); 
        ctx.saveNewWord(questions);
        
    }

    const changeWord = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].word = text;
        setQuestions(newQuestion);
        // console.log(newQuestion)
    }
    const changeTranslate = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].trans = text;
        setQuestions(newQuestion);
        // console.log(newQuestion)
    }
    const changeDesc = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].desc = text;
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
    const changePhoto = (value, i) => {
        var newQuestion = [...questions];
        newQuestion[i].image = value;
        setQuestions(newQuestion);
        // const set = newQuestion[i].image
        uploadImage(i);
    }
    
    const uploadImage = (i) =>{
        if (questions[i].image == null) return;
        // const imageRef = ref(storage, `images/${photo.name + v4()}`);
        const imageRef = ref(storage, `wordImage/${questions[i].image.name}`);
        uploadBytes(imageRef, questions[i].image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {

                console.log('asd', url)
                var newQuestion = [...questions];
                newQuestion[i].image = url;
                 setQuestions(newQuestion);
                //  console.log(newQuestion)
                // setQuestions({...questions, image: url});
                
            })
           
        })
        alert("photo upload amjilttai") 
    }

    const changeSound = (value, i) => {
        var newQuestion = [...questions];
        newQuestion[i].sound = value;
        setQuestions(newQuestion);
        uploadSound(i, newQuestion);
        // console.log(newQuestion[i].image)
       
    }

    const uploadSound = (i) =>{
      
        if (questions[i].sound == null) return;
        // const imageRef = ref(storage, `images/${photo.name + v4()}`);
        const imageRef = ref(storage, `wordSound/${questions[i].sound.name}`);
        uploadBytes(imageRef, questions[i].sound).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                // console.log(url)
                var newQuestion = [...questions];
                newQuestion[i].sound = url;
                 setQuestions(newQuestion);
                
                //  console.log(newQuestion)
                // setQuestions({...questions, image: url});
                
            })
           
        })
        alert("sound upload amjilttai") 
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
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <input type="text" className={css.question} placeholder="Word" value={ques.word} onChange={(e) => {changeWord(e.target.value, i)}}></input>
                            <input type="text" className={css.question} placeholder="Translate" value={ques.trans} onChange={(e) => {changeTranslate(e.target.value, i)}}></input>
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <input type="text" className={css.question} placeholder="Description" value={ques.desc} onChange={(e) => {changeDesc(e.target.value, i)}}></input>
                        </div>
                    
                        <div style={{display: "flex", flexDirection: 'row', alignItems: "center", color: "green"}}>Image
                            <img src={questions[i].image} className="w-[40px] h-[40px]"/>
                            <input 
                            className="w-[180px] h-[30px] text-[12px] ml-0"
                            onChange={(e) => {changePhoto(e.target.files[0], i)}}
                            required type="file" 
                            id="imageInput" />
                        
                        {/* <ButtonCmp text="Image Upload" daragdsan={uploadImage}></ButtonCmp> */}
                        </div>

                        <div style={{display: "flex", flexDirection: 'row', alignItems: "center", color: 'red'}}>Sound
                            {/* <sound src={questions[i].sound} className="w-[40px] h-[40px]" /> */}
                            <input 
                            onChange={(e) => {changeSound(e.target.files[0], i)}}
                            className="w-[180px] h-[30px] text-[12px] ml-0"
                            required type="file" 
                            id="SoundInput" />
                        </div>
                    </div>
                   
                </div>
                    
                    {ques.options.map((op, j) => (
            
                        <div className={css.addQuestionBody} 
                        key={j}
                        >
                                
                        <div>
                            <input type="text" className={css.textInput} placeholder="option" 
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
                                        className={css.formCheckInput}
                                        // required={ques.required}
                                        style={{marginRight: "10px", marginBottom: "10px", marginTop: "5px"}}
    
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
    <div className="flex">
        <button className="w-[150px] h-[20px] bg-blue-500 flex text-[12px] justify-center items-center m-auto" onClick={save}>Save</button> 
        <button className="w-[150px] h-[20px] bg-green-500 flex text-[12px] justify-center items-center m-auto" onClick={ctx.updateDB(id)}>Илгээх</button>
    </div>
</div>
)
}
    

export default Word;
