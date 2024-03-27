import React, {useState,  useContext} from "react";
import css from "./style.module.css";
import { Button,IconButton} from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import CloseIcon from '@mui/icons-material/Close';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useParams, useHistory } from "react-router-dom";
import Spinner from "../../../components/General/Spinner";
import LessonContext from "../../../context/LessonContext";
import Modal from "../../../components/General/Modal";
import { storage} from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const Word = () => {
    const history = useHistory()
    const ctx = useContext(LessonContext);
    const [confirm , setConfirm] = useState(false);
    const {id} = useParams();
    const [ questions, setQuestions] = useState(
        [{  
            image: ""
        }]
    )
 
    const showConfirm = () => {
        setConfirm(true)
    };
    const closeConfirm = () => {
        setConfirm(false)
    };
  
    const save = () => {      
    // alert("Шалгалтын хэсгийг амжилттай хадгаллаа"); 
    ctx.saveGrammar(questions);
    history.push("/addlesson/listen");
    closeConfirm()
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
            {image: "image",   }
            ]);
    }
   
    const expandCloseAll = () => {
        let qs = [...questions];
        for (let j = 0; j< qs.length; j++) {
            qs[j].open = false;
        }
        setQuestions(qs);
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
                var newQuestion = [...questions];
                newQuestion[i].image = url;
                 setQuestions(newQuestion);
            })
        })
        alert("photo upload amjilttai") 
    }

   

return ( 
<div className="pt-6 pb-96 md:w-[50%] text-baseBlack">
    { questions.map((ques, i) => (
    <div> 
         <Modal closeConfirm={closeConfirm} show={confirm} >
                <div className="text-baseBlack ">
                    <p className="text-center">Are you sure you want to save?</p>
                    <div className="flex justify-around mt-4">
                        <button className="py-2 px-10 bg-green-500 text-white rounded-2xl" onClick={save}>Yes</button> 
                        <button className="py-2 px-10 bg-red-500 text-white rounded-2xl" onClick={closeConfirm}>No</button>
                    </div>
                </div>
            </Modal>
        <div className={css.questionBox}>
            <AccordionDetails className={css.addQuestion}>
                <div className={css.addQuestionTop}>
                    <div className="flex items-center w-[300px] justify-between ml-5">Image
                            <img src={questions[i].image} className="w-[40px] h-[40px] border border-gray-400"/>
                            <input 
                            className="w-[180px] h-[40px] text-[12px] ml-0"
                            onChange={(e) => {changePhoto(e.target.files[0], i)}}
                            required type="file" 
                            id="imageInput" />
                    </div>
                    {/* <div style={{display: "flex", flexDirection: "column"}}>
                        <input type="text" className={css.question} placeholder="Grammar English" value={ques.eng} onChange={(e) => {changeEng(e.target.value, i)}}></input>
                       
                    </div> */}
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
    <div className="flex mb-10">
        <button className="w-[150px] h-[20px] bg-blue-400 hover:bg-blue-500 flex text-[12px] justify-center items-center m-auto" onClick={showConfirm}>Save</button> 
    </div>
</div>
)
}
    

export default Word;

