import React, {useState,  useContext} from "react";
import css from "./style.module.css";
import { IconButton} from "@mui/material";
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
import { HiMiniSpeakerWave } from "react-icons/hi2";

const Listen = () => {
    const history = useHistory()
    const ctx = useContext(LessonContext);
    const [confirm , setConfirm] = useState(false);
    const {id} = useParams();
    const [ questions, setQuestions] = useState(
        [{  word: "",
            sound: ""
        }]
    )
 
    const showConfirm = () => {
        setConfirm(true)
    };
    const closeConfirm = () => {
        setConfirm(false)
    };
  
    const save = () => {      
    // alert("Listen хэсгийг амжилттай хадгаллаа"); 
    history.push("/addlesson/word");
    ctx.saveListen(questions);
    }
   
    const changeWord = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].word = text;
        setQuestions(newQuestion);
        // console.log(newQuestion)
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
    const playAudio = (sound) => {
        const audio = new Audio(sound); // Create a new Audio object with the sound file
        audio.play(); // Play the audio
      }; 

return ( 
<div className="pt-6 pb-96 m-auto md:w-[80%] text-baseBlack md:text-2xl">
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
                    <div className="flex flex-col w-full flex-wrap">
                        <input type="text" className={css.question} placeholder="sentence" value={ques.word} onChange={(e) => {changeWord(e.target.value, i)}}></input>
                        <div className="flex  w-[300px]">
                            <p className="mr-2">sound</p>
                            <HiMiniSpeakerWave onClick={()=> playAudio(ques.sound)} size={36} className="mr-3 p-1 bg-baseBlue1 rounded-[50%]  text-white"/>
                            <input 
                            onChange={(e) => {changeSound(e.target.files[0], i)}}
                            className="w-[180px] h-[40px] text-[12px] ml-0"
                            accept="audio/*"
                            type="file"  
                            id="SoundInput" />
                        </div>
                    </div>
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
        <button className="w-[150px] rounded-lg text-white p-3  bg-blue-400 hover:bg-blue-500 flex  justify-center items-center m-auto" onClick={showConfirm}>Save</button> 
    </div>
</div>
)
}
    

export default Listen;

