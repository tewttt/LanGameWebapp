import React, {useState, useContext, useEffect} from "react";
import css from "./style.module.css";
import Button from "../../../components/Button";
import { storage, db } from "../../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import { getAuth } from "firebase/auth";
import LessonContext from "../../../context/LessonContext";

const auth = getAuth();
const initialState= {
    grammarLink: "",
    grammarName: ""
,}

const Grammar = (props) => {
    const [stateGrammar , setState] = useState(initialState);
    const ctx = useContext(LessonContext)
  

    const uploadFile = () =>{
        if (stateGrammar.grammarLink == null) return;
      
        const fileRef = ref(storage, `grammar/${stateGrammar.grammarLink.name}`);
        uploadBytes(fileRef, stateGrammar.grammarLink).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                setState({...stateGrammar, grammarLink: downloadURL})
                ctx.saveGrammar(stateGrammar)
            })
        })
        alert("photo amjilttai") 
    }

const changePhoto = (e) => {
    const file = e.target.files[0];
    setState({...stateGrammar, grammarLink: file})
};
const changeGrammarName = (e) => {
    setState({...stateGrammar, grammarName: e.target.value})
} 
        

    return (
    <div className={css.body}>
       
           
           <div className={css.photo}>
               
                <img src={stateGrammar.grammarLink} className={css.image}/>
                <input placeholder="video name" type="text" onChange={changeGrammarName} required/>
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
            <Button text="Grammar Upload" daragdsan={uploadFile}></Button>
        </div>
    </div>
      
    )
}

export default Grammar;