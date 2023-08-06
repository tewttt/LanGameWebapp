import React, {useState, useContext, useEffect} from "react";
import css from "./style.module.css";
import Button from "../../../components/Button";
import { storage, db } from "../../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import { getAuth } from "firebase/auth";
import LessonContext from "../../../context/LessonContext";

const auth = getAuth();


const EditGrammar = (props) => {
    const [state , setState] = useState();
    const ctx = useContext(LessonContext)
  

    const uploadFile = () =>{
        if (state == null) return;
      
        const fileRef = ref(storage, `grammar/${state.name}`);
        uploadBytes(fileRef, state).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                setState(downloadURL)
                ctx.saveGrammar(downloadURL)
            })
        })
        alert("photo amjilttai") 
    }

const changePhoto = (e) => {
  
    setState(e.target.files[0])
};
      

    return (
    <div className={css.body}>
       
           
           <div className={css.photo}>
               
                <img src={props.data} className={css.image}/>
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

export default EditGrammar;