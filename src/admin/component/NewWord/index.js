import React, {useState, useContext, useEffect} from "react";
import css from "./style.module.css";
import Button from "../../../components/Button";
import { storage, db } from "../../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import { getAuth } from "firebase/auth";
import LessonContext from "../../../context/LessonContext";

const auth = getAuth();
const initialState= {
    newWordLink: "",
    newWordName: ""
,}

const NewWord = (props) => {
    const [stateWord , setState] = useState(initialState);
    const ctx = useContext(LessonContext)
   

    const uploadFile = () =>{
        if (stateWord.newWordLink == null) return;
      
        const fileRef = ref(storage, `newword/${stateWord.newWordLink.name}`);
        uploadBytes(fileRef, stateWord.newWordLink).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                setState({...stateWord, newWordLink: downloadURL})
                ctx.saveNewWord(stateWord)

              
            })
        })
        alert("photo amjilttai") 
    }


const changePhoto = (e) => {
    const file = e.target.files[0];
    setState({...stateWord, newWordLink: file})
};
const changeWordName = (e) => {
    setState({...stateWord, newWordName: e.target.value})
}
        

    return (
    <div className={css.body}>
       
           
           <div className={css.photo}>
               
                <img src={stateWord.newWordLink} className={css.image}/>
                <input placeholder="video name" type="text" onChange={changeWordName} required/>
                <input onChange={changePhoto} 
                    required type="file" 
                    // hidden="hidden"  
                    id="imageInput" />
            </div>

        <div style={{display: "flex", flexDirection: "row" , justifyContent:"center", alignItems: "center"}}>
            <div className={css.bar}>
                <div className={css.progress}></div>
            </div>
            <div className={css.uploadPercentage}>0%</div>
            <Button text="New word Upload" daragdsan={uploadFile}></Button>
        </div>
    </div>
      
    )
}

export default NewWord;